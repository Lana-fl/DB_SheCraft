// src/controllers/orderController.js
const pool = require("../config/db");

/**
 * Create an order from the frontend cart
 * POST /api/orders
 *
 * Expected body:
 * {
 *   "orderID": "O001",
 *   "designerID": "D001",
 *   "isPickup": 0,
 *   "orderDate": "2025-12-08",
 *   "completionDate": null,
 *   "address": "Beirut, Hamra, ...",
 *   "paymentType": "card",        // 'cash' | 'card' | 'online'
 *   "customerID": "C001",
 *   "items": ["A001", "A010"]     // array of accessoryID chosen by the customer
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
    items, // array of accessoryIDs
  } = req.body;

  // Basic validation
  if (
    !orderID ||
    !designerID ||
    !customerID ||
    !orderDate ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Missing required fields or items" });
  }

  const qty = items.length;

  try {
    // 1) Get prices for all accessories in the cart
    const placeholders = items.map(() => "?").join(", ");
    const [accessories] = await pool.query(
      `
      SELECT accessoryID, price
      FROM ACCESSORY
      WHERE accessoryID IN (${placeholders})
      `,
      items
    );

    if (accessories.length !== items.length) {
      return res.status(400).json({
        message:
          "One or more accessories in the cart do not exist in the database",
      });
    }

    // Map for quick lookup
    const priceById = {};
    for (const acc of accessories) {
      priceById[acc.accessoryID] = Number(acc.price);
    }

    const totalPrice = items.reduce(
      (sum, id) => sum + (priceById[id] || 0),
      0
    );

    // 2) Insert into ORDERS
    await pool.query(
      `
      INSERT INTO ORDERS (
        orderID,
        qty,
        designerID,
        isPickup,
        price,
        orderDate,
        completionDate,
        address,
        paymentType,
        customerID
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderID,
        qty,
        designerID,
        isPickup ?? 0,
        totalPrice,
        orderDate,
        completionDate || null,
        address || "None, pickup",
        paymentType || "cash",
        customerID,
      ]
    );

    // 3) Insert into ORDERITEMS
    for (const accessoryID of items) {
      await pool.query(
        `
        INSERT INTO ORDERITEMS (orderID, accessoryID)
        VALUES (?, ?)
        `,
        [orderID, accessoryID]
      );
    }

    return res.status(201).json({
      message: "Order created successfully",
      orderID,
      qty,
      totalPrice,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

/**
 * Get full details of a single order (for designer or customer)
 * GET /api/orders/:orderID
 *
 * Returns:
 * {
 *   order: { ... },
 *   items: [ { type-specific fields... } ],
 *   calculatedTotalPrice: number
 * }
 */
exports.getOrderDetails = async (req, res) => {
  const { orderID } = req.params;

  try {
    // 1) Get order + customer + designer info
    const [orders] = await pool.query(
      `
      SELECT
        o.orderID,
        o.qty,
        o.designerID,
        o.isPickup,
        o.price,
        o.orderDate,
        o.completionDate,
        o.address,
        o.paymentType,
        o.customerID,
        c.firstName,
        c.lastName,
        c.email       AS customerEmail,
        c.phoneNb     AS customerPhone,
        d.name        AS designerName,
        d.branch      AS designerBranch,
        d.email       AS designerEmail
      FROM ORDERS o
      JOIN CUSTOMER c ON o.customerID = c.customerID
      JOIN DESIGNER d ON o.designerID = d.designerID
      WHERE o.orderID = ?
      `,
      [orderID]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = orders[0];

    // 2) Get items with full customization info from subtype tables
    const [items] = await pool.query(
      `
      SELECT 
        a.accessoryID,
        a.price,
        a.nbOfStones,
        a.nbOfCharms,
        m.metal,

        -- Ring fields
        r.ringID,
        r.bandType,
        r.diameter,

        -- Bracelet fields
        b.braceletID,
        b.length      AS braceletLength,
        b.engraving,
        b.style,
        b.classType,

        -- Necklace fields
        n.necklaceID,
        n.thickiness,
        n.length      AS necklaceLength,

        -- Earring fields
        e.earringID,
        e.earringType,
        e.backing,
        e.size        AS earringSize
      FROM ORDERITEMS oi
      JOIN ACCESSORY a ON oi.accessoryID = a.accessoryID
      JOIN MATERIAL m ON a.materialID = m.materialID
      LEFT JOIN RING r ON r.accessoryID = a.accessoryID
      LEFT JOIN BRACELET b ON b.accessoryID = a.accessoryID
      LEFT JOIN NECKLACE n ON n.accessoryID = a.accessoryID
      LEFT JOIN EARRING e ON e.accessoryID = a.accessoryID
      WHERE oi.orderID = ?
      `,
      [orderID]
    );

    const calculatedTotalPrice = items.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );

    return res.json({
      order,
      items,
      calculatedTotalPrice,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ message: "Failed to fetch order details" });
  }
};

/**
 * Get all orders for a specific customer
 * GET /api/orders/customer/:customerID
 */
exports.getOrdersByCustomer = async (req, res) => {
  const { customerID } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        o.orderID,
        o.qty,
        o.price,
        o.orderDate,
        o.completionDate,
        o.isPickup,
        o.address,
        o.paymentType,
        o.designerID,
        d.name   AS designerName,
        d.branch AS designerBranch
      FROM ORDERS o
      JOIN DESIGNER d ON o.designerID = d.designerID
      WHERE o.customerID = ?
      ORDER BY o.orderDate DESC
      `,
      [customerID]
    );

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch customer orders" });
  }
};

/**
 * Get all orders for a specific designer (designer's order log)
 * GET /api/orders/designer/:designerID
 */
exports.getOrdersByDesigner = async (req, res) => {
  const { designerID } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        o.orderID,
        o.qty,
        o.price,
        o.orderDate,
        o.completionDate,
        o.isPickup,
        o.address,
        o.paymentType,
        o.customerID,
        c.firstName,
        c.lastName,
        c.email   AS customerEmail,
        c.phoneNb AS customerPhone
      FROM ORDERS o
      JOIN CUSTOMER c ON o.customerID = c.customerID
      WHERE o.designerID = ?
      ORDER BY o.orderDate DESC
      `,
      [designerID]
    );

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching designer orders:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch designer orders" });
  }
};
