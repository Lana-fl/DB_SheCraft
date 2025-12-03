// // components/WizardPanel.jsx
// import React from "react";

// export default function WizardPanel({
//   thickness,
//   setThickness,
//   purity,
//   setPurity,
//   diamondColors,
//   setDiamondColors,
//   weight,
//   setWeight,
//   engraving,
//   setEngraving,
//   diamondCount,
//   setDiamondCount,
//   onCheckout,
// }) {
//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors((prev) =>
//       prev.map((c, i) => (i === index ? color : c))
//     );
//   };

//   return (
//     <div className="wizard">
//       <h1>Customize Your Ring</h1>

//       <div className="section">
//         <h3>Ring Thickness</h3>
//         <input
//           type="range"
//           min="1"
//           max="10"
//           value={thickness}
//           onChange={(e) => setThickness(e.target.value)}
//         />
//       </div>

//       <div className="section">
//         <h3>Diamond Purity</h3>
//         <select value={purity} onChange={(e) => setPurity(e.target.value)}>
//           <option value="natural">Natural</option>
//           <option value="lab">Lab-grown</option>
//         </select>
//       </div>

//       <div className="section">
//         <h3>Diamond Colors</h3>
//         {Array.from({ length: diamondCount }).map((_, i) => (
//           <input
//             key={i}
//             type={purity === "natural" ? "color" : "color"}
//             value={diamondColors[i] || "#ffffff"}
//             onChange={(e) => handleDiamondColorChange(i, e.target.value)}
//             style={{ marginRight: "8px", marginBottom: "8px" }}
//           />
//         ))}
//       </div>

//       <div className="section">
//         <h3>Weight (grams)</h3>
//         <input
//           type="number"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//         />
//       </div>

//       <div className="section">
//         <h3>Engraving</h3>
//         <input
//           type="text"
//           placeholder="Type your text..."
//           value={engraving}
//           onChange={(e) => setEngraving(e.target.value)}
//         />
//       </div>

//       <div className="section">
//         <h3>Number of Diamonds</h3>
//         <select
//           value={diamondCount}
//           onChange={(e) => setDiamondCount(Number(e.target.value))}
//         >
//           <option value={1}>1 Diamond</option>
//           <option value={2}>2 Diamonds</option>
//           <option value={3}>3 Diamonds</option>
//         </select>
//       </div>

//       <button className="checkout-btn" onClick={onCheckout}>
//         Continue to Checkout →
//       </button>
//     </div>
//   );
// }
