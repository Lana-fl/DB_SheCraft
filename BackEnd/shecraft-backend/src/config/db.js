// src/config/db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "Jewelry",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000, // 5 seconds max wait
});

// Test connection once at startup
(async () => {
  console.log("🔌 Testing DB connection...");
  try {
    const conn = await pool.getConnection();
    console.log("✅ DB connected successfully! Connection id:", conn.threadId);
    conn.release();
  } catch (err) {
    console.error("❌ DB connection FAILED:", err.message);
  }
})();

module.exports = pool;
