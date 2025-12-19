import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { api } from "../api/client";


function toStatus(order) {
  // if backend already sends status, use it
  if (order?.status) return String(order.status).toLowerCase();
  // otherwise infer from completionDate
  return order?.completionDate ? "completed" : "pending";
}

export default function AccountOrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all"); // all | pending | completed
  const [q, setQ] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        let data = [];
        if (user?.role === "customer") {
          // IMPORTANT: make sure your auth user object contains customerID
          data = await api.getOrdersByCustomer(user.customerID);
        } else if (user?.role === "designer") {
          data = await api.getAllOrders();
        }

        const normalized = (Array.isArray(data) ? data : []).map((o) => ({
          ...o,
          _status: toStatus(o),
        }));

        setOrders(normalized);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    if (user) load();
  }, [user]);

  const counts = useMemo(() => {
    const pending = orders.filter((o) => o._status === "pending").length;
    const completed = orders.filter((o) => o._status === "completed").length;
    return { all: orders.length, pending, completed };
  }, [orders]);

  const filtered = useMemo(() => {
    const normQ = q.trim().toLowerCase();

    return orders
      .filter((o) => {
        if (tab === "pending") return o._status === "pending";
        if (tab === "completed") return o._status === "completed";
        return true;
      })
      .filter((o) => {
        if (!normQ) return true;
        const hay = [
          o.orderID,
          o.customerID,
          o.designerID,
          o.address,
          o.paymentType,
          o.orderDate,
          o.completionDate,
          o._status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(normQ);
      });
  }, [orders, tab, q]);

  if (!user) {
    return (
      <div className="orders-container">
        <div className="orders-card">
          <h2 className="orders-title">Please log in</h2>
          <button className="orders-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-banner">
        <h1 className="orders-banner-title">Orders</h1>
        <p className="orders-banner-subtitle">
          {user.role === "designer"
            ? "All customer orders"
            : "Track your pending & completed orders"}
        </p>
      </div>

      <div className="orders-card">
        <div className="orders-topbar">
          <button className="orders-btn subtle" onClick={() => navigate("/account")}>
            ← Back to Account
          </button>

          <input
            className="orders-search"
            placeholder="Search orderID, address, payment..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="orders-tabs">
          <button
            className={`orders-tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All ({counts.all})
          </button>
          <button
            className={`orders-tab ${tab === "pending" ? "active" : ""}`}
            onClick={() => setTab("pending")}
          >
            Pending ({counts.pending})
          </button>
          <button
            className={`orders-tab ${tab === "completed" ? "active" : ""}`}
            onClick={() => setTab("completed")}
          >
            Completed ({counts.completed})
          </button>
        </div>

        {loading ? (
          <p style={{ color: "#e4c67b", marginTop: 12 }}>Loading orders...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#e4c67b", marginTop: 12 }}>No orders found.</p>
        ) : (
          <div className="orders-list">
            {filtered.map((o) => (
              <div key={o.orderID} className="order-item">
                <div className="order-row">
                  <div className="order-id">{o.orderID}</div>
                  <span className={`order-badge ${o._status}`}>
                    {o._status === "pending" ? "Pending" : "Completed"}
                  </span>
                </div>

                <div className="order-grid">
                  <div className="order-field">
                    <span className="label">Order Date</span>
                    <span className="value">{o.orderDate || "-"}</span>
                  </div>
                  <div className="order-field">
                    <span className="label">Completion Date</span>
                    <span className="value">{o.completionDate || "-"}</span>
                  </div>
                  <div className="order-field">
                    <span className="label">Qty</span>
                    <span className="value">{o.qty ?? "-"}</span>
                  </div>
                  <div className="order-field">
                    <span className="label">Total</span>
                    <span className="value">{o.price ?? "-"}</span>
                  </div>
                  <div className="order-field">
                    <span className="label">Payment</span>
                    <span className="value">{o.paymentType || "-"}</span>
                  </div>
                  <div className="order-field">
                    <span className="label">Address</span>
                    <span className="value">{o.address || "-"}</span>
                  </div>

                  {user.role === "designer" && (
                    <>
                      <div className="order-field">
                        <span className="label">Customer ID</span>
                        <span className="value">{o.customerID || "-"}</span>
                      </div>
                      <div className="order-field">
                        <span className="label">Designer ID</span>
                        <span className="value">{o.designerID || "-"}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
