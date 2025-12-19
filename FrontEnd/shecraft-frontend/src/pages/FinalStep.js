// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import "../styles/finalstep.css";

// // export default function FinalStep() {
// //   const location = useLocation();
// //   const { cartItems: cartFromCartPage = [], total: totalFromCart = 0 } = location.state || {};

// //   const [cartItems, setCartItems] = useState(cartFromCartPage);
// //   const [total, setTotal] = useState(totalFromCart);

// //   const [customer, setCustomer] = useState({});
// //   const [designers, setDesigners] = useState([]);
// //   const [selectedDesigner, setSelectedDesigner] = useState("");
// //   const [pickup, setPickup] = useState(false);
// //   const [paymentType, setPaymentType] = useState("cash");
// //   const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });

// //   const API_BASE = "http://localhost:5000"; // your backend

// //   // Fetch customer info
// //  useEffect(() => {
// //   fetch(`${API_BASE}/api/customers/account`, {
// //     credentials: "include",
// //   })
// //     .then(res => res.json())
// //     .then(data => {
// //       console.log("Customer response:", data);
// //       setCustomer(data); // ✅ FIX
// //     })
// //     .catch(err => console.error(err));
// // }, []);


// //   // Fetch all designers
// //   useEffect(() => {
// //     fetch(`${API_BASE}/api/designers`)
// //       .then(res => res.json())
// //       .then(data => setDesigners(Array.isArray(data) ? data : data.designers || []))
// //       .catch(err => console.error("Failed to fetch designers:", err));
// //   }, []);

// //   const handlePlaceOrder = async () => {
// //     if (!selectedDesigner) return alert("Please select a designer");
// //     if (cartItems.length === 0) return alert("Cart is empty");

// //     let address = "";
// //     if (pickup) {
// //       const designer = designers.find(d => d.designerID === selectedDesigner);
// //       address = designer?.branch || "Unknown Branch";
// //     } else {
// //       address = customer.branch || "Customer Location";
// //     }

// //     if (paymentType === "card") {
// //       if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
// //         return alert("Please fill all card information");
// //       }
// //     }

// //     const orderData = {
// //       customerID: customer.customerID,
// //       designerID: selectedDesigner,
// //       isPickup: pickup,
// //       price: total,
// //       orderDate: new Date().toISOString().split("T")[0],
// //       completionDate: null,
// //       address,
// //       paymentType,
// //       status: "pending",
// //       qty: cartItems.reduce((sum, item) => sum + (item.qty || 1), 0),
// //       items: cartItems.map(i => ({
// //         accessoryID: i.accessoryID,
// //         type: i.type,
// //         metal: i.metal,
// //         price: i.price,
// //         qty: i.qty || 1,
// //         charms: i.summary?.charms || [],
// //       })),
// //       cardInfo: paymentType === "card" ? cardInfo : null,
// //     };

// //     try {
// //       const res = await fetch(`${API_BASE}/api/orders`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify(orderData),
// //       });
// //       if (!res.ok) throw new Error("Failed to place order");
// //       const data = await res.json();
// //       alert(`Order placed! Status: ${data.status}`);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error placing order");
// //     }
// //   };

// //   return (
// //     <div className="final-step">
// //       <h2>Final Step - Review & Place Order</h2>

// //       {/* Customer Info */}
// //       <section>
// //         <h3>Customer Info</h3>
// //         <p>Name: {customer.name || "Loading..."}</p>
// //         <p>Email: {customer.email || "Loading..."}</p>
// //         <p>Branch: {customer.branch || "Loading..."}</p>
// //       </section>

// //       {/* Cart Items */}
// //       <section>
// //         <h3>Cart Items</h3>
// //         {cartItems.length === 0 ? (
// //           <p>Your cart is empty.</p>
// //         ) : (
// //           cartItems.map(item => (
// //             <div key={item.accessoryID} className="cart-card no-image">
// //               <div className="cart-info">
// //                 <h4>{item.type || "Accessory"} — {item.accessoryID}</h4>
// //                 <p>Metal: {item.metal || "—"}</p>
// //                 <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
// //                 {item.summary?.charms?.length > 0 && (
// //                   <p>Charms: {item.summary.charms.map(c => `${c.charmID}x${c.quantity ?? 1}`).join(", ")}</p>
// //                 )}
// //                 <p>Qty: {item.qty || 1}</p>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //         <h4>Total: ${total.toFixed(2)}</h4>
// //       </section>

// //       {/* Designer Selection */}
// //       <section>
// //         <h3>Select Designer</h3>
// //         <select value={selectedDesigner} onChange={e => setSelectedDesigner(e.target.value)}>
// //           <option value="">-- Choose a designer --</option>
// //           {designers.map(d => (
// //             <option key={d.designerID} value={d.designerID}>
// //               {d.name} - {d.email} - {d.branch}
// //             </option>
// //           ))}
// //         </select>
// //       </section>

// //       {/* Pickup Option */}
// //       <section>
// //         <h3>Pickup Option</h3>
// //         <label>
// //           <input type="checkbox" checked={pickup} onChange={e => setPickup(e.target.checked)} />
// //           Pickup instead of delivery
// //         </label>
// //       </section>

// //       {/* Payment Type */}
// //       <section>
// //         <h3>Payment Type</h3>
// //         <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
// //           <option value="cash">Cash</option>
// //           <option value="card">Card</option>
// //           <option value="online">Online</option>
// //         </select>
// //       </section>

// //       {/* Card Info if card payment */}
// //       {paymentType === "card" && (
// //         <section>
// //           <h3>Card Information</h3>
// //           <input
// //             type="text"
// //             placeholder="Card Number"
// //             value={cardInfo.number}
// //             onChange={e => setCardInfo({...cardInfo, number: e.target.value})}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Name on Card"
// //             value={cardInfo.name}
// //             onChange={e => setCardInfo({...cardInfo, name: e.target.value})}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Expiry MM/YY"
// //             value={cardInfo.expiry}
// //             onChange={e => setCardInfo({...cardInfo, expiry: e.target.value})}
// //           />
// //           <input
// //             type="text"
// //             placeholder="CVV"
// //             value={cardInfo.cvv}
// //             onChange={e => setCardInfo({...cardInfo, cvv: e.target.value})}
// //           />
// //         </section>
// //       )}

// //       <button className="complete-btn" onClick={handlePlaceOrder}>
// //         Place Order
// //       </button>
// //     </div>
// //   );
// // }


//working wihtout adress
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../context/AuthContext"; // <-- important
// import "../styles/finalstep.css";
// import { api } from "../api/client";

// export default function FinalStep() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // <-- get logged-in user

//   const { cartItems: cartFromCartPage = [], total: totalFromCart = 0 } = location.state || {};

//   const [cartItems, setCartItems] = useState(cartFromCartPage);
//   const [total, setTotal] = useState(totalFromCart);

//   const [customer, setCustomer] = useState(null);
//   const [designers, setDesigners] = useState([]);
//   const [selectedDesigner, setSelectedDesigner] = useState("");
//   const [pickup, setPickup] = useState(false);
//   const [paymentType, setPaymentType] = useState("cash");
//   const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });
//   const [loading, setLoading] = useState(true);

//   // ---------------- LOAD CUSTOMER INFO ----------------
// //   useEffect(() => {
// //     async function loadCustomer() {
// //       if (!user) return;
// //       try {
// //         let data = null;
// //         if (user.role === "customer") {
// //           data = await api.getMyCustomerAccount();
// //         } else {
// //           // If somehow a designer reaches this page, fallback
// //           data = await api.getMyCustomerAccount();
// //         }
// //         setCustomer(data);
// //       } catch (err) {
// //         console.error("Failed to load customer:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadCustomer();
// //   }, [user]);

// //   // ---------------- LOAD DESIGNERS ----------------
// //   useEffect(() => {
// //     async function fetchDesigners() {
// //       try {
// //         const data = await api.getDesigners();
// //         setDesigners(Array.isArray(data) ? data : data?.designers || []);
// //       } catch (err) {
// //         console.error("Failed to load designers:", err);
// //       }
// //     }
// //     fetchDesigners();
// //   }, []);
// useEffect(() => {
//   async function loadCustomer() {
//     if (!user) return;
//     try {
//       const data = await api.getMyCustomerAccount();
//       setCustomer(data);
//     } catch (err) {
//       console.error("Failed to load customer:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   loadCustomer();
// }, [user]);

// useEffect(() => {
//   async function fetchDesigners() {
//     try {
//       const data = await api.getDesigners();
//       setDesigners(Array.isArray(data) ? data : data?.designers || []);
//     } catch (err) {
//       console.error("Failed to load designers:", err);
//     }
//   }
//   fetchDesigners();
// }, []);

//   // ---------------- PLACE ORDER ----------------
//   const handlePlaceOrder = async () => {
//     if (!customer) return alert("Customer info not loaded!");
//     if (!selectedDesigner) return alert("Please select a designer");
//     if (cartItems.length === 0) return alert("Cart is empty");

//     if (paymentType === "card") {
//       if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
//         return alert("Please fill all card information");
//       }
//     }

//     const designer = designers.find(d => d.designerID === selectedDesigner);

//     const orderPayload = {
//       customerID: customer.customerID,
//       designerID: selectedDesigner,
//       isPickup: pickup,
//       address: pickup ? designer?.branch || "Designer Branch" : customer.address || "Customer Address",
//       paymentType,
//       price: total,
//       status: "pending",
//       qty: cartItems.reduce((sum, i) => sum + (i.qty || 1), 0),
//       items: cartItems.map(i => ({
//         accessoryID: i.accessoryID,
//         type: i.type,
//         metal: i.metal,
//         price: i.price,
//         qty: i.qty || 1,
//         charms: i.summary?.charms || [],
//       })),
//       cardInfo: paymentType === "card" ? cardInfo : null,
//     };

//     try {
//       await api.createOrder(orderPayload);
//       navigate("/", {
//         state: { message: "Order placed successfully! Check your account to track it." },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order");
//     }
//   };

//   if (!user) return <p>Please login to place an order.</p>;
//   if (loading) return <p>Loading customer info...</p>;
//   if (!customer) return <p>No customer info found.</p>;
//   const [deliveryAddress, setDeliveryAddress] = useState(customer?.address || "");

// // ---------------- UPDATE DELIVERY ADDRESS WHEN CUSTOMER LOADS ----------------
// useEffect(() => {
//   if (customer) {
//     setDeliveryAddress(customer.address || "");
//   }
// }, [customer]);

//   return (
//     <div className="final-step">
//       <h2>Final Step – Review & Place Order</h2>

//       {/* Customer Info */}
//       <section>
//         <h3>Customer Info</h3>
//         <p>Name: {customer?.name || "-"}</p>
//         <p>Email: {customer?.email || "-"}</p>
//         <p>Address: {customer?.address || "-"}</p>
//       </section>

//       {/* Cart Items */}
//       <section>
//         <h3>Cart Items</h3>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cartItems.map(item => (
//             <div key={item.accessoryID} className="cart-card no-image">
//               <div className="cart-info">
//                 <h4>{item.type || "Accessory"} — {item.accessoryID}</h4>
//                 <p>Metal: {item.metal || "—"}</p>
//                 <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
//                 {item.summary?.charms?.length > 0 && (
//                   <p>Charms: {item.summary.charms.map(c => `${c.charmID}x${c.quantity ?? 1}`).join(", ")}</p>
//                 )}
//                 <p>Qty: {item.qty || 1}</p>
//               </div>
//             </div>
//           ))
//         )}
//         <h4>Total: ${total.toFixed(2)}</h4>
//       </section>

//       {/* Designer Selection */}
//       <section>
//         <h3>Select Designer</h3>
//         <select value={selectedDesigner} onChange={e => setSelectedDesigner(e.target.value)}>
//           <option value="">-- Choose a designer --</option>
//           {designers.map(d => (
//             <option key={d.designerID} value={d.designerID}>
//               {d.name} — {d.branch}
//             </option>
//           ))}
//         </select>
//       </section>

//       {/* Pickup Option */}
//       <section>
//         <label>
//           <input type="checkbox" checked={pickup} onChange={e => setPickup(e.target.checked)} />
//           Pickup from designer branch
//         </label>
//       </section>

//       {/* Payment Type */}
//       <section>
//         <h3>Payment Type</h3>
//         <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
//           <option value="cash">Cash</option>
//           <option value="card">Card</option>
//           <option value="online">Online</option>
//         </select>
//       </section>

//       {/* Card Info */}
//       {paymentType === "card" && (
//         <section>
//           <h3>Card Information</h3>
//           <input
//             type="text"
//             placeholder="Card Number"
//             value={cardInfo.number}
//             onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Name on Card"
//             value={cardInfo.name}
//             onChange={e => setCardInfo({ ...cardInfo, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Expiry MM/YY"
//             value={cardInfo.expiry}
//             onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="CVV"
//             value={cardInfo.cvv}
//             onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
//           />
//         </section>
//       )}

//       <button className="complete-btn" onClick={handlePlaceOrder}>
//         Place Order
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import "../styles/finalstep.css";
import { api } from "../api/client";

export default function FinalStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ---------------- STATES ----------------
  const { cartItems: cartFromCartPage = [] } = location.state || {};
  const [cartItems, setCartItems] = useState(cartFromCartPage);

  const [customer, setCustomer] = useState(null);
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [pickup, setPickup] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD CUSTOMER ----------------
  useEffect(() => {
    async function loadCustomer() {
      if (!user) return;
      try {
        const data = await api.getMyCustomerAccount();
        setCustomer(data);
        setDeliveryAddress(data.address || "");
      } catch (err) {
        console.error("Failed to load customer:", err);
        alert("Failed to load customer info: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [user]);

  // ---------------- LOAD DESIGNERS ----------------
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

  // ---------------- PLACE ORDER ----------------
  const handlePlaceOrder = async () => {
    if (!customer) return alert("Customer info not loaded!");
    if (!selectedDesigner) return alert("Please select a designer");
    if (cartItems.length === 0) return alert("Cart is empty");

    if (paymentType === "card") {
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
        return alert("Please fill all card information");
      }
    }

    const designer = designers.find(d => d.designerID === selectedDesigner);
    if (!designer) return alert("Selected designer not found");

    const addressToUse = pickup
      ? designer.branch || "Designer Branch"
      : deliveryAddress || customer.address || "Customer Address";

    const orderPayload = {
      orderID: `O${Date.now()}`, // unique order ID
      designerID: selectedDesigner,
      customerID: customer.customerID,
      orderDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      isPickup: pickup ? 1 : 0,
      address: addressToUse,
      paymentType,
      items: cartItems.map(item => item.accessoryID), // array of accessory IDs only
      cardInfo: paymentType === "card" ? cardInfo : null,
    };

    try {
      await api.createOrder(orderPayload);

      // Update customer address in database if delivery
      if (!pickup && deliveryAddress !== customer.address) {
        await api.updateCustomerAccount({
          firstName: customer.firstName || "",
          lastName: customer.lastName || "",
          email: customer.email || "",
          countryCode: customer.countryCode || "",
          phoneNb: customer.phoneNb || "",
          address: deliveryAddress,
        });
      }

      navigate("/", {
        state: { message: "Order placed successfully! Check your account to track it." },
      });
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order: " + err.message);
    }
  };

  // ---------------- RENDER ----------------
  if (!user) return <p>Please login to place an order.</p>;
  if (loading) return <p>Loading customer info...</p>;
  if (!customer) return <p>No customer info found.</p>;

  return (
    <div className="final-step">
      <h2>Final Step – Review & Place Order</h2>

      {/* Customer Info */}
      <section>
        <h3>Customer Info</h3>
        <p>Name: {customer.name || "-"}</p>
        <p>Email: {customer.email || "-"}</p>
        <p>Address: {customer.address || "-"}</p>
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
                <p>Qty: {item.qty || 1}</p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Designer Selection */}
      <section>
        <h3>Select Designer</h3>
        <select value={selectedDesigner} onChange={e => setSelectedDesigner(e.target.value)}>
          <option value="">-- Choose a designer --</option>
          {designers.map(d => (
            <option key={d.designerID} value={d.designerID}>
              {d.name} — {d.branch}
            </option>
          ))}
        </select>
      </section>

      {/* Pickup & Delivery Address */}
      <section>
        <label>
          <input type="checkbox" checked={pickup} onChange={e => setPickup(e.target.checked)} />
          Pickup from designer branch
        </label>

        {!pickup && (
          <div className="delivery-address">
            <h4>Delivery Address</h4>
            <input
              type="text"
              value={deliveryAddress}
              onChange={e => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
          </div>
        )}
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

      {/* Card Info */}
      {paymentType === "card" && (
        <section>
          <h3>Card Information</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardInfo.number}
            onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name on Card"
            value={cardInfo.name}
            onChange={e => setCardInfo({ ...cardInfo, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expiry MM/YY"
            value={cardInfo.expiry}
            onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardInfo.cvv}
            onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
          />
        </section>
      )}

      <button className="complete-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}













// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../context/AuthContext";
// import "../styles/finalstep.css";
// import { api } from "../api/client";

// export default function FinalStep() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const { cartItems: cartFromCartPage = [] } = location.state || {};
//   const [cartItems, setCartItems] = useState(cartFromCartPage);

//   const [customer, setCustomer] = useState(null);
//   const [designers, setDesigners] = useState([]);
//   const [selectedDesigner, setSelectedDesigner] = useState("");
//   const [pickup, setPickup] = useState(false);
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [paymentType, setPaymentType] = useState("cash");
//   const [loading, setLoading] = useState(true);

//   // ---------------- Load Customer ----------------
//   useEffect(() => {
//     async function loadCustomer() {
//       if (!user) return;
//       try {
//         const data = await api.getMyCustomerAccount(); // your client has this function
//         setCustomer(data);
//         setDeliveryAddress(data.address || "");
//       } catch (err) {
//         console.error("Failed to load customer:", err);
//         alert("Failed to load customer info: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadCustomer();
//   }, [user]);

//   // ---------------- Load Designers ----------------
//   useEffect(() => {
//     async function loadDesigners() {
//       try {
//         const data = await api.getDesigners();
//         setDesigners(Array.isArray(data) ? data : data?.designers || []);
//       } catch (err) {
//         console.error("Failed to load designers:", err);
//         alert("Failed to load designers: " + err.message);
//       }
//     }
//     loadDesigners();
//   }, []);

//   // ---------------- Place Order ----------------
//   const handlePlaceOrder = async () => {
//     if (!customer) return alert("Customer info not loaded!");
//     if (!selectedDesigner) return alert("Please select a designer");
//     if (cartItems.length === 0) return alert("Cart is empty");

//     const designer = designers.find(d => d.designerID === selectedDesigner);

//     if (!designer) return alert("Selected designer not found");

//     const orderPayload = {
//       orderID: `O${Date.now()}`, // unique ID
//       designerID: selectedDesigner,
//       customerID: customer.customerID,
//       orderDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
//       isPickup: pickup ? 1 : 0,
//       address: pickup
//         ? designer.branch || "Designer Branch"
//         : deliveryAddress || customer.address || "Customer Address",
//       paymentType,
//       items: cartItems.map(item => item.accessoryID), // array of IDs only
//     };

//     try {
//       await api.createOrder(orderPayload);
//       navigate("/", {
//         state: { message: "Order placed successfully! Check your account to track it." },
//       });
//     } catch (err) {
//       console.error("Failed to place order:", err);
//       alert("Failed to place order: " + err.message);
//     }
//   };

//   if (!user) return <p>Please login to place an order.</p>;
//   if (loading) return <p>Loading customer info...</p>;
//   if (!customer) return <p>No customer info found.</p>;

//   return (
//     <div className="final-step">
//       <h2>Final Step – Review & Place Order</h2>

//       {/* Customer Info */}
//       <section>
//         <h3>Customer Info</h3>
//         <p>Name: {customer.name || "-"}</p>
//         <p>Email: {customer.email || "-"}</p>
//         <p>Address: {customer.address || "-"}</p>
//       </section>

//       {/* Cart Items */}
//       <section>
//         <h3>Cart Items</h3>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cartItems.map(item => (
//             <div key={item.accessoryID} className="cart-card no-image">
//               <div className="cart-info">
//                 <h4>{item.type || "Accessory"} — {item.accessoryID}</h4>
//                 <p>Metal: {item.metal || "—"}</p>
//                 <p>Qty: {item.qty || 1}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </section>

//       {/* Designer Selection */}
//       <section>
//         <h3>Select Designer</h3>
//         <select value={selectedDesigner} onChange={e => setSelectedDesigner(e.target.value)}>
//           <option value="">-- Choose a designer --</option>
//           {designers.map(d => (
//             <option key={d.designerID} value={d.designerID}>
//               {d.name} — {d.branch}
//             </option>
//           ))}
//         </select>
//       </section>

//       {/* Pickup & Delivery Address */}
//       <section>
//         <label>
//           <input type="checkbox" checked={pickup} onChange={e => setPickup(e.target.checked)} />
//           Pickup from designer branch
//         </label>

//         {!pickup && (
//           <div className="delivery-address">
//             <h4>Delivery Address</h4>
//             <input
//               type="text"
//               value={deliveryAddress}
//               onChange={e => setDeliveryAddress(e.target.value)}
//               placeholder="Enter delivery address"
//             />
//           </div>
//         )}
//       </section>

//       {/* Payment Type */}
//       <section>
//         <h3>Payment Type</h3>
//         <select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
//           <option value="cash">Cash</option>
//           <option value="card">Card</option>
//           <option value="online">Online</option>
//         </select>
//       </section>

//       <button className="complete-btn" onClick={handlePlaceOrder}>
//         Place Order
//       </button>
//     </div>
//   );
// }
