// src/controllers/designerController.js
const designerModel = require("../models/designerModel");

// GET /api/designers
async function getDesigners(req, res) {
  try {
    const designers = await designerModel.getAllDesigners();
    res.json(designers);
  } catch (err) {
    console.error("Error in getDesigners:", err);
    res.status(500).json({ message: "Failed to fetch designers" });
  }
}

// GET /api/designers/:id
async function getDesigner(req, res) {
  try {
    const { id } = req.params;
    const designer = await designerModel.getDesignerById(id);

    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.json(designer);
  } catch (err) {
    console.error("Error in getDesigner:", err);
    res.status(500).json({ message: "Failed to fetch designer" });
  }
}

// PUT /api/designers/:id
async function updateDesigner(req, res) {
  try {
    const { id } = req.params;
    const updated = await designerModel.updateDesigner(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.json({ message: "Designer updated successfully" });
  } catch (err) {
    console.error("Error in updateDesigner:", err);
    res.status(500).json({ message: "Failed to update designer" });
  }
}

// DELETE /api/designers/:id
async function deleteDesigner(req, res) {
  try {
    const { id } = req.params;
    const deleted = await designerModel.deleteDesigner(id);

    if (!deleted) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.status(204).send(); // no content
  } catch (err) {
    console.error("Error in deleteDesigner:", err);
    res.status(500).json({ message: "Failed to delete designer" });
  }
}

// ================= MY DESIGNER ACCOUNT =================

async function getMyDesignerAccount(req, res) {
  try {
    const designerID = req.user.id;

    const designer = await designerModel.getMyDesignerAccount(designerID);

    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.json(designer);
  } catch (err) {
    console.error("Error fetching designer account:", err);
    res.status(500).json({ message: "Failed to load account" });
  }
}

async function updateMyDesignerAccount(req, res) {
  try {
    const designerID = req.user.id;
    const { name, branch, email } = req.body;

    if (!name || !branch || !email) {
      return res.status(400).json({
        message: "Name, branch, and email are required",
      });
    }

    const updated = await designerModel.updateMyDesignerAccount(
      designerID,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.json({ message: "Account updated successfully" });
  } catch (err) {
    console.error("Error updating designer account:", err);
    res.status(500).json({ message: "Failed to update account" });
  }
}


module.exports = {
  getDesigners,
  getDesigner,
  updateDesigner,
  deleteDesigner,
  getMyDesignerAccount,
  updateMyDesignerAccount,
};
