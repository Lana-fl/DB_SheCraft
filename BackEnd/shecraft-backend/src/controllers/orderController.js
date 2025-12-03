// src/controllers/orderController.js
const pool = require('../config/db');

/**
 * Create an order from the frontend cart
 * POST /api/orders
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

  if (!orderID || !designerID || !customerID || !orderDate || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or items' });
  }

  const qty = items.length; // number of accessories in this order

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get prices of accessories
    const [accessories] = await connection.query(
      `
      SELECT accessoryID, price
      FROM ACCESSORY
      WHERE accessoryID IN (${items.map(() => '?').join(', ')})
      `,
      items
    );

    if (accessories.length !== items.length) {
      await connection.rollback();
      return res.status(400).json({ message: 'One or more accessories do not exist' });
    }

    const totalPrice = accessories.reduce((sum, acc) => sum + Number(acc.price), 0);

    // 2. Insert order
    await connection.query(
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderID,
        qty,
        designerID,
        isPickup ?? 0,
        totalPrice,
        orderDate,
        completionDate || null,
        address || 'None, pickup',
        paymentType || 'cash',
        customerID,
      ]
    );

    // 3. Insert items into ORDERITEMS
    for (const accessoryID of items) {
      await connection.query(
        `
        INSERT INTO ORDERITEMS (orderID, accessoryID)
        VALUES (?, ?)
        `,
        [orderID, accessoryID]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: 'Order created successfully',
      orderID,
      qty,
      totalPrice,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    await connection.rollback();
    res.status(500).json({ message: 'Failed to create order' });
  } finally {
    connection.release();
  }
};


/**
 * Get full order + items + total
 * GET /api/orders/:orderID
 */
exports.getOrderDetails = async (req, res) => {
  const { orderID } = req.params;

  try {
    const [orders] = await pool.query(
      `SELECT * FROM ORDERS WHERE orderID = ?`,
      [orderID]
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const [items] = await pool.query(
      `
      SELECT 
        a.accessoryID,
        a.price
      FROM ORDERITEMS oi
      JOIN ACCESSORY a ON oi.accessoryID = a.accessoryID
      WHERE oi.orderID = ?
      `,
      [orderID]
    );

    const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);

    res.json({
      order: orders[0],
      items,
      calculatedTotalPrice: totalPrice,
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order details' });
  }
};


/**
 * Get all orders for a customer
 * GET /api/orders/customer/:customerID
 */
exports.getOrdersByCustomer = async (req, res) => {
  const { customerID } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        orderID,
        qty,
        designerID,
        isPickup,
        price,
        orderDate,
        completionDate,
        address,
        paymentType
      FROM ORDERS
      WHERE customerID = ?
      ORDER BY orderDate DESC
      `,
      [customerID]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ message: 'Failed to fetch customer orders' });
  }
};
