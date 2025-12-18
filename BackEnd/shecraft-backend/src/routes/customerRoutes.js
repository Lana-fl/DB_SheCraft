// src/routes/customerRoutes.js
const express = require("express");
const { protect } = require("../middleware");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  updateMyCustomerAccount,
  getMyCustomerAccount,
} = require("../controllers/customerController");

// ✅ 1. CREATE ROUTER FIRST
const router = express.Router();

/* =========================
   LOGGED-IN CUSTOMER ROUTES
   ========================= */

// ⚠️ MUST COME BEFORE "/:id"
router.get("/account", protect, getMyCustomerAccount);
router.put("/account", protect, updateMyCustomerAccount);

/* =========================
   ADMIN / GENERAL CRUD
   ========================= */

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
