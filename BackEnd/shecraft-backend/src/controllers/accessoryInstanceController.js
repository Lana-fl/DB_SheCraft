// src/controllers/accessoryInstanceController.js
const {
  createAccessoryInstance,
  cancelAccessoryReservation,
} = require("../models/accessoryInstanceModel");
const { getMaterialsByMetal } = require("../models/materialModel");

exports.createAccessory = async (req, res) => {
  try {
    let { type, materialID, metal, product, charms, stones, nbOfCharms, nbOfStones } = req.body;

    if (!type) return res.status(400).json({ message: "Missing type" });

    // Resolve materialID from metal if materialID not provided
    if (!materialID) {
      if (!metal) return res.status(400).json({ message: "Provide materialID or metal" });

      const rows = await getMaterialsByMetal(metal);
      if (!rows || rows.length === 0) {
        return res.status(400).json({ message: "Invalid metal (no material found)" });
      }

      // If multiple rows exist for same metal, pick cheapest (or pick first).
      rows.sort((a, b) => Number(a.price) - Number(b.price));
      materialID = rows[0].materialID;
    }

    const result = await createAccessoryInstance({
      type,
      materialID,
      nbOfCharms,
      nbOfStones,
      product,
      charms,
      stones,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error("createAccessory error:", err);
    return res.status(err.status || 500).json({
      message: err.status ? err.message : "Failed to create accessory instance",
      error: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
    });
  }
};

exports.cancelAccessory = async (req, res) => {
  try {
    const { accessoryID } = req.params;
    if (!accessoryID) return res.status(400).json({ message: "Missing accessoryID" });

    const result = await cancelAccessoryReservation(accessoryID);
    return res.json({ message: "Reservation cancelled and inventory released", ...result });
  } catch (err) {
    console.error("cancelAccessory error:", err);
    return res.status(err.status || 500).json({
      message: err.status ? err.message : "Failed to cancel accessory reservation",
      error: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
    });
  }
};
