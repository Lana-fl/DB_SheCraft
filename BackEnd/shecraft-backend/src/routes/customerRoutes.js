// src/routes/customerRoutes.js
const express = require("express");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomer);    // not used by signup flow, just CRUD
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
