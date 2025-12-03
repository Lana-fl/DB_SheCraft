const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Change to YOUR MySQL credentials
const pool = mysql.createPool({
  host: "localhost",
  user: "root",              // your MySQL username
  port: "3306",
  password: "",  // your MySQL password
  database: "Jewelry"        // IMPORTANT: your DB name
});

// Helper to generate IDs like C001, O003, etc.
function generateId(prefix) {
  const number = Math.floor(Math.random() * 1000);
  return prefix + number.toString().padStart(3, "0");
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "SheCraft backend running (Jewelry DB)" });
});

// 2. Get all materials
app.get("/api/materials", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM MATERIAL");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching materials:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 3. Create a customer
app.post("/api/customers", async (req, res) => {
  const { firstName, lastName, countryCode, phoneNb, email, cardNb } = req.body;

  if (!email)
    return res.status(400).json({ error: "Email is required" });

  const customerID = generateId("C");

  try {
    await pool.query(
      `
      INSERT INTO CUSTOMER 
      (customerID, firstName, lastName, countryCode, phoneNb, email, cardNb)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [customerID, firstName, lastName, countryCode, phoneNb, email, cardNb]
    );

    res.status(201).json({
      customerID, firstName, lastName, countryCode, phoneNb, email, cardNb
    });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// 4. Get all customers
app.get("/api/customers", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM CUSTOMER");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 5. Get rings with accessory + material
app.get("/api/rings", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        R.ringID,
        R.bandType,
        R.diameter,
        A.accessoryID,
        A.nbOfStones,
        A.nbOfCharms,
        A.price AS accessoryPrice,
        M.materialID,
        M.metal,
        M.price AS materialPrice
      FROM RING R
      JOIN ACCESSORY A ON R.accessoryID = A.accessoryID
      JOIN MATERIAL M ON A.materialID = M.materialID
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching rings:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SheCraft backend running at http://localhost:${PORT}`);
});
