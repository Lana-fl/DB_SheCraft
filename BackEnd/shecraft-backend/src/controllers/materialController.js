// src/controllers/materialController.js
const materialModel = require("../models/materialModel");

// GET /api/materials
async function getMaterials(req, res) {
  try {
    const materials = await materialModel.getAllMaterials();
    res.json(materials);
  } catch (err) {
    console.error("Error in getMaterials:", err);
    res.status(500).json({ message: "Failed to fetch materials" });
  }
}

// GET /api/materials/:materialID
async function getMaterial(req, res) {
  try {
    const { materialID } = req.params;
    const material = await materialModel.getMaterialById(materialID);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json(material);
  } catch (err) {
    console.error("Error in getMaterial:", err);
    res.status(500).json({ message: "Failed to fetch material" });
  }
}

// GET /api/materials/metal/:metal
async function getMaterialsByMetal(req, res) {
  try {
    const { metal } = req.params;
    const materials = await materialModel.getMaterialsByMetal(metal);
    res.json(materials);
  } catch (err) {
    console.error("Error in getMaterialsByMetal:", err);
    res.status(500).json({ message: "Failed to fetch materials by metal" });
  }
}

// GET /api/materials/available?minStock=1
async function getAvailableMaterials(req, res) {
  try {
    const { minStock } = req.query;
    const parsedMinStock =
      typeof minStock === "string" && minStock.trim() !== ""
        ? Number(minStock)
        : 0;

    const materials = await materialModel.getAvailableMaterials(parsedMinStock);
    res.json(materials);
  } catch (err) {
    console.error("Error in getAvailableMaterials:", err);
    res.status(500).json({ message: "Failed to fetch available materials" });
  }
}

// PUT /api/materials/:materialID/stock
async function updateMaterialStock(req, res) {
  try {
    const { materialID } = req.params;
    const { stock } = req.body;

    if (stock == null || isNaN(Number(stock))) {
      return res.status(400).json({ message: "Valid 'stock' is required" });
    }

    const updated = await materialModel.updateMaterialStock(
      materialID,
      Number(stock)
    );

    if (!updated) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json({ message: "Material stock updated successfully" });
  } catch (err) {
    console.error("Error in updateMaterialStock:", err);
    res.status(500).json({ message: "Failed to update material stock" });
  }
}

module.exports = {
  getMaterials,
  getMaterial,
  getMaterialsByMetal,
  getAvailableMaterials,
  updateMaterialStock,
};
