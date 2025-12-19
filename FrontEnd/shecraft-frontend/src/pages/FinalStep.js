import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/finalstep.css";

export default function FinalStep() {
  const location = useLocation();
  const { cartItems: cartFromCartPage = [], total: totalFromCart = 0 } = location.state || {};

  const [cartItems, setCartItems] = useState(cartFromCartPage);
  const [total, setTotal] = useState(totalFromCart);

  const [customer, setCustomer] = useState({});
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [pickup, setPickup] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const API_BASE = "http://localhost:5000"; // your backend

  // Fetch customer info
  useEffect(() => {
    fetch(`${API_BASE}/api/customers/account`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setCustomer(data))
      .catch(err => console.error("Failed to fetch customer:", err));
  }, []);

  // Fetch all designers
  useEffect(() => {
    fetch(`${API_BASE}/api/designers`)
      .then(res => res.json())
      .then(data => setDesigners(Array.isArray(data) ? data : data.designers || []))
      .catch(err => console.error("Failed to fetch designers:", err));
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedDesigner) return alert("Please select a designer");
    if (cartItems.length === 0) return alert("Cart is empty");

    let address = "";
    if (pickup) {
      const designer = designers.find(d => d.designerID === selectedDesigner);
      address = designer?.branch || "Unknown Branch";
    } else {
      address = customer.branch || "Customer Location";
    }

    if (paymentType === "card") {
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
        return alert("Please fill all card information");
      }
    }

    const orderData = {
      customerID: customer.customerID,
      designerID: selectedDesigner,
      isPickup: pickup,
      price: total,
      orderDate: new Date().toISOString().split("T")[0],
      completionDate: null,
      address,
      paymentType,
      status: "pending",
      qty: cartItems.reduce((sum, item) => sum + (item.qty || 1), 0),
      items: cartItems.map(i => ({
        accessoryID: i.accessoryID,
        type: i.type,
        metal: i.metal,
        price: i.price,
        qty: i.qty || 1,
        charms: i.summary?.charms || [],
      })),
      cardInfo: paymentType === "card" ? cardInfo : null,
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      alert(`Order placed! Status: ${data.status}`);
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="final-step">
      <h2>Final Step - Review & Place Order</h2>

      {/* Customer Info */}
      <section>
        <h3>Customer Info</h3>
        <p>Name: {customer.name || "Loading..."}</p>
        <p>Email: {customer.email || "Loading..."}</p>
        <p>Branch: {customer.branch || "Loading..."}</p>
      </section>

      {/* Cart Items */}
      <section>
        <h3>Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.accessoryID} className="cart-card no-image">
              <div className="cart-info">
                <h4>{item.type || "Accessory"} — {item.accessoryID}</h4>
                <p>Metal: {item.metal || "—"}</p>
                <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
                {item.summary?.charms?.length > 0 && (
                  <p>Charms: {item.summary.charms.map(c => `${c.charmID}x${c.quantity ?? 1}`).join(", ")}</p>
                )}
                <p>Qty: {item.qty || 1}</p>
              </div>
            </div>
          ))
        )}
        <h4>Total: ${total.toFixed(2)}</h4>
      </section>

      {/* Designer Selection */}
      <section>
        <h3>Select Designer</h3>
        <select value={selectedDesigner} onChange={e => setSelectedDesigner(e.target.value)}>
          <option value="">-- Choose a designer --</option>
          {designers.map(d => (
            <option key={d.designerID} value={d.designerID}>
              {d.name} - {d.email} - {d.branch}
            </option>
          ))}
        </select>
      </section>

      {/* Pickup Option */}
      <section>
        <h3>Pickup Option</h3>
        <label>
          <input type="checkbox" checked={pickup} onChange={e => setPickup(e.target.checked)} />
          Pickup instead of delivery
        </label>
      </section>

      {/* Payment Type */}
      <section>
        <h3>Payment Type</h3>
        <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="online">Online</option>
        </select>
      </section>

      {/* Card Info if card payment */}
      {paymentType === "card" && (
        <section>
          <h3>Card Information</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardInfo.number}
            onChange={e => setCardInfo({...cardInfo, number: e.target.value})}
          />
          <input
            type="text"
            placeholder="Name on Card"
            value={cardInfo.name}
            onChange={e => setCardInfo({...cardInfo, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Expiry MM/YY"
            value={cardInfo.expiry}
            onChange={e => setCardInfo({...cardInfo, expiry: e.target.value})}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardInfo.cvv}
            onChange={e => setCardInfo({...cardInfo, cvv: e.target.value})}
          />
        </section>
      )}

      <button className="complete-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}
