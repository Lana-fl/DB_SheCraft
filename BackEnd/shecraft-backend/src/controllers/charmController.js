// src/controllers/charmController.js
const charmModel = require("../models/charmModel");

// GET /api/charms
async function getCharms(req, res) {
  try {
    const charms = await charmModel.getAllCharms();
    res.json(charms);
  } catch (err) {
    console.error("Error in getCharms:", err);
    res.status(500).json({ message: "Failed to fetch charms" });
  }
}

// GET /api/charms/:charmID
async function getCharm(req, res) {
  try {
    const { charmID } = req.params;
    const charm = await charmModel.getCharmById(charmID);

    if (!charm) {
      return res.status(404).json({ message: "Charm not found" });
    }

    res.json(charm);
  } catch (err) {
    console.error("Error in getCharm:", err);
    res.status(500).json({ message: "Failed to fetch charm" });
  }
}

// GET /api/charms/design/:design
async function getCharmsByDesign(req, res) {
  try {
    const { design } = req.params; // 'shapes', 'letter bubble', etc.
    const charms = await charmModel.getCharmsByDesign(design);
    res.json(charms);
  } catch (err) {
    console.error("Error in getCharmsByDesign:", err);
    res.status(500).json({ message: "Failed to fetch charms by design" });
  }
}

// GET /api/charms/shapes?color=Gold
async function getShapesCharms(req, res) {
  try {
    const { color } = req.query; // optional: Silver, Gold, RoseGold, Multicolor
    const charms = await charmModel.getShapesCharms(color);
    res.json(charms);
  } catch (err) {
    console.error("Error in getShapesCharms:", err);
    res.status(500).json({ message: "Failed to fetch shapes charms" });
  }
}

// GET /api/charms/letters?color=Gold
async function getLetterCharms(req, res) {
  try {
    const { color } = req.query; // optional
    const charms = await charmModel.getLetterCharms(color);
    res.json(charms);
  } catch (err) {
    console.error("Error in getLetterCharms:", err);
    res.status(500).json({ message: "Failed to fetch letter charms" });
  }
}

module.exports = {
  getCharms,
  getCharm,
  getCharmsByDesign,
  getShapesCharms,
  getLetterCharms,
};
