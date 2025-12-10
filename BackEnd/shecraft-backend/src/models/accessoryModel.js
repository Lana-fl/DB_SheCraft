const pool = require("../config/db");

async function getRings() {
  const [rows] = await pool.query(`
    SELECT 
      a.accessoryID,
      a.price,
      a.nbOfStones,
      a.nbOfCharms,
      m.metal,
      r.ringID,
      r.bandType,
      r.diameter
    FROM ACCESSORY a
    JOIN RING r ON r.accessoryID = a.accessoryID
    JOIN MATERIAL m ON m.materialID = a.materialID
  `);
  return rows;
}

async function getBracelets() {
  const [rows] = await pool.query(`
    SELECT 
      a.accessoryID,
      a.price,
      a.nbOfStones,
      a.nbOfCharms,
      m.metal,
      b.braceletID,
      b.length,
      b.engraving,
      b.style,
      b.classType
    FROM ACCESSORY a
    JOIN BRACELET b ON b.accessoryID = a.accessoryID
    JOIN MATERIAL m ON m.materialID = a.materialID
  `);
  return rows;
}

async function getNecklaces() {
  const [rows] = await pool.query(`
    SELECT 
      a.accessoryID,
      a.price,
      a.nbOfStones,
      a.nbOfCharms,
      m.metal,
      n.necklaceID,
      n.thickiness,
      n.length
    FROM ACCESSORY a
    JOIN NECKLACE n ON n.accessoryID = a.accessoryID
    JOIN MATERIAL m ON m.materialID = a.materialID
  `);
  return rows;
}

async function getEarrings() {
  const [rows] = await pool.query(`
    SELECT 
      a.accessoryID,
      a.price,
      a.nbOfStones,
      a.nbOfCharms,
      m.metal,
      e.earringID,
      e.earringType,
      e.backing,
      e.size
    FROM ACCESSORY a
    JOIN EARRING e ON e.accessoryID = a.accessoryID
    JOIN MATERIAL m ON m.materialID = a.materialID
  `);
  return rows;
}

module.exports = {
  getRings,
  getBracelets,
  getNecklaces,
  getEarrings,
};
