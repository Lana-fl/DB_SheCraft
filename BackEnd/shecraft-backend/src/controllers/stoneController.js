// src/controllers/stoneController.js
const stoneModel = require("../models/stoneModel");

// GET /api/stones
async function getStones(req, res) {
  try {
    const stones = await stoneModel.getAllStones();
    res.json(stones);
  } catch (err) {
    console.error("Error in getStones:", err);
    res.status(500).json({ message: "Failed to fetch stones" });
  }
}

// GET /api/stones/:stoneID
async function getStone(req, res) {
  try {
    const { stoneID } = req.params;
    const stone = await stoneModel.getStoneById(stoneID);
 
    if (!stone) {
      return res.status(404).json({ message: "Stone not found" });
    }

    res.json(stone);
  } catch (err) {
    console.error("Error in getStone:", err);
    res.status(500).json({ message: "Failed to fetch stone" });
  }
}

// GET /api/stones/gem/:gem
async function getStonesByGem(req, res) {
  try {
    const { gem } = req.params;
    const stones = await stoneModel.getStonesByGem(gem);
    res.json(stones);
  } catch (err) {
    console.error("Error in getStonesByGem:", err);
    res.status(500).json({ message: "Failed to fetch stones by gem" });
  }
}

// GET /api/stones/color/:color
async function getStonesByColor(req, res) {
  try {
    const { color } = req.params;
    const stones = await stoneModel.getStonesByColor(color);
    res.json(stones);
  } catch (err) {
    console.error("Error in getStonesByColor:", err);
    res.status(500).json({ message: "Failed to fetch stones by color" });
  }
}

// GET /api/stones/rarity/:rarity
async function getStonesByRarity(req, res) {
  try {
    const { rarity } = req.params;
    const stones = await stoneModel.getStonesByRarity(rarity);
    res.json(stones);
  } catch (err) {
    console.error("Error in getStonesByRarity:", err);
    res.status(500).json({ message: "Failed to fetch stones by rarity" });
  }
}

// GET /api/stones/available?minQty=1
async function getAvailableStones(req, res) {
  try {
    const { minQty } = req.query;
    const parsedMinQty =
      typeof minQty === "string" && minQty.trim() !== ""
        ? Number(minQty)
        : 0;

    const stones = await stoneModel.getAvailableStones(parsedMinQty);
    res.json(stones);
  } catch (err) {
    console.error("Error in getAvailableStones:", err);
    res.status(500).json({ message: "Failed to fetch available stones" });
  }
}

// PUT /api/stones/:stoneID/qty
async function updateStoneQty(req, res) {
  try {
    const { stoneID } = req.params;
    const { qty } = req.body;

    if (qty == null || isNaN(Number(qty))) {
      return res.status(400).json({ message: "Valid 'qty' is required" });
    }

    const updated = await stoneModel.updateStoneQty(stoneID, Number(qty));

    if (!updated) {
      return res.status(404).json({ message: "Stone not found" });
    }

    res.json({ message: "Stone quantity updated successfully" });
  } catch (err) {
    console.error("Error in updateStoneQty:", err);
    res.status(500).json({ message: "Failed to update stone quantity" });
  }
}
async function getStonesByHexColor(req, res) {
  try {
    const { hex } = req.params; // ✅ matches /hex/:hex
    const stones = await stoneModel.getStonesByHexColor(hex);
    res.json(stones);
  } catch (err) {
    console.error("Error in getStonesByHexColor:", err);
    res.status(500).json({ message: "Failed to fetch stones by hex color" });
  }
}

async function getBirthstonesByMonth(req, res) {
  try {
    const { month } = req.params; // month string (e.g. "January")
    const stones = await stoneModel.getBirthstonesByMonth(month);
    res.json(stones);
  } catch (err) {
    console.error("Error in getBirthstonesByMonth:", err);
    res.status(500).json({ message: "Failed to fetch birthstones by month" });
  }
}

module.exports = {
  getStones,
  getStone,
  getStonesByGem,
  getStonesByColor,
  getStonesByHexColor,
  getBirthstonesByMonth,
  getStonesByRarity,
  getAvailableStones,
  updateStoneQty,
};
