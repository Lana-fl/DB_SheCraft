// src/controllers/materialController.js
const materialModel = require("../models/materialModel");

// GET /api/materials
async function getMaterials(req, res) {
  try {
    const materials = await materialModel.getAllMaterials();
    return res.json(materials);
  } catch (err) {
    console.error("Error in getMaterials:", err);
    return res.status(500).json({ message: "Failed to fetch materials" });
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

    return res.json(material);
  } catch (err) {
    console.error("Error in getMaterial:", err);
    return res.status(500).json({ message: "Failed to fetch material" });
  }
}

// GET /api/materials/metal/:metal
async function getMaterialsByMetal(req, res) {
  try {
    const { metal } = req.params;
    const materials = await materialModel.getMaterialsByMetal(metal);
    return res.json(materials);
  } catch (err) {
    console.error("Error in getMaterialsByMetal:", err);
    return res.status(500).json({ message: "Failed to fetch materials by metal" });
  }
}

// PUT /api/materials/:materialID/price
async function updateMaterialPrice(req, res) {
  try {
    const { materialID } = req.params;
    const { price } = req.body;

    if (price == null || isNaN(Number(price))) {
      return res.status(400).json({ message: "Valid 'price' is required" });
    }

    const updated = await materialModel.updateMaterialPrice(materialID, Number(price));

    if (!updated) {
      return res.status(404).json({ message: "Material not found" });
    }

    return res.json({ message: "Material price updated successfully" });
  } catch (err) {
    console.error("Error in updateMaterialPrice:", err);
    return res.status(500).json({ message: "Failed to update material price" });
  }
}

module.exports = {
  getMaterials,
  getMaterial,
  getMaterialsByMetal,
  updateMaterialPrice,
};
