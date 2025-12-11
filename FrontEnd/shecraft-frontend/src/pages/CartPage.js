import React, { useState } from "react";
import "../styles/cart.css";

export default function CartPage({ isLoggedIn, userRole }) {
  const [orders, setOrders] = useState([
    { id: 1, product: "Custom Necklace", customer: "Sarah M.", status: "In Progress" },
    { id: 2, product: "Birthstone Ring", customer: "Daniel R.", status: "Pending" },
  ]);

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  // -------- NOT LOGGED IN --------
  if (!isLoggedIn) {
    return (
      <div className="cart-not-logged">
        <h2>Please login to view your orders.</h2>
      </div>
    );
  }

  // -------- CUSTOMER VIEW --------
  if (userRole === "customer") {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Orders</h1>

        <div className="cart-items">
          {orders.map((item) => (
            <div key={item.id} className="cart-card no-image">
              <div className="cart-info">
                <h3>{item.product}</h3>
                <p>
                  Status:{" "}
                  <span
                    className={
                      "status " +
                      item.status
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                    }
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------- DESIGNER DASHBOARD --------
  return (
    <div className="designer-page">
      <h1 className="cart-title">Designer Dashboard</h1>
      <p className="designer-sub">Orders assigned to you</p>

      <div className="cart-items">
        {orders.map((item) => (
          <div key={item.id} className="cart-card designer-mode no-image">
            <div className="cart-info">
              <h3>{item.product}</h3>
              <p>Customer: {item.customer}</p>

              <p>
                Status:{" "}
                <span
                  className={
                    "status " +
                    item.status
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  }
                >
                  {item.status}
                </span>
              </p>

              <button
                className="complete-btn"
                onClick={() => handleComplete(item.id)}
                disabled={item.status === "Completed"}
              >
                {item.status === "Completed" ? "Order Completed" : "Mark as Complete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
