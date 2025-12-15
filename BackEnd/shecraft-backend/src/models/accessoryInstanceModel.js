// src/models/accessoryInstanceModel.js
const pool = require("../config/db");

// --- helpers: ID generators (A001, R001, N001, B001, E001) ---
async function nextId(conn, table, idCol, prefix, pad = 3) {
  const [rows] = await conn.query(
    `SELECT ${idCol} AS id FROM ${table} WHERE ${idCol} LIKE ? ORDER BY ${idCol} DESC LIMIT 1`,
    [`${prefix}%`]
  );

  const last = rows.length ? rows[0].id : null;
  const lastNum = last ? parseInt(String(last).slice(prefix.length), 10) : 0;
  const nextNum = lastNum + 1;

  return `${prefix}${String(nextNum).padStart(pad, "0")}`;
}

function badRequest(msg) {
  const e = new Error(msg);
  e.status = 400;
  return e;
}

async function reserveAndDecrementCharms(conn, charms) {
  if (!Array.isArray(charms) || charms.length === 0) return;

  const req = new Map();
  for (const it of charms) {
    if (!it?.charmID) continue;
    const q = it.quantity == null ? 1 : Number(it.quantity);
    req.set(it.charmID, (req.get(it.charmID) || 0) + q);
  }
  const ids = [...req.keys()];
  if (ids.length === 0) return;

  const placeholders = ids.map(() => "?").join(",");

  // lock rows
  const [rows] = await conn.query(
    `SELECT charmID, qty FROM charm WHERE charmID IN (${placeholders}) FOR UPDATE`,
    ids
  );
  if (rows.length !== ids.length) throw badRequest("One or more charmIDs do not exist");

  const stock = new Map(rows.map(r => [r.charmID, Number(r.qty)]));
  for (const [id, needed] of req.entries()) {
    const available = stock.get(id) ?? 0;
    if (available < needed) throw badRequest(`Charm ${id} out of stock (need ${needed}, have ${available})`);
  }

  for (const [id, needed] of req.entries()) {
    await conn.query(`UPDATE charm SET qty = qty - ? WHERE charmID = ?`, [needed, id]);
  }
}

async function reserveAndDecrementStones(conn, stones) {
  if (!Array.isArray(stones) || stones.length === 0) return;

  const req = new Map();
  for (const it of stones) {
    if (!it?.stoneID) continue;
    const q = it.quantity == null ? 1 : Number(it.quantity);
    req.set(it.stoneID, (req.get(it.stoneID) || 0) + q);
  }
  const ids = [...req.keys()];
  if (ids.length === 0) return;

  const placeholders = ids.map(() => "?").join(",");

  const [rows] = await conn.query(
    `SELECT stoneID, qty FROM stone WHERE stoneID IN (${placeholders}) FOR UPDATE`,
    ids
  );
  if (rows.length !== ids.length) throw badRequest("One or more stoneIDs do not exist");

  const stock = new Map(rows.map(r => [r.stoneID, Number(r.qty)]));
  for (const [id, needed] of req.entries()) {
    const available = stock.get(id) ?? 0;
    if (available < needed) throw badRequest(`Stone ${id} out of stock (need ${needed}, have ${available})`);
  }

  for (const [id, needed] of req.entries()) {
    await conn.query(`UPDATE stone SET qty = qty - ? WHERE stoneID = ?`, [needed, id]);
  }
}


// --- pricing: material + charms + stones ---
async function computeAccessoryPrice(conn, accessoryID) {
  const [[row]] = await conn.query(
    `
    SELECT
      a.accessoryID,
      COALESCE(m.price, 0)
      + COALESCE(ch.charmsTotal, 0)
      + COALESCE(st.stonesTotal, 0) AS totalPrice
    FROM accessory a
    JOIN material m ON m.materialID = a.materialID

    LEFT JOIN (
      SELECT o.accessoryID, SUM(o.quantity * c.price) AS charmsTotal
      FROM ornaments o
      JOIN charm c ON c.charmID = o.charmID
      WHERE o.accessoryID = ?
      GROUP BY o.accessoryID
    ) ch ON ch.accessoryID = a.accessoryID

    LEFT JOIN (
      SELECT g.accessoryID, SUM(g.quantity * s.price) AS stonesTotal
      FROM gems g
      JOIN stone s ON s.stoneID = g.stoneID
      WHERE g.accessoryID = ?
      GROUP BY g.accessoryID
    ) st ON st.accessoryID = a.accessoryID

    WHERE a.accessoryID = ?
    `,
    [accessoryID, accessoryID, accessoryID]
  );

  if (!row) throw new Error(`Accessory not found for pricing: ${accessoryID}`);
  return Number(row.totalPrice);
}

async function upsertOrnaments(conn, accessoryID, charms) {
  if (!Array.isArray(charms) || charms.length === 0) return;

  // enforce uniqueness by charmID; sum quantities
  const map = new Map();
  for (const it of charms) {
    if (!it?.charmID) continue;
    const q = it.quantity == null ? 1 : Number(it.quantity);
    map.set(it.charmID, (map.get(it.charmID) || 0) + q);
  }

  const rows = [...map.entries()].map(([charmID, quantity]) => [
    accessoryID,
    charmID,
    Math.max(1, Math.trunc(quantity)),
  ]);

  // assumes ornaments has columns: accessoryID, charmID, quantity and PK(accessoryID,charmID)
  await conn.query(
    `
    INSERT INTO ornaments (accessoryID, charmID, quantity)
    VALUES ?
    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
    `,
    [rows]
  );
}

async function upsertGems(conn, accessoryID, stones) {
  if (!Array.isArray(stones) || stones.length === 0) return;

  const map = new Map();
  for (const it of stones) {
    if (!it?.stoneID) continue;
    const q = it.quantity == null ? 1 : Number(it.quantity);
    map.set(it.stoneID, (map.get(it.stoneID) || 0) + q);
  }

  const rows = [...map.entries()].map(([stoneID, quantity]) => [
    accessoryID,
    stoneID,
    Math.max(1, Math.trunc(quantity)),
  ]);

  // assumes gems has columns: accessoryID, stoneID, quantity and PK(accessoryID,stoneID)
  await conn.query(
    `
    INSERT INTO gems (accessoryID, stoneID, quantity)
    VALUES ?
    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
    `,
    [rows]
  );
}

// --- main transactional creator ---
async function createAccessoryInstance({
  type, // "ring" | "necklace" | "bracelet" | "earring"
  materialID,
  nbOfCharms = 0,
  nbOfStones = 0,
  product, // type-specific fields
  charms = [],
  stones = [],
}) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) create accessoryID
    const accessoryID = await nextId(conn, "accessory", "accessoryID", "X", 3);


    // 2) insert accessory (price starts at 0; will be computed)
    await conn.query(
      `
      INSERT INTO accessory (accessoryID, price, materialID, status)
VALUES (?, ?, ?, 'reserved')
      `,
      [accessoryID, 0, materialID]
    );

    // 3) insert child row based on type
    if (type === "ring") {
      const ringID = await nextId(conn, "ring", "ringID", "R", 3);
      const { bandType, diameter } = product || {};
      await conn.query(
        `INSERT INTO ring (ringID, bandType, diameter, accessoryID) VALUES (?, ?, ?, ?)`,
        [ringID, bandType, diameter, accessoryID]
      );
    } else if (type === "necklace") {
      const necklaceID = await nextId(conn, "necklace", "necklaceID", "N", 3);
      const { chain, style, length } = product || {};
      await conn.query(
        `INSERT INTO necklace (necklaceID, chain, style, length, accessoryID) VALUES (?, ?, ?, ?, ?)`,
        [necklaceID, chain, style, length, accessoryID]
      );
    } else if (type === "bracelet") {
      const braceletID = await nextId(conn, "bracelet", "braceletID", "B", 3);
      const { chain, style, length } = product || {};
      await conn.query(
        `INSERT INTO bracelet (braceletID, chain, style, length, accessoryID) VALUES (?, ?, ?, ?, ?)`,
        [braceletID, chain, style, length, accessoryID]
      );
    } else if (type === "earring") {
      const earringID = await nextId(conn, "earring", "earringID", "E", 3);
      const { backing, style, size } = product || {};
      await conn.query(
        `INSERT INTO earring (earringID, backing, style, size, accessoryID) VALUES (?, ?, ?, ?, ?)`,
        [earringID, backing, style, size, accessoryID]
      );
    } else {
      throw new Error(`Unsupported type: ${type}`);
    }

    // 4) insert ornaments/gems
    await reserveAndDecrementCharms(conn, charms);
    await reserveAndDecrementStones(conn, stones);

    await upsertOrnaments(conn, accessoryID, charms);
    await upsertGems(conn, accessoryID, stones);

    // 5) compute price and update accessory
    const computedPrice = await computeAccessoryPrice(conn, accessoryID);
    await conn.query(`UPDATE accessory SET price = ? WHERE accessoryID = ?`, [
      computedPrice,
      accessoryID,
    ]);

    await conn.commit();
    return { accessoryID, computedPrice };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function cancelAccessoryReservation(accessoryID) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Lock accessory row (prevents double cancel / races)
    const [[acc]] = await conn.query(
      `SELECT accessoryID, status FROM accessory WHERE accessoryID = ? FOR UPDATE`,
      [accessoryID]
    );

    if (!acc) {
      const e = new Error("Accessory not found");
      e.status = 404;
      throw e;
    }

    if (acc.status === "cancelled") {
      const e = new Error("Accessory already cancelled");
      e.status = 409;
      throw e;
    }

    if (acc.status === "ordered") {
      const e = new Error("Cannot cancel: accessory already ordered");
      e.status = 409;
      throw e;
    }

    // Release charms back based on ORNAMENTS
    const [chRows] = await conn.query(
      `SELECT charmID, quantity FROM ornaments WHERE accessoryID = ?`,
      [accessoryID]
    );

    for (const r of chRows) {
      await conn.query(
        `UPDATE charm SET qty = qty + ? WHERE charmID = ?`,
        [Number(r.quantity), r.charmID]
      );
    }

    // Release stones back based on GEMS
    const [stRows] = await conn.query(
      `SELECT stoneID, quantity FROM gems WHERE accessoryID = ?`,
      [accessoryID]
    );

    for (const r of stRows) {
      await conn.query(
        `UPDATE stone SET qty = qty + ? WHERE stoneID = ?`,
        [Number(r.quantity), r.stoneID]
      );
    }

    // Mark cancelled (prevents future releases)
    await conn.query(
      `UPDATE accessory SET status = 'cancelled' WHERE accessoryID = ?`,
      [accessoryID]
    );

    await conn.commit();
    return {
      accessoryID,
      releasedCharms: chRows.length,
      releasedStones: stRows.length,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}


module.exports = {
  createAccessoryInstance,
  cancelAccessoryReservation,
};

