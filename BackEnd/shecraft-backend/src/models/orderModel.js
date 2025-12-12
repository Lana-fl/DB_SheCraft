// src/models/orderModel.js
const pool = require("../config/db");

async function getAccessoryPricesByIds(conn, accessoryIDs) {
  const placeholders = accessoryIDs.map(() => "?").join(", ");
  const [rows] = await conn.query(
    `SELECT accessoryID, price
     FROM ACCESSORY
     WHERE accessoryID IN (${placeholders})`,
    accessoryIDs
  );
  return rows;
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
    `INSERT INTO ORDERS
      (orderID, qty, designerID, isPickup, price, orderDate, completionDate, address, paymentType, customerID)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      `INSERT INTO ORDERITEMS (orderID, accessoryID)
       VALUES (?, ?)`,
      [orderID, accessoryID]
    );
  }
}

async function getOrderHeader(orderID) {
  const [rows] = await pool.query(
    `
    SELECT
      o.orderID, o.qty, o.price, o.orderDate, o.completionDate, o.isPickup, o.address, o.paymentType,
      o.customerID, c.firstName, c.lastName, c.email AS customerEmail, c.phoneNb AS customerPhone,
      o.designerID, d.name AS designerName, d.branch AS designerBranch, d.email AS designerEmail
    FROM ORDERS o
    JOIN CUSTOMER c ON o.customerID = c.customerID
    JOIN DESIGNER d ON o.designerID = d.designerID
    WHERE o.orderID = ?
    `,
    [orderID]
  );
  return rows;
}

async function getOrderItemsDetailed(orderID) {
  const [rows] = await pool.query(
    `
    SELECT
      a.accessoryID,
      a.price,
      a.nbOfStones,
      a.nbOfCharms,
      a.materialID,
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
  return rows;
}

async function getOrdersByCustomer(customerID) {
  const [rows] = await pool.query(
    `
    SELECT
      o.orderID, o.qty, o.price, o.orderDate, o.completionDate, o.isPickup, o.address, o.paymentType,
      o.designerID, d.name AS designerName, d.branch AS designerBranch
    FROM ORDERS o
    JOIN DESIGNER d ON o.designerID = d.designerID
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
    FROM ORDERS o
    JOIN CUSTOMER c ON o.customerID = c.customerID
    JOIN DESIGNER d ON o.designerID = d.designerID
    ORDER BY o.orderDate DESC
    `
  );
  return rows;
}

/**
 * Best-sellers by type/style.
 * soldCount is computed (COUNT(*)) from ORDERITEMS joins.
 * Optional date filter: from/to based on ORDERS.orderDate
 */
async function getBestSellersByType({ from = null, to = null } = {}) {
  // Each query returns top 1 per type
  const [ring] = await pool.query(
    `
    SELECT r.bandType AS style, COUNT(*) AS soldCount
    FROM ORDERITEMS oi
    JOIN ORDERS o ON o.orderID = oi.orderID
    JOIN RING r ON r.accessoryID = oi.accessoryID
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
    FROM ORDERITEMS oi
    JOIN ORDERS o ON o.orderID = oi.orderID
    JOIN EARRING e ON e.accessoryID = oi.accessoryID
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
    FROM ORDERITEMS oi
    JOIN ORDERS o ON o.orderID = oi.orderID
    JOIN NECKLACE n ON n.accessoryID = oi.accessoryID
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
    FROM ORDERITEMS oi
    JOIN ORDERS o ON o.orderID = oi.orderID
    JOIN BRACELET b ON b.accessoryID = oi.accessoryID
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

module.exports = {
  pool,
  getAccessoryPricesByIds,
  insertOrder,
  insertOrderItems,
  getOrderHeader,
  getOrderItemsDetailed,
  getOrdersByCustomer,
  getAllOrders,
  getBestSellersByType,
};
