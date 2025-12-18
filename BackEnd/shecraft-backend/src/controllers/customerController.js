// src/controllers/customerController.js
const pool = require("../config/db");

// GET /api/customers
async function getCustomers(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM CUSTOMER");
    res.json(rows); // 🔥 VERY IMPORTANT: always send a response
  } catch (err) {
    console.error("Error in getCustomers:", err);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
}

// GET /api/customers/:id
async function getCustomer(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM CUSTOMER WHERE customerID = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error in getCustomer:", err);
    res.status(500).json({ message: "Failed to fetch customer" });
  }
}

// (Optional) we won’t use these in the app, but I’ll leave them working:
async function createCustomer(req, res) {
  try {
    const {
      customerID,
      firstName,
      lastName,
      countryCode,
      phoneNb,
      email,
      cardNb,
      passwordHash, // only for debugging; real signup uses authController
    } = req.body;

    await pool.query(
      `INSERT INTO CUSTOMER
       (customerID, firstName, lastName, countryCode, phoneNb, email, cardNb, passwordHash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerID,
        firstName || null,
        lastName || null,
        countryCode || null,
        phoneNb || null,
        email,
        cardNb || null,
        passwordHash || null,
      ]
    );

    res.status(201).json({ message: "Customer created (raw CRUD)" });
  } catch (err) {
    console.error("Error in createCustomer:", err);
    res.status(500).json({ message: "Failed to create customer" });
  }
}

async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, countryCode, phoneNb } = req.body;

    await pool.query(
      `UPDATE CUSTOMER
       SET firstName = ?, lastName = ?, countryCode = ?, phoneNb = ?
       WHERE customerID = ?`,
      [firstName || null, lastName || null, countryCode || null, phoneNb || null, id]
    );

    res.json({ message: "Customer updated" });
  } catch (err) {
    console.error("Error in updateCustomer:", err);
    res.status(500).json({ message: "Failed to update customer" });
  }
}

async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM CUSTOMER WHERE customerID = ?", [id]);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    console.error("Error in deleteCustomer:", err);
    res.status(500).json({ message: "Failed to delete customer" });
  }
}

// PUT /api/customers/account
async function updateMyCustomerAccount(req, res) {
  try {
    // 🔒 Comes from JWT (authController guarantees this)
    const customerID = req.user.id;

    const {
      firstName,
      lastName,
      countryCode,
      phoneNb,
      email,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await pool.query(
      `
      UPDATE CUSTOMER
      SET firstName = ?, lastName = ?, countryCode = ?, phoneNb = ?, email = ?
      WHERE customerID = ?
      `,
      [
        firstName || null,
        lastName || null,
        countryCode || null,
        phoneNb || null,
        email,
        customerID,
      ]
    );

    res.json({ message: "Account updated successfully" });
  } catch (err) {
    console.error("Error updating customer account:", err);
    res.status(500).json({ message: "Failed to update account" });
  }
}

async function getMyCustomerAccount(req, res) {
  try {
    const { id } = req.user;

    const [rows] = await pool.query(
      `
      SELECT 
        CONCAT_WS(' ', firstName, lastName) AS name,
        email,
        phoneNb AS phone
      FROM CUSTOMER
      WHERE customerID = ?
      `,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load account" });
  }
}


module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
    updateMyCustomerAccount,
    getMyCustomerAccount,
};
