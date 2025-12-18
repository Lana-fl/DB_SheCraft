// src/models/charmModel.js
const pool = require("../config/db");

// Get all charms
async function getAllCharms() {
  const [rows] = await pool.query(
    `SELECT charmID, design, qty, price, color, photoURL
     FROM CHARM`
  );
  return rows;
}

async function getCharmById(charmID) {
  const [rows] = await pool.query(
    `SELECT charmID, design, qty, price, color, photoURL
     FROM CHARM
     WHERE charmID = ?`,
    [charmID]
  );
  return rows[0] || null;
}

async function getCharmsByDesign(design) {
  const [rows] = await pool.query(
    `SELECT charmID, design, qty, price, color, photoURL
     FROM CHARM
     WHERE design = ?`,
    [design]
  );
  return rows;
}

async function getShapesCharms(color) {
  let sql = `
    SELECT charmID, design, qty, price, color, photoURL
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

async function getLetterCharms(color) {
  let sql = `
    SELECT charmID, design, qty, price, color, photoURL
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
