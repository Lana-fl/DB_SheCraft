// src/routes/designerRoutes.js
const express = require("express");
const {
  getDesigners,
  getDesigner,
  updateDesigner,
  deleteDesigner,
} = require("../controllers/designerController");

const router = express.Router();

// /api/designers
router.get("/", getDesigners);
router.get("/:id", getDesigner);
router.put("/:id", updateDesigner);
router.delete("/:id", deleteDesigner);

module.exports = router;
