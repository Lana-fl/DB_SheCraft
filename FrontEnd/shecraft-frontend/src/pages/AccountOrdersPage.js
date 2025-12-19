import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const TOKEN_KEY = "authToken";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getCustomerIDFromToken(token) {
  const p = parseJwt(token);
  if (!p) return null;

  // common payload keys (adjust if yours differs)
  return (
    p.customerID ||
    p.customerId ||
    p.customer_id ||
    p.customer ||
    p.id || // sometimes stores customer id here
    p.userID ||
    p.userId ||
    p.sub ||
    null
  );
}

function inferStatus(o) {
  return o?.completionDate ? "completed" : "pending";
}

export default function AccountOrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          setOrders([]);
          return;
        }

        const customerID = getCustomerIDFromToken(token);

        if (!customerID) {
          // This means your JWT does NOT contain customerID (or you're logged in as designer)
          throw new Error(
            "Could not read customerID from token. You may be logged in as designer, or the token payload doesn't include customerID."
          );
        }

        const data = await api.getOrdersByCustomer(customerID);
        const normalized = (Array.isArray(data) ? data : []).map((o) => ({
          ...o,
          _status: inferStatus(o),
        }));

        setOrders(normalized);
      } catch (err) {
        console.error("Orders load error:", err);
        setError(err.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  const counts = useMemo(() => {
    const pending = orders.filter((o) => o._status === "pending").length;
    const completed = orders.filter((o) => o._status === "completed").length;
    return { all: orders.length, pending, completed };
  }, [orders]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return orders
      .filter((o) => {
        if (tab === "pending") return o._status === "pending";
        if (tab === "completed") return o._status === "completed";
        return true;
      })
      .filter((o) => {
        if (!term) return true;
        const hay = [
          o.orderID,
          o.address,
          o.paymentType,
          o.orderDate,
          o.completionDate,
          o._status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(term);
      });
  }, [orders, tab, q]);

  if (!token) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Please log in to view your orders</h2>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/")}>Back Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>My Orders</h1>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={() => setTab("all")}>All ({counts.all})</button>
        <button onClick={() => setTab("pending")}>Pending ({counts.pending})</button>
        <button onClick={() => setTab("completed")}>Completed ({counts.completed})</button>
      </div>

      <input
        style={{ marginTop: 12, padding: 8, width: 360, maxWidth: "100%" }}
        placeholder="Search orderID, address, payment..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
      {!loading && error && <p style={{ marginTop: 12, color: "red" }}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p style={{ marginTop: 12 }}>No orders found.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {filtered.map((o) => (
            <div
              key={o.orderID}
              style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{o.orderID}</strong>
                <span>{o._status === "pending" ? "Pending" : "Completed"}</span>
              </div>

              <div style={{ marginTop: 8 }}>
                <div>Order Date: {o.orderDate || "-"}</div>
                <div>Completion: {o.completionDate || "-"}</div>
                <div>Qty: {o.qty ?? "-"}</div>
                <div>Total: {o.price ?? "-"}</div>
                <div>Payment: {o.paymentType || "-"}</div>
                <div>Address: {o.address || "-"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
