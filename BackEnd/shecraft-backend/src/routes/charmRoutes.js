// src/routes/charmRoutes.js
const express = require("express");
const charmController = require("../controllers/charmController");

const router = express.Router();

// /api/charms
router.get("/", charmController.getCharms);                 // all charms
router.get("/shapes", charmController.getShapesCharms);     // shapes, ?color=
router.get("/letters", charmController.getLetterCharms);    // letters*, ?color=
router.get("/design/:design", charmController.getCharmsByDesign); // by design
router.get("/:charmID", charmController.getCharm);          // by ID

module.exports = router;
