// src/controllers/orderController.js
const orderModel = require("../models/orderModel");

/**
 * POST /api/orders
 * Creates an order ONLY from reserved accessory instances.
 * Body: { orderID, designerID, customerID, orderDate, items: ["X001","X002"], ...optional fields }
 */
exports.createOrderFromCart = async (req, res) => {
  const {
    orderID,
    designerID,
    isPickup,
    orderDate,
    completionDate,
    address,
    paymentType,
    customerID,
    items,
  } = req.body;

  if (!orderID || !designerID || !customerID || !orderDate || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Missing required fields or items" });
  }

  const uniqueItems = [...new Set(items)];
  const qty = uniqueItems.length;

  const conn = await orderModel.pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Lock + validate accessories
    const accRows = await orderModel.getAccessoriesForOrder(conn, uniqueItems);

    if (accRows.length !== uniqueItems.length) {
      await conn.rollback();
      return res.status(400).json({ message: "One or more accessories do not exist" });
    }

    // 2) Must be reserved to order
    const invalid = accRows.filter(a => a.status !== "reserved");
    if (invalid.length > 0) {
      await conn.rollback();
      return res.status(409).json({
        message: "One or more items are not in reserved status",
        items: invalid.map(x => ({ accessoryID: x.accessoryID, status: x.status })),
      });
    }

    // 3) Compute total from stored accessory.price
    const totalPrice = accRows.reduce((sum, r) => sum + Number(r.price || 0), 0);

    // 4) Insert order header
    await orderModel.insertOrder(conn, {
      orderID,
      qty,
      designerID,
      isPickup: isPickup ?? 0,
      price: totalPrice,
      orderDate,
      completionDate: completionDate || null,
      address: address || "None, pickup",
      paymentType: paymentType || "cash",
      customerID,
    });

    // 5) Insert order items
    await orderModel.insertOrderItems(conn, orderID, uniqueItems);

    // 6) Mark accessories ordered (prevents later cancel/release)
    await orderModel.markAccessoriesOrdered(conn, uniqueItems);

    await conn.commit();
    return res.status(201).json({ message: "Order created", orderID, qty, totalPrice });
  } catch (err) {
    await conn.rollback();
    console.error("Error creating order:", err);
    return res.status(500).json({ message: "Failed to create order", error: err.message });
  } finally {
    conn.release();
  }
};

/**
 * GET /api/orders/:orderID
 */
exports.getOrderDetails = async (req, res) => {
  const { orderID } = req.params;

  try {
    const header = await orderModel.getOrderHeader(orderID);
    if (header.length === 0) return res.status(404).json({ message: "Order not found" });

    const order = header[0];
    const items = await orderModel.getOrderItemsDetailed(orderID);
    const calculatedTotalPrice = items.reduce((sum, it) => sum + Number(it.price || 0), 0);

    return res.json({ order, items, calculatedTotalPrice });
  } catch (err) {
    console.error("Error fetching order details:", err);
    return res.status(500).json({ message: "Failed to fetch order details" });
  }
};

/**
 * GET /api/orders/customer/:customerID
 */
exports.getOrdersByCustomer = async (req, res) => {
  const { customerID } = req.params;

  try {
    const rows = await orderModel.getOrdersByCustomer(customerID);
    return res.json(rows);
  } catch (err) {
    console.error("Error fetching customer orders:", err);
    return res.status(500).json({ message: "Failed to fetch customer orders" });
  }
};

/**
 * GET /api/orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const rows = await orderModel.getAllOrders();
    return res.json(rows);
  } catch (err) {
    console.error("Error fetching all orders:", err);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * GET /api/orders/best-sellers-by-type?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
exports.getBestSellersByType = async (req, res) => {
  const from = req.query.from || null;
  const to = req.query.to || null;

  try {
    const result = await orderModel.getBestSellersByType({ from, to });
    return res.json(result);
  } catch (err) {
    console.error("Error fetching best sellers:", err);
    return res.status(500).json({ message: "Failed to fetch best sellers" });
  }
};

// src/controllers/orderController.js

exports.completeOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    const designerID = req.body?.designerID;

    if (!designerID) {
      return res.status(400).json({ message: "Missing designerID in body" });
    }

    const ok = await orderModel.markOrderCompleted(orderID, designerID);

    if (!ok) {
      return res.status(404).json({
        message: "Order not found, not owned by this designer, or already completed",
      });
    }

    return res.json({ message: "Order completed", orderID });
  } catch (err) {
    console.error("completeOrder error:", err);
    return res.status(500).json({ message: "Failed to complete order" });
  }
};