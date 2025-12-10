const express = require("express");
const {
  getRings,
  getBracelets,
  getNecklaces,
  getEarrings,
} = require("../controllers/accessoryController");

const router = express.Router();

// GET /api/accessories/rings
router.get("/rings", getRings);

// GET /api/accessories/bracelets
router.get("/bracelets", getBracelets);

// GET /api/accessories/necklaces
router.get("/necklaces", getNecklaces);

// GET /api/accessories/earrings
router.get("/earrings", getEarrings);

module.exports = router;
