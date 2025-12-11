// src/routes/stoneRoutes.js
const express = require("express");
const stoneController = require("../controllers/stoneController");

const router = express.Router();

// /api/stones
router.get("/", stoneController.getStones);                     // all stones
router.get("/available", stoneController.getAvailableStones);   // ?minQty=
router.get("/gem/:gem", stoneController.getStonesByGem);        // by gem
router.get("/color/:color", stoneController.getStonesByColor);  // by color
router.get("/rarity/:rarity", stoneController.getStonesByRarity); // by rarity
router.get("/:stoneID", stoneController.getStone);              // by ID
router.put("/:stoneID/qty", stoneController.updateStoneQty);    // update qty

module.exports = router;
