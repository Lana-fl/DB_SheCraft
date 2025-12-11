// src/routes/materialRoutes.js
const express = require("express");
const materialController = require("../controllers/materialController");

const router = express.Router();

// /api/materials
router.get("/", materialController.getMaterials);                     // all materials
router.get("/available", materialController.getAvailableMaterials);   // ?minStock=
router.get("/metal/:metal", materialController.getMaterialsByMetal);  // by metal
router.get("/:materialID", materialController.getMaterial);           // by ID
router.put("/:materialID/stock", materialController.updateMaterialStock); // update stock

module.exports = router;
