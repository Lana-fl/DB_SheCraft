// src/models/charmModel.js
const pool = require("../config/db");

// Get all charms
async function getAllCharms() {
  const [rows] = await pool.query(
    `SELECT charmID, design, material, qty, price, color
     FROM CHARM`
  );
  return rows;
}

// Get charm by ID
async function getCharmById(charmID) {
  const [rows] = await pool.query(
    `SELECT charmID, design, material, qty, price, color
     FROM CHARM
     WHERE charmID = ?`,
    [charmID]
  );
  return rows[0] || null;
}

// Get charms by exact design (shapes, letter bubble, letter cursive, letter spark)
async function getCharmsByDesign(design) {
  const [rows] = await pool.query(
    `SELECT charmID, design, material, qty, price, color
     FROM CHARM
     WHERE design = ?`,
    [design]
  );
  return rows;
}

// Get shapes charms, optional color filter
async function getShapesCharms(color) {
  let sql = `
    SELECT charmID, design, material, qty, price, color
    FROM CHARM
    WHERE design = 'shapes'
  `;
  const params = [];

  if (color) {
    sql += " AND color = ?";
    params.push(color);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

// Get letter charms (design IN ('letter bubble', 'letter cursive', 'letter spark')),
// optional color filter
async function getLetterCharms(color) {
  let sql = `
    SELECT charmID, design, material, qty, price, color
    FROM CHARM
    WHERE design IN ('letter bubble', 'letter cursive', 'letter spark')
  `;
  const params = [];

  if (color) {
    sql += " AND color = ?";
    params.push(color);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = {
  getAllCharms,
  getCharmById,
  getCharmsByDesign,
  getShapesCharms,
  getLetterCharms,
};
