// src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Helper: create JWT
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

// ---------- LOGIN (same as before) ----------
async function login(req, res) {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res
        .status(400)
        .json({ message: "role, email and password are required" });
    }

    if (!["customer", "designer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const table = role === "customer" ? "CUSTOMER" : "DESIGNER";
    const idField = role === "customer" ? "customerID" : "designerID";

    const [rows] = await pool.query(
      `SELECT ${idField} AS id, email, passwordHash FROM ${table} WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.passwordHash || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user.id, role });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Login failed" });
  }
}

// ---------- CUSTOMER SIGNUP ----------
async function signupCustomer(req, res) {
  try {
    const {
      customerID,
      firstName,
      lastName,
      countryCode,
      phoneNb,
      email,
      cardNb,
      password,
    } = req.body;

    if (!customerID || !email || !password) {
      return res
        .status(400)
        .json({ message: "customerID, email and password are required" });
    }

    // Optional basic checks
    if (countryCode && !/^\+[0-9]{1,3}$/.test(countryCode)) {
      return res.status(400).json({ message: "Invalid countryCode format" });
    }

    if (phoneNb && !/^[0-9]{8}$/.test(phoneNb)) {
      return res.status(400).json({ message: "Invalid phoneNb format" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO CUSTOMER
        (customerID, firstName, lastName, countryCode, phoneNb, email, cardNb, passwordHash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerID,
        firstName || null,
        lastName || null,
        countryCode || null,
        phoneNb || null,
        email,
        cardNb || null,
        passwordHash,
      ]
    );

    // Auto-login after signup (optional but nice)
    const token = generateToken({ id: customerID, role: "customer" });

    res.status(201).json({
      message: "Customer registered successfully",
      token,
      user: {
        id: customerID,
        email,
        role: "customer",
      },
    });
  } catch (err) {
    console.error("Error in signupCustomer:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Customer with this email or ID already exists" });
    }

    res.status(500).json({ message: "Customer registration failed" });
  }
}

// ---------- DESIGNER SIGNUP ----------
async function signupDesigner(req, res) {
  try {
    const {
      designerID,
      name,
      branch,
      email,
      countryCode,
      phoneNb,
      supplierID,
      password,
    } = req.body;

    if (!designerID || !name || !branch || !email || !supplierID || !password) {
      return res.status(400).json({
        message:
          "designerID, name, branch, email, supplierID and password are required",
      });
    }

    if (countryCode && !/^\+[0-9]{1,3}$/.test(countryCode)) {
      return res.status(400).json({ message: "Invalid countryCode format" });
    }

    if (phoneNb && !/^[0-9]{8}$/.test(phoneNb)) {
      return res.status(400).json({ message: "Invalid phoneNb format" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO DESIGNER
        (designerID, name, branch, email, countryCode, phoneNb, supplierID, passwordHash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        designerID,
        name,
        branch,
        email,
        countryID || countryCode || null, // if you decide to use 'countryCode' only, remove countryID
        phoneNb || null,
        supplierID,
        passwordHash,
      ]
    );

    const token = generateToken({ id: designerID, role: "designer" });

    res.status(201).json({
      message: "Designer registered successfully",
      token,
      user: {
        id: designerID,
        email,
        role: "designer",
      },
    });
  } catch (err) {
    console.error("Error in signupDesigner:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Designer with this email or ID already exists" });
    }

    res.status(500).json({ message: "Designer registration failed" });
  }
}

module.exports = {
  login,
  signupCustomer,
  signupDesigner,
};
