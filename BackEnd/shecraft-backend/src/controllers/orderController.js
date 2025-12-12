// src/controllers/orderController.js
const orderModel = require("../models/orderModel");

/**
 * POST /api/orders
 * Body:
 * {
 *   orderID, designerID, isPickup, orderDate, completionDate, address, paymentType, customerID,
 *   items: ["A001","A010", ...]
 * }
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

  // Your ORDERITEMS PK (orderID, accessoryID) forbids duplicates in one order.
  // To avoid ER_DUP_ENTRY, we enforce uniqueness here.
  const uniqueItems = [...new Set(items)];
  const qty = uniqueItems.length;

  const conn = await orderModel.pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Validate accessories + compute total
    const accRows = await orderModel.getAccessoryPricesByIds(conn, uniqueItems);

    if (accRows.length !== uniqueItems.length) {
      await conn.rollback();
      return res.status(400).json({ message: "One or more accessories do not exist" });
    }

    const priceById = {};
    for (const r of accRows) priceById[r.accessoryID] = Number(r.price);

    const totalPrice = uniqueItems.reduce((sum, id) => sum + (priceById[id] || 0), 0);

    // 2) Insert ORDERS
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

    // 3) Insert ORDERITEMS
    await orderModel.insertOrderItems(conn, orderID, uniqueItems);

    await conn.commit();
    return res.status(201).json({ message: "Order created", orderID, qty, totalPrice });
  } catch (err) {
    await conn.rollback();
    console.error("Error creating order:", err);
    return res.status(500).json({ message: "Failed to create order" });
  } finally {
    conn.release();
  }
};

/**
 * GET /api/orders/:orderID
 * Returns: { order, items, calculatedTotalPrice }
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
 * Returns top style per type (ring/earring/necklace/bracelet)
 */
exports.getBestSellersByType = async (req, res) => {
  const from = req.query.from || null;
  const to = req.query.to || null;

  try {
    const result = await orderModel.getBestSellersByType({ from, to });
    return res.json(result);
  } catch (err) {
    console.error("Error fetching best sellers by type:", err);
    return res.status(500).json({ message: "Failed to fetch best sellers" });
  }
};
