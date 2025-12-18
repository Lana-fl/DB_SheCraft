const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// ===================== HELPER: SEQUENTIAL ID =====================
async function getNextSequentialId(connection, tableName, idColumn, prefix) {
  const [rows] = await connection.query(
    `
    SELECT ${idColumn} AS maxId
    FROM ${tableName}
    WHERE ${idColumn} LIKE ?
    ORDER BY CAST(SUBSTRING(${idColumn}, 2) AS UNSIGNED) DESC
    LIMIT 1
    `,
    [`${prefix}%`]
  );

  if (!rows.length || !rows[0].maxId) {
    return `${prefix}001`;
  }

  const lastId = rows[0].maxId;
  const numberPart = parseInt(lastId.substring(1), 10) + 1;
  return `${prefix}${String(numberPart).padStart(3, "0")}`;
}

// ===================== HELPER: JWT =====================
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

// ===================== LOGIN =====================
async function login(req, res) {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({
        message: "role, email and password are required",
      });
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

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);

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

// ===================== CUSTOMER SIGNUP =====================
async function signupCustomer(req, res) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      name,
      countryCode,
      phoneNb,
      email,
      cardNb,
      password,
    } = req.body;

    if (!email || !password || !name) {
      await connection.rollback();
      return res.status(400).json({
        message: "name, email and password are required",
      });
    }

    // split name → firstName / lastName
    const parts = name.trim().split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || null;

    if (phoneNb && !/^[0-9]{8}$/.test(phoneNb)) {
      await connection.rollback();
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    const customerID = await getNextSequentialId(
      connection,
      "CUSTOMER",
      "customerID",
      "C"
    );

    const passwordHash = await bcrypt.hash(password, 10);
    const cardHash = cardNb ? await bcrypt.hash(cardNb, 10) : null;

    await connection.query(
      `
      INSERT INTO CUSTOMER
        (customerID, firstName, lastName, countryCode, phoneNb, email, cardNb, passwordHash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customerID,
        firstName,
        lastName,
        countryCode || null,
        phoneNb || null,
        email,
        cardHash,
        passwordHash,
      ]
    );

    await connection.commit();

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
    await connection.rollback();
    console.error("Error in signupCustomer:", err);
    res.status(500).json({ message: "Customer registration failed" });
  } finally {
    connection.release();
  }
}

// ===================== DESIGNER SIGNUP =====================
async function signupDesigner(req, res) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { name, branch, email, countryCode, phoneNb, password } = req.body;

    if (!name || !branch || !email || !password) {
      await connection.rollback();
      return res.status(400).json({
        message: "name, branch, email and password are required",
      });
    }

    if (phoneNb && !/^[0-9]{8}$/.test(phoneNb)) {
      await connection.rollback();
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    const designerID = await getNextSequentialId(
      connection,
      "DESIGNER",
      "designerID",
      "D"
    );

    const passwordHash = await bcrypt.hash(password, 10);

    await connection.query(
      `
      INSERT INTO DESIGNER
        (designerID, name, branch, email, countryCode, phoneNb, passwordHash)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        designerID,
        name,
        branch,
        email,
        countryCode || null,
        phoneNb || null,
        passwordHash,
      ]
    );

    await connection.commit();

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
    await connection.rollback();
    console.error("Error in signupDesigner:", err);
    res.status(500).json({ message: "Designer registration failed" });
  } finally {
    connection.release();
  }
}

// ===================== CHANGE PASSWORD =====================
async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id, role } = req.user;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Missing passwords" });
    }

    const table = role === "customer" ? "CUSTOMER" : "DESIGNER";
    const idField = role === "customer" ? "customerID" : "designerID";

    const [rows] = await pool.query(
      `SELECT passwordHash FROM ${table} WHERE ${idField} = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(oldPassword, rows[0].passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE ${table} SET passwordHash = ? WHERE ${idField} = ?`,
      [newHash, id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Failed to update password" });
  }
}

// ===================== EXPORTS =====================
module.exports = {
  login,
  signupCustomer,
  signupDesigner,
  changePassword,
};
