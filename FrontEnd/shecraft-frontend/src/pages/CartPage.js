import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, total } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/final-step", { state: { cartItems, total } }); // Pass cart to FinalStep
  };

  const handleRemove = async (accessoryID) => {
    try {
      setRemovingId(accessoryID);
      const API_BASE = "http://localhost:5000";

      const res = await fetch(`${API_BASE}/api/accessory-instance/${accessoryID}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || `Cancel failed`);

      removeFromCart(accessoryID);
    } catch (e) {
      console.error(e);
      alert("Failed to remove item (cancel reservation).");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-not-logged">
          <h2>Your cart is empty.</h2>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.accessoryID} className="cart-card no-image">
                <div className="cart-info">
                  <h3>{item.type || "Accessory"} — {item.accessoryID}</h3>
                  <p>Metal: {item.metal || "—"}</p>
                  <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
                  {item.summary?.charms?.length && (
                    <p>
                      Charms: {item.summary.charms.map(c => `${c.charmID}x${c.quantity ?? 1}`).join(", ")}
                    </p>
                  )}
                  <p>Qty: {item.qty || 1}</p>

                  <button
                    className="complete-btn"
                    onClick={() => handleRemove(item.accessoryID)}
                    disabled={removingId === item.accessoryID}
                  >
                    {removingId === item.accessoryID ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <h2>Total: ${total.toFixed(2)}</h2>
            <button className="complete-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
