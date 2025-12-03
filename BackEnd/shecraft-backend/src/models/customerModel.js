// src/models/customerModel.js
const pool = require("../config/db");

// Get all customers
async function getAllCustomers() {
  const [rows] = await pool.query("SELECT * FROM CUSTOMER");
  return rows;
}

// Get single customer by ID
async function getCustomerById(customerID) {
  const [rows] = await pool.query(
    "SELECT * FROM CUSTOMER WHERE customerID = ?",
    [customerID]
  );
  return rows[0] || null;
}

// Create new customer
async function createCustomer(data) {
  const { customerID, firstName, lastName, countryCode, phoneNb, email, cardNb } = data;

  await pool.query(
    `INSERT INTO CUSTOMER
      (customerID, firstName, lastName, countryCode, phoneNb, email, cardNb)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [customerID, firstName, lastName, countryCode, phoneNb, email, cardNb]
  );

  return getCustomerById(customerID);
}

// Update customer
async function updateCustomer(customerID, data) {
  const { firstName, lastName, countryCode, phoneNb, email, cardNb } = data;

  await pool.query(
    `UPDATE CUSTOMER
     SET firstName = ?, lastName = ?, countryCode = ?, phoneNb = ?, email = ?, cardNb = ?
     WHERE customerID = ?`,
    [firstName, lastName, countryCode, phoneNb, email, cardNb, customerID]
  );

  return getCustomerById(customerID);
}

// Delete customer
async function deleteCustomer(customerID) {
  const [result] = await pool.query(
    "DELETE FROM CUSTOMER WHERE customerID = ?",
    [customerID]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
