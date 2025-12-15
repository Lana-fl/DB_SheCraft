// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const customerRoutes = require("./routes/customerRoutes"); 
const orderRoutes = require("./routes/orderRoutes");         

const { requestLogger } = require("./middleware"); // optional but nice

const authRoutes = require("./routes/authRoutes");
const accessoryRoutes = require("./routes/accessoryRoutes");
const designerRoutes = require("./routes/designerRoutes");
const charmRoutes = require("./routes/charmRoutes");
const materialRoutes = require("./routes/materialRoutes");
const stoneRoutes = require("./routes/stoneRoutes");



const app = express();

app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Global middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3001", // your React dev server
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // safe even if you don't use cookies yet
  })
);

app.use(express.json());
app.use(requestLogger); // logs every request

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/accessories", accessoryRoutes);
app.use("/api/orders", orderRoutes);   
app.use("/api/designers", designerRoutes);
app.use("/api/charms", charmRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/stones", stoneRoutes);
app.use("/api/accessory-instance", require("./routes/accessoryInstanceRoutes"));


// Health check
const pool = require("./config/db");

// ...
app.get("/api/health/db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ db: "up", rows });
  } catch (err) {
    console.error("DB health check failed:", err);
    res.status(500).json({ db: "down", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Jewelry API is running 💍" });
});

module.exports = app;
