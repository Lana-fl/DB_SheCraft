// src/models/designerModel.js
const pool = require("../config/db");

/* ===============================
   GETTERS
================================ */

// Get all designers (no passwordHash)
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

/* ===============================
   UPDATES (ADMIN)
================================ */

// Update designer by ID (admin / management)
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
    [name, branch, email, countryCode, phoneNb, designerID]
  );

  return result.affectedRows > 0;
}

/* ===============================
   DELETE
================================ */

async function deleteDesigner(designerID) {
  const [result] = await pool.query(
    "DELETE FROM DESIGNER WHERE designerID = ?",
    [designerID]
  );

  return result.affectedRows > 0;
}

/* ===============================
   MY DESIGNER ACCOUNT (JWT)
================================ */

// Get logged-in designer account
async function getMyDesignerAccount(designerID) {
  const [rows] = await pool.query(
    `
    SELECT
      name,
      email,
      branch,
      countryCode,
      phoneNb
    FROM DESIGNER
    WHERE designerID = ?
    `,
    [designerID]
  );

  return rows[0] || null;
}

// Update logged-in designer account
async function updateMyDesignerAccount(designerID, data) {
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
    [name, branch, email, countryCode, phoneNb, designerID]
  );

  return result.affectedRows > 0;
}

/* ===============================
   EXPORTS
================================ */

module.exports = {
  getAllDesigners,
  getDesignerById,
  updateDesigner,
  deleteDesigner,
  getMyDesignerAccount,
  updateMyDesignerAccount,
};
