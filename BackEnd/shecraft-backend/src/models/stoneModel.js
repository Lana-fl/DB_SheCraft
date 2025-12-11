// src/models/stoneModel.js
const pool = require("../config/db");

// Get all stones
async function getAllStones() {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE`
  );
  return rows;
}

// Get stone by ID
async function getStoneById(stoneID) {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE
     WHERE stoneID = ?`,
    [stoneID]
  );
  return rows[0] || null;
}

// Get stones by gem (diamond, emerald, etc.)
async function getStonesByGem(gem) {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE
     WHERE gem = ?`,
    [gem]
  );
  return rows;
}

// Get stones by color
async function getStonesByColor(color) {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE
     WHERE color = ?`,
    [color]
  );
  return rows;
}

// Get stones by rarity
async function getStonesByRarity(rarity) {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE
     WHERE rarity = ?`,
    [rarity]
  );
  return rows;
}

// Get stones with qty > minQty (default 0)
async function getAvailableStones(minQty = 0) {
  const [rows] = await pool.query(
    `SELECT stoneID, certificationID, cut, gem, purity, rarity,
            price, color, weight, qty
     FROM STONE
     WHERE qty > ?`,
    [minQty]
  );
  return rows;
}

// Update qty for a stone (for inventory adjustments)
async function updateStoneQty(stoneID, newQty) {
  const [result] = await pool.query(
    `UPDATE STONE
     SET qty = ?
     WHERE stoneID = ?`,
    [newQty, stoneID]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllStones,
  getStoneById,
  getStonesByGem,
  getStonesByColor,
  getStonesByRarity,
  getAvailableStones,
  updateStoneQty,
};
