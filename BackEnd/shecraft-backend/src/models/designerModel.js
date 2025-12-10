// src/models/designerModel.js
const pool = require("../config/db");

// Get all designers (we don't return passwordHash if it exists)
async function getAllDesigners() {
  const [rows] = await pool.query(`
    SELECT 
      designerID,
      name,
      branch,
      email,
      countryCode,
      phoneNb
    FROM DESIGNER
  `);
  return rows;
}

// Get single designer by ID
async function getDesignerById(designerID) {
  const [rows] = await pool.query(
    `
    SELECT 
      designerID,
      name,
      branch,
      email,
      countryCode,
      phoneNb
    FROM DESIGNER
    WHERE designerID = ?
    `,
    [designerID]
  );
  return rows[0] || null;
}

// Update designer basic info
async function updateDesigner(designerID, data) {
  const { name, branch, email, countryCode, phoneNb } = data;

  const [result] = await pool.query(
    `
    UPDATE DESIGNER
    SET 
      name = ?,
      branch = ?,
      email = ?,
      countryCode = ?,
      phoneNb = ?
    WHERE designerID = ?
    `,
    [
      name || null,
      branch || null,
      email || null,
      countryCode || null,
      phoneNb || null,
      designerID,
    ]
  );

  return result.affectedRows > 0;
}

// Delete designer
async function deleteDesigner(designerID) {
  const [result] = await pool.query(
    "DELETE FROM DESIGNER WHERE designerID = ?",
    [designerID]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllDesigners,
  getDesignerById,
  updateDesigner,
  deleteDesigner,
};
