// src/routes/customerRoutes.js
const express = require("express");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { validateCustomer } = require("../middleware"); // 👈 from index.js in middleware

const router = express.Router();

// /api/customers
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", validateCustomer, createCustomer);
router.put("/:id", validateCustomer, updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
