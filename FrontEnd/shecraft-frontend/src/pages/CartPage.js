// // import React, { useState } from "react";
// // import "../styles/cart.css";

// // export default function CartPage({ isLoggedIn, userRole }) {
// //   const [orders, setOrders] = useState([
// //     { id: 1, product: "Custom Necklace", customer: "Sarah M.", status: "In Progress" },
// //     { id: 2, product: "Birthstone Ring", customer: "Daniel R.", status: "Pending" },
// //   ]);

// //   const handleComplete = (id) => {
// //     setOrders((prev) =>
// //       prev.map((order) =>
// //         order.id === id ? { ...order, status: "Completed" } : order
// //       )
// //     );
// //   };

// //   // -------- NOT LOGGED IN --------
// //   //if (!isLoggedIn) {
// //     //return (
// //      // <div className="cart-not-logged">
// //        // <h2>Please login to view your orders.</h2>
// //      // </div>
// //    // );
// //   //}

// //   // -------- CUSTOMER VIEW --------
// //   if (userRole === "customer") {
// //     return (
// //       <div className="cart-page">
// //         <h1 className="cart-title">Your Orders</h1>

// //         <div className="cart-items">
// //           {orders.map((item) => (
// //             <div key={item.id} className="cart-card no-image">
// //               <div className="cart-info">
// //                 <h3>{item.product}</h3>
// //                 <p>
// //                   Status:{" "}
// //                   <span
// //                     className={
// //                       "status " +
// //                       item.status
// //                         .trim()
// //                         .toLowerCase()
// //                         .replace(/\s+/g, "-")
// //                     }
// //                   >
// //                     {item.status}
// //                   </span>
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   // -------- DESIGNER DASHBOARD --------
// //   return (
// //     <div className="designer-page">
// //       <h1 className="cart-title">Designer Dashboard</h1>
// //       <p className="designer-sub">Orders assigned to you</p>

// //       <div className="cart-items">
// //         {orders.map((item) => (
// //           <div key={item.id} className="cart-card designer-mode no-image">
// //             <div className="cart-info">
// //               <h3>{item.product}</h3>
// //               <p>Customer: {item.customer}</p>

// //               <p>
// //                 Status:{" "}
// //                 <span
// //                   className={
// //                     "status " +
// //                     item.status
// //                       .trim()
// //                       .toLowerCase()
// //                       .replace(/\s+/g, "-")
// //                   }
// //                 >
// //                   {item.status}
// //                 </span>
// //               </p>

// //               <button
// //                 className="complete-btn"
// //                 onClick={() => handleComplete(item.id)}
// //                 disabled={item.status === "Completed"}
// //               >
// //                 {item.status === "Completed" ? "Order Completed" : "Mark as Complete"}
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/cart.css";
// import { useCart } from "../context/CartContext";

// export default function CartPage() {
//   const { cartItems, removeFromCart, total } = useCart();
//   const [removingId, setRemovingId] = useState(null);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate("/final-step");
//   };


//   const handleRemove = async (accessoryID) => {
//     try {
//       setRemovingId(accessoryID);

//       // IMPORTANT: release inventory in DB
//       // change base URL to whatever you mounted (example below)
//       const API_BASE = "http://localhost:5000";

// const res = await fetch(`${API_BASE}/api/accessory-instance/${accessoryID}/cancel`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   credentials: "include",
// });

// const data = await res.json().catch(() => ({}));
// if (!res.ok) {
//   throw new Error(data?.message || data?.error || `Cancel failed (${res.status})`);
// }


//       removeFromCart(accessoryID);
//     } catch (e) {
//       console.error(e);
//       alert("Failed to remove item (cancel reservation).");
//     } finally {
//       setRemovingId(null);
//     }
//   };
  

//   return (
//     <div className="cart-page">
//       <h1 className="cart-title">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <div className="cart-not-logged">
//           <h2>Your cart is empty.</h2>
//         </div>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div key={item.accessoryID} className="cart-card no-image">
//                 <div className="cart-info">
//                   <h3>
//                     {item.type ? item.type.toUpperCase() : "Accessory"} — {item.accessoryID}
//                   </h3>

//                   <p>Metal: {item.metal || "—"}</p>
//                   <p>Price: ${Number(item.price || 0).toFixed(2)}</p>

//                   {item.summary?.charms?.length ? (
//                     <p>
//                       Charms:{" "}
//                       {item.summary.charms.map((c) => `${c.charmID}x${c.quantity ?? 1}`).join(", ")}
//                     </p>
//                   ) : null}

//                   <button
//                     className="complete-btn"
//                     onClick={() => handleRemove(item.accessoryID)}
//                     disabled={removingId === item.accessoryID}
//                   >
//                     {removingId === item.accessoryID ? "Removing..." : "Remove"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div style={{ marginTop: 16 }}>
//             <h2>Total: ${total.toFixed(2)}</h2>
//             {/* later: navigate to FinalCheckoutPage */}
//             <button className="complete-btn" onClick={handleCheckout}>
//       Proceed to Checkout
//     </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, total } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  // ✅ valid DB ids: X001 / R001 / N001 / B001 / E001 ...
  const isValidAccessoryID = (id) => /^[XRNBE]\d{3,}$/i.test(String(id || "").trim());

  const handleCheckout = () => {
    navigate("/final-step", { state: { cartItems, total } });
  };

  const handleRemove = async (item) => {
    const accessoryID = item?.accessoryID;

    try {
      setRemovingId(accessoryID || "unknown");

      // ✅ If it’s NOT a real DB accessoryID, just remove locally (no cancel call)
      if (!isValidAccessoryID(accessoryID)) {
        removeFromCart(accessoryID);
        return;
      }

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

      // ✅ If cancel fails, still remove from UI to avoid user being stuck
      removeFromCart(accessoryID);

      alert("Removed from cart. (Reservation cancel failed or item was not reservable.)");
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
            {cartItems.map((item, idx) => {
              const id = item?.accessoryID;
              const valid = isValidAccessoryID(id);

              return (
                <div
                  key={valid ? id : `${item?.type || "item"}-${idx}`}
                  className="cart-card no-image"
                >
                  <div className="cart-info">
                    <h3>
                      {item.type || "Accessory"} —{" "}
                      {valid ? id : "❌ MISSING accessoryID"}
                    </h3>

                    <p>Metal: {item.metal || "—"}</p>
                    <p>Price: ${Number(item.price || 0).toFixed(2)}</p>

                    {item.summary?.charms?.length ? (
                      <p>
                        Charms:{" "}
                        {item.summary.charms
                          .map((c) => `${c.charmID}x${c.quantity ?? 1}`)
                          .join(", ")}
                      </p>
                    ) : null}

                    <p>Qty: {item.qty || 1}</p>

                    <button
                      className="complete-btn"
                      onClick={() => handleRemove(item)}
                      disabled={removingId === (id || "unknown")}
                    >
                      {removingId === (id || "unknown") ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16 }}>
            <h2>Total: ${Number(total || 0).toFixed(2)}</h2>
            <button className="complete-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
