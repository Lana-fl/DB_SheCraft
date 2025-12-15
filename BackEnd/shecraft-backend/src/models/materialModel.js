// src/models/materialModel.js
const pool = require("../config/db");

// Get all materials
async function getAllMaterials() {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price
     FROM material`
  );
  return rows;
}

// Get one material by ID
async function getMaterialById(materialID) {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price
     FROM material
     WHERE materialID = ?`,
    [materialID]
  );
  return rows[0] || null;
}

// Get materials by metal (e.g., "gold", "14K Gold", etc.)
async function getMaterialsByMetal(metal) {
  const [rows] = await pool.query(
    `SELECT materialID, metal, price
     FROM material
     WHERE metal = ?`,
    [metal]
  );
  return rows;
}

// Update price for a material
async function updateMaterialPrice(materialID, newPrice) {
  const [result] = await pool.query(
    `UPDATE material
     SET price = ?
     WHERE materialID = ?`,
    [newPrice, materialID]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  getMaterialsByMetal,
  updateMaterialPrice,
};
