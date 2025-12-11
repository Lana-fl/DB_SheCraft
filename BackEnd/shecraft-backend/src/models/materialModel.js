// src/models/materialModel.js
const pool = require("../config/db");

// Get all materials
async function getAllMaterials() {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price, stock
     FROM MATERIAL`
  );
  return rows;
}

// Get one material by ID
async function getMaterialById(materialID) {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price, stock
     FROM MATERIAL
     WHERE materialID = ?`,
    [materialID]
  );
  return rows[0] || null;
}

// Get all materials by metal type (e.g. Gold, Silver, etc.)
async function getMaterialsByMetal(metal) {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price, stock
     FROM MATERIAL
     WHERE metal = ?`,
    [metal]
  );
  return rows;
}

// Get materials that have stock > minStock (default 0)
async function getAvailableMaterials(minStock = 0) {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price, stock
     FROM MATERIAL
     WHERE stock > ?`,
    [minStock]
  );
  return rows;
}

// Update stock for a material (useful when creating / updating orders)
async function updateMaterialStock(materialID, newStock) {
  const [result] = await pool.query(
    `UPDATE MATERIAL
     SET stock = ?
     WHERE materialID = ?`,
    [newStock, materialID]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  getMaterialsByMetal,
  getAvailableMaterials,
  updateMaterialStock,
};
