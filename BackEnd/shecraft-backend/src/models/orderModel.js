// src/models/orderModel.js
const pool = require("../config/db");

/**
 * Lock and fetch accessory rows for ordering (prevents race conditions)
 */
async function getAccessoriesForOrder(conn, accessoryIDs) {
  const placeholders = accessoryIDs.map(() => "?").join(", ");
  const [rows] = await conn.query(
    `
    SELECT accessoryID, price, status
    FROM accessory
    WHERE accessoryID IN (${placeholders})
    FOR UPDATE
    `,
    accessoryIDs
  );
  return rows;
}

/**
 * Update accessory status to ordered
 */
async function markAccessoriesOrdered(conn, accessoryIDs) {
  const placeholders = accessoryIDs.map(() => "?").join(", ");
  const [result] = await conn.query(
    `
    UPDATE accessory
    SET status = 'ordered'
    WHERE accessoryID IN (${placeholders})
    `,
    accessoryIDs
  );
  return result.affectedRows;
}

async function insertOrder(conn, orderData) {
  const {
    orderID,
    qty,
    designerID,
    isPickup,
    price,
    orderDate,
    completionDate,
    address,
    paymentType,
    customerID,
  } = orderData;

  await conn.query(
    `
    INSERT INTO orders
      (orderID, qty, designerID, isPickup, price, orderDate, completionDate, address, paymentType, customerID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      orderID,
      qty,
      designerID,
      isPickup,
      price,
      orderDate,
      completionDate,
      address,
      paymentType,
      customerID,
    ]
  );
}

async function insertOrderItems(conn, orderID, accessoryIDs) {
  for (const accessoryID of accessoryIDs) {
    await conn.query(
      `
      INSERT INTO orderitems (orderID, accessoryID)
      VALUES (?, ?)
      `,
      [orderID, accessoryID]
    );
  }
}

/**
 * Read order header + customer/designer info
 */
async function getOrderHeader(orderID) {
  const [rows] = await pool.query(
    `
    SELECT
      o.orderID, o.qty, o.price, o.orderDate, o.completionDate, o.isPickup, o.address, o.paymentType,
      o.customerID, c.firstName, c.lastName, c.email AS customerEmail, c.phoneNb AS customerPhone,
      o.designerID, d.name AS designerName, d.branch AS designerBranch, d.email AS designerEmail
    FROM orders o
    JOIN customer c ON o.customerID = c.customerID
    JOIN designer d ON o.designerID = d.designerID
    WHERE o.orderID = ?
    `,
    [orderID]
  );
  return rows;
}

/**
 * Detailed order items. (No nbOfCharms/nbOfStones anymore.)
 */
async function getOrderItemsDetailed(orderID) {
  const [rows] = await pool.query(
    `
    SELECT
      a.accessoryID,
      a.price,
      a.materialID,
      a.status,
      m.metal,

      r.ringID, r.bandType, r.diameter,

      b.braceletID,
      b.length AS braceletLength,
      b.style  AS braceletStyle,
      b.chain  AS braceletChain,

      n.necklaceID,
      n.length AS necklaceLength,
      n.style  AS necklaceStyle,
      n.chain  AS necklaceChain,

      e.earringID,
      e.backing,
      e.size  AS earringSize,
      e.style AS earringStyle
    FROM orderitems oi
    JOIN accessory a ON oi.accessoryID = a.accessoryID
    JOIN material m ON a.materialID = m.materialID
    LEFT JOIN ring r ON r.accessoryID = a.accessoryID
    LEFT JOIN bracelet b ON b.accessoryID = a.accessoryID
    LEFT JOIN necklace n ON n.accessoryID = a.accessoryID
    LEFT JOIN earring e ON e.accessoryID = a.accessoryID
    WHERE oi.orderID = ?
    `,
    [orderID]
  );
  return rows;
}

async function getOrdersByCustomer(customerID) {
  const [rows] = await pool.query(
    `
    SELECT
      o.orderID, o.qty, o.price, o.orderDate, o.completionDate, o.isPickup, o.address, o.paymentType,
      o.designerID, d.name AS designerName, d.branch AS designerBranch
    FROM orders o
    JOIN designer d ON o.designerID = d.designerID
    WHERE o.customerID = ?
    ORDER BY o.orderDate DESC
    `,
    [customerID]
  );
  return rows;
}

async function getAllOrders() {
  const [rows] = await pool.query(
    `
    SELECT
      o.orderID, o.qty, o.price, o.orderDate, o.completionDate, o.isPickup, o.address, o.paymentType,
      o.customerID, c.firstName, c.lastName, c.email AS customerEmail,
      o.designerID, d.name AS designerName, d.branch AS designerBranch
    FROM orders o
    JOIN customer c ON o.customerID = c.customerID
    JOIN designer d ON o.designerID = d.designerID
    ORDER BY o.orderDate DESC
    `
  );
  return rows;
}

/**
 * Best-sellers-by-type with optional date filter.
 */
async function getBestSellersByType({ from = null, to = null } = {}) {
  const [ring] = await pool.query(
    `
    SELECT r.bandType AS style, COUNT(*) AS soldCount
    FROM orderitems oi
    JOIN orders o ON o.orderID = oi.orderID
    JOIN ring r ON r.accessoryID = oi.accessoryID
    WHERE (? IS NULL OR o.orderDate >= ?)
      AND (? IS NULL OR o.orderDate <= ?)
    GROUP BY r.bandType
    ORDER BY soldCount DESC
    LIMIT 1
    `,
    [from, from, to, to]
  );

  const [earring] = await pool.query(
    `
    SELECT e.style AS style, COUNT(*) AS soldCount
    FROM orderitems oi
    JOIN orders o ON o.orderID = oi.orderID
    JOIN earring e ON e.accessoryID = oi.accessoryID
    WHERE (? IS NULL OR o.orderDate >= ?)
      AND (? IS NULL OR o.orderDate <= ?)
    GROUP BY e.style
    ORDER BY soldCount DESC
    LIMIT 1
    `,
    [from, from, to, to]
  );

  const [necklace] = await pool.query(
    `
    SELECT n.style AS style, COUNT(*) AS soldCount
    FROM orderitems oi
    JOIN orders o ON o.orderID = oi.orderID
    JOIN necklace n ON n.accessoryID = oi.accessoryID
    WHERE (? IS NULL OR o.orderDate >= ?)
      AND (? IS NULL OR o.orderDate <= ?)
    GROUP BY n.style
    ORDER BY soldCount DESC
    LIMIT 1
    `,
    [from, from, to, to]
  );

  const [bracelet] = await pool.query(
    `
    SELECT b.style AS style, COUNT(*) AS soldCount
    FROM orderitems oi
    JOIN orders o ON o.orderID = oi.orderID
    JOIN bracelet b ON b.accessoryID = oi.accessoryID
    WHERE (? IS NULL OR o.orderDate >= ?)
      AND (? IS NULL OR o.orderDate <= ?)
    GROUP BY b.style
    ORDER BY soldCount DESC
    LIMIT 1
    `,
    [from, from, to, to]
  );

  return {
    ring: ring[0] || { style: null, soldCount: 0 },
    earring: earring[0] || { style: null, soldCount: 0 },
    necklace: necklace[0] || { style: null, soldCount: 0 },
    bracelet: bracelet[0] || { style: null, soldCount: 0 },
  };
}

// src/models/orderModel.js

// src/models/orderModel.js
async function markOrderCompleted(orderID, designerID) {
  const [result] = await pool.query(
    `
    UPDATE orders
    SET
      completionDate = CURDATE(),
      status = 'completed'
    WHERE orderID = ?
      AND designerID = ?
      AND status <> 'completed'
    `,
    [orderID, designerID]
  );

  return result.affectedRows > 0;
}
async function getOrdersByDesigner(designerID) {
  const [rows] = await pool.query(`
    SELECT o.*, c.firstName, c.lastName
    FROM ORDERS o
    JOIN CUSTOMER c ON o.customerID = c.customerID
    WHERE o.designerID = ?
    ORDER BY o.orderDate DESC
  `, [designerID]);
  return rows;
}



module.exports = {
  pool,
  getAccessoriesForOrder,
  markAccessoriesOrdered,
  insertOrder,
  insertOrderItems,
  getOrderHeader,
  getOrderItemsDetailed,
  getOrdersByCustomer,
  getAllOrders,
  getBestSellersByType,
  markOrderCompleted,
  getOrdersByDesigner
};
