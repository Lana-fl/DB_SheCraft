// src/routes/authRoutes.js
const express = require("express");
const {
  login,
  signupCustomer,
  signupDesigner,
  changePassword, // ✅ ADD
} = require("../controllers/authController");

const { protect } = require("../middleware"); // ✅ ADD

const router = express.Router();

// Login shared for customers & designers
router.post("/login", login);

// Public signup for customers
router.post("/signup/customer", signupCustomer);

// Signup for designers
// ASK MICHELLE AND RAJAA IF I SHOULD KEEP THIS FOR ADMIN
router.post("/signup/designer", signupDesigner);

// ✅ CHANGE PASSWORD (protected)
router.put("/change-password", protect, changePassword);

module.exports = router;
