// src/routes/materialRoutes.js
const express = require("express");
const materialController = require("../controllers/materialController");

const router = express.Router();

// /api/materials
router.get("/", materialController.getMaterials);                 // all materials
router.get("/metal/:metal", materialController.getMaterialsByMetal); // by metal
router.get("/:materialID", materialController.getMaterial);       // by ID
router.put("/:materialID/price", materialController.updateMaterialPrice); // update price

module.exports = router;
