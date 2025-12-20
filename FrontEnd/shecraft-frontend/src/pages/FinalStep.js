
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/finalstep.css";
import { api } from "../api/client";

export default function FinalStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();


  const { cartItems: cartFromCartPage = [] } = location.state || {};
  const [cartItems] = useState(cartFromCartPage);

  const [customer, setCustomer] = useState(null);
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [pickup, setPickup] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(true);

  const isValidAccessoryID = (id) => /^[XRNBE]\d{3,}$/i.test(String(id || "").trim());


  const normalizeCustomer = (data) => {
    const base = Array.isArray(data) ? data[0] : data;
    return base?.customer || base?.user || base || null;
  };

  useEffect(() => {
    async function loadCustomer() {
      if (!user) return;
      try {
        const data = await api.getMyCustomerAccount();
        const normalized = normalizeCustomer(data);

        setCustomer(normalized);

        const addr =
          normalized?.address ||
          normalized?.adress ||
          normalized?.location ||
          "";

        setDeliveryAddress(addr);
      } catch (err) {
        console.error("Failed to load customer:", err);
        alert("Failed to load customer info: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [user]);

  useEffect(() => {
    async function loadDesigners() {
      try {
        const data = await api.getDesigners();
        setDesigners(Array.isArray(data) ? data : data?.designers || []);
      } catch (err) {
        console.error("Failed to load designers:", err);
        alert("Failed to load designers: " + err.message);
      }
    }
    loadDesigners();
  }, []);

  const handlePlaceOrder = async () => {
    if (!customer) return alert("Customer info not loaded!");
    if (!selectedDesigner) return alert("Please select a designer");
    if (!cartItems.length) return alert("Cart is empty");

    const validItems = cartItems
      .map((x) => x?.accessoryID)
      .filter((id) => isValidAccessoryID(id));

    if (!validItems.length) {
      console.log("INVALID CART =>", cartItems);
      return alert("No valid items to order. Remove invalid items and re-add.");
    }


    const customerID =
      customer?.customerID ||
      customer?.id ||
      customer?.customerId ||
      user?.customerID ||
      user?.customerId ||
      user?.id ||
      user?.user?.customerID ||
      user?.user?.customerId ||
      user?.user?.id;

    if (!customerID) {
      console.log("CUSTOMER =>", customer);
      console.log("AUTH USER =>", user);
      return alert("customerID missing. Check console logs.");
    }

    const designer = designers.find((d) => d.designerID === selectedDesigner);
    if (!designer) return alert("Selected designer not found");

    const addressToUse = pickup
      ? designer.branch || "Designer Branch"
      : deliveryAddress ||
        customer?.address ||
        customer?.adress ||
        customer?.location ||
        "Customer Address";

    const orderPayload = {
      orderID: `O${String(Math.floor(Math.random()*900)+100)}`,
      designerID: selectedDesigner,
      customerID,
      orderDate: new Date().toISOString().slice(0, 10),
      isPickup: pickup ? 1 : 0,
      address: addressToUse,
      paymentType,
      items: validItems,
    };

    console.log("ORDER PAYLOAD (final) =>", orderPayload);

    try {
      await api.createOrder(orderPayload);
      clearCart();
      navigate("/", { state: { message: "Order placed successfully! ✅" } });
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order: " + err.message);
    }
  };

  if (!user) return <p>Please login to place an order.</p>;
  if (loading) return <p>Loading customer info...</p>;
  if (!customer) return <p>No customer info found.</p>;

  const firstName = customer?.firstName || customer?.firstname || "";
  const lastName = customer?.lastName || customer?.lastname || "";
  const fullName =
    (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : (customer?.name || "-");

  const email = customer?.email || customer?.userEmail || "-";
  const address =
    customer?.address || customer?.adress || customer?.location || "-";

  return (
    <div className="final-step">
      <h2>Final Step – Review & Place Order</h2>

      <section>
        <h3>Customer Info</h3>
        <p>Name: {fullName}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
      </section>

      <section>
        <h3>Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={item.accessoryID || idx} className="cart-card no-image">
              <div className="cart-info">
                <h4>
                  {item.type || "Accessory"} —{" "}
                  {isValidAccessoryID(item.accessoryID) ? item.accessoryID : "❌ INVALID"}
                </h4>
                <p>Metal: {item.metal || "—"}</p>
                <p>Qty: {item.qty || 1}</p>
              </div>
            </div>
          ))
        )}
      </section>

      <section>
        <h3>Select Designer</h3>
        <select value={selectedDesigner} onChange={(e) => setSelectedDesigner(e.target.value)}>
          <option value="">-- Choose a designer --</option>
          {designers.map((d) => (
            <option key={d.designerID} value={d.designerID}>
              {d.name} — {d.branch}
            </option>
          ))}
        </select>
      </section>

      <section>
        <label>
          <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} />
          Pickup from designer branch
        </label>

        {!pickup && (
          <div className="delivery-address">
            <h4>Delivery Address</h4>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
          </div>
        )}
      </section>

      <section>
        <h3>Payment Type</h3>
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="online">Online</option>
        </select>
      </section>

      <button className="complete-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

