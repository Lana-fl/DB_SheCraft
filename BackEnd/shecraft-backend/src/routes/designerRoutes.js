// src/routes/designerRoutes.js
const express = require("express");
const { protect } = require("../middleware");

const {
  getDesigners,
  getDesigner,
  updateDesigner,
  deleteDesigner,
  getMyDesignerAccount,
  updateMyDesignerAccount,
} = require("../controllers/designerController");

const router = express.Router();

/* =====================
   🔐 LOGGED-IN DESIGNER
   ===================== */

// GET logged-in designer account
// GET /api/designers/account
router.get("/account", protect, getMyDesignerAccount);

// UPDATE logged-in designer account
// PUT /api/designers/account
router.put("/account", protect, updateMyDesignerAccount);

/* =====================
   ADMIN / PUBLIC ROUTES
   ===================== */

router.get("/", getDesigners);
router.get("/:id", getDesigner);
router.put("/:id", updateDesigner);
router.delete("/:id", deleteDesigner);




module.exports = router;

