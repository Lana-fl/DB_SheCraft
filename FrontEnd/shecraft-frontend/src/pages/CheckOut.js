// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import RingViewer from "./RingViewer";
// // import Footer from "./Footer";

// // export default function CheckoutPage() {
// //   const { state } = useLocation();
// //   if (!state) return <h2>No data</h2>;

// //   const price =
// //     120 * state.weight +
// //     (state.diamondCount * 150) +
// //     (state.purity === "lab" ? -50 : 100);

// //   return (
// //     <div className="ring-page ring-page-main">
// //       <div className="customizer-container">
// //         <div className="preview-section">
// //           <RingViewer
// //             baseColor={state.baseColor}
// //             diamondColors={state.diamondColors}
// //             diamondCount={state.diamondCount}
// //             engravingText={state.engraving}
// //             thickness={state.thickness}
// //           />
// //         </div>

// //         <div className="options-section">
// //           <h2>Order Summary</h2>
// //           <ul>
// //             <li>Base Color: {state.baseColor}</li>
// //             <li>Thickness: {state.thickness}</li>
// //             <li>Purity: {state.purity}</li>
// //             <li>Diamonds: {state.diamondCount}</li>
// //             {state.diamondColors.map((c, i) => (
// //               <li key={i}>Diamond {i + 1} Color: {c}</li>
// //             ))}
// //             <li>Weight: {state.weight} grams</li>
// //             <li>Engraving: {state.engraving || "None"}</li>
// //           </ul>
// //           <h2>Total Price: ${price}</h2>
// //           <button className="checkout-btn">Choose Designer & Pay</button>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }
// /// CheckoutPage.jsx
// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import RingsPage from "./RingsPage";
// import "../styles/checkout.css"; // Create this file for styling

// export default function CheckoutPage() {
//   const { state } = useLocation();

//   if (!state) {
//     return (
//       <div style={{ padding: 40 }}>
//         <h2>No order data</h2>
//         <Link to="/">Back to builder</Link>
//       </div>
//     );
//   }

//   // Price calculation (you can adjust)
//   const totalPrice =
//     (state.basePrice || 100) +
//     (state.diamondCount * 250) +
//     (state.engraving ? 50 : 0);

//   // Demo designers
//   const designers = ["Alice Smith", "John Doe", "Mary Johnson"];
//   const [selectedDesigner, setSelectedDesigner] = React.useState(designers[0]);

//   return (
//     <div className="checkout-page">
//       <h1>Order Summary & Designer Selection</h1>

//       <div className="checkout-container">
//         {/* Left: Ring Preview */}
//         <div className="checkout-ring-preview">
//           <h3>Ring Preview</h3>
//           <div className="viewer-box">
//             <RingModel
//               baseColor={state.metalColorHex}
//               diamondColors={state.diamondColors || []}
//               showDiamonds={state.diamondCount > 0}
//             />
//           </div>
//         </div>

//         {/* Right: Order Details */}
//         <div className="checkout-details">
//           <h3>Selected Options</h3>
//           <p><b>Metal:</b> {state.baseMetal} <span className="color-box" style={{ background: state.metalColorHex }} /></p>
//           <p><b>Thickness:</b> {state.thickness}</p>
//           <p><b>Purity:</b> {state.purity}</p>
//           <p><b>Diamonds:</b> {state.diamondCount}</p>
//           {state.diamondColors?.map((c, i) => (
//             <p key={i}>
//               Diamond {i + 1} color: <span className="color-box" style={{ background: c }} />
//             </p>
//           ))}
//           <p><b>Weight:</b> {state.weight} g</p>
//           <p><b>Engraving:</b> {state.engraving || "—"}</p>

//           <h3>Total Price: ${totalPrice}</h3>

//           <label htmlFor="designer">Choose Designer:</label>
//           <select
//             id="designer"
//             value={selectedDesigner}
//             onChange={e => setSelectedDesigner(e.target.value)}
//           >
//             {designers.map(d => (
//               <option key={d} value={d}>{d}</option>
//             ))}
//           </select>

//           <div className="checkout-actions">
//             <button className="primary">Pay Now (Demo)</button>
//             <Link to="/" className="secondary">Edit Order</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { state } = useLocation();
  const { ringType, baseColor, diamondColors, engraving, thickness, designer } = state || {};

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Checkout</h2>
      <p>Ring Type: {ringType}</p>
      <p>Base Color: {baseColor}</p>
      <p>Diamonds: {diamondColors.map(d => d.color).join(", ")}</p>
      <p>Engraving: {engraving}</p>
      <p>Thickness: {thickness}</p>
      <p>Designer: {designer}</p>

      <button className="checkout-btn">Confirm & Pay</button>
    </div>
  );
}
