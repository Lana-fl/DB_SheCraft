const {
  getRings,
  getBracelets,
  getNecklaces,
  getEarrings,
} = require("../models/accessoryModel");

exports.getRings = async (req, res) => {
  try {
    const rings = await getRings();
    res.json(rings);
  } catch (err) {
    console.error("Error in getRings:", err);
    res.status(500).json({ message: "Failed to fetch rings" });
  }
};

exports.getBracelets = async (req, res) => {
  try {
    const bracelets = await getBracelets();
    res.json(bracelets);
  } catch (err) {
    console.error("Error in getBracelets:", err);
    res.status(500).json({ message: "Failed to fetch bracelets" });
  }
};

exports.getNecklaces = async (req, res) => {
  try {
    const necklaces = await getNecklaces();
    res.json(necklaces);
  } catch (err) {
    console.error("Error in getNecklaces:", err);
    res.status(500).json({ message: "Failed to fetch necklaces" });
  }
};

exports.getEarrings = async (req, res) => {
  try {
    const earrings = await getEarrings();
    res.json(earrings);
  } catch (err) {
    console.error("Error in getEarrings:", err);
    res.status(500).json({ message: "Failed to fetch earrings" });
  }
};
