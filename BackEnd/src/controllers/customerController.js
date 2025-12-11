// src/controllers/customerController.js
const customerModel = require("../models/customerModel");

// GET /api/customers
async function getCustomers(req, res) {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
  } catch (err) {
    console.error("Error in getCustomers:", err);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
}

// GET /api/customers/:id
async function getCustomer(req, res) {
  try {
    const { id } = req.params;
    const customer = await customerModel.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error("Error in getCustomer:", err);
    res.status(500).json({ message: "Failed to fetch customer" });
  }
}

// POST /api/customers
async function createCustomer(req, res) {
  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error("Error in createCustomer:", err);

    // Optional: simple duplicate email handling
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email or ID already exists" });
    }

    res.status(500).json({ message: "Failed to create customer" });
  }
}

// PUT /api/customers/:id
async function updateCustomer(req, res) {
  try {
    const { id } = req.params;

    const existing = await customerModel.getCustomerById(id);
    if (!existing) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const updated = await customerModel.updateCustomer(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error("Error in updateCustomer:", err);
    res.status(500).json({ message: "Failed to update customer" });
  }
}

// DELETE /api/customers/:id
async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;

    const deleted = await customerModel.deleteCustomer(id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error in deleteCustomer:", err);
    res.status(500).json({ message: "Failed to delete customer" });
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
