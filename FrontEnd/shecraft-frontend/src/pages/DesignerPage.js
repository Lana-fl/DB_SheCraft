// // BottomCarousel.jsx
// import React from "react";

// /*
//   Steps:
//   0 - Base metal (material balls)
//   1 - Thickness
//   2 - Diamond wizard (purity -> count -> colors)
//   3 - Engraving & Weight
//   4 - Summary & Checkout
// */

// export default function BottomCarousel(props) {
//   const {
//     step, setStep,
//     baseMetal, setBaseMetal, METAL_COLORS,
//     thickness, setThickness,
//     diamondCount, setDiamondCount,
//     purity, setPurity,
//     diamondColors, setDiamondColorAt,
//     NATURAL_PRESETS,
//     engraving, setEngraving,
//     weight, setWeight,
//     onCheckout
//   } = props;

//   const materialItems = [
//     { key: "silver", left: "#fff", right: METAL_COLORS.silver },
//     { key: "gold", left: "#fff", right: METAL_COLORS.gold },
//     { key: "rosegold", left: "#fff", right: METAL_COLORS.rosegold },
//   ];

//   const next = () => setStep(Math.min(4, step + 1));
//   const prev = () => setStep(Math.max(0, step - 1));

//   return (
//     <div className="bottom-carousel">
//       <div className="carousel-inner">

//         {/* left chevron */}
//         <button className="nav-btn" onClick={prev} aria-label="previous">‹</button>

//         <div className="carousel-stage">
//           {/* render panel depending on step */}
//           {step === 0 && (
//             <div className="panel">
//               <h3>Choose base metal</h3>
//               <div className="material-row">
//                 {materialItems.map((m) => (
//                   <button
//                     key={m.key}
//                     className={"material-ball " + (baseMetal === m.key ? "selected" : "")}
//                     onClick={() => setBaseMetal(m.key)}
//                   >
//                     {/* two small spheres (metal + highlight) */}
//                     <div className="ball-left" style={{ background: m.left }} />
//                     <div className="ball-right" style={{ background: m.right }} />
//                   </button>
//                 ))}
//               </div>
//               <div className="panel-actions">
//                 <button className="ghost" onClick={() => setBaseMetal("silver")}>Reset</button>
//                 <button className="primary" onClick={next}>Next →</button>
//               </div>
//             </div>
//           )}

//           {step === 1 && (
//             <div className="panel">
//               <h3>Choose thickness</h3>
//               <div className="thickness-area">
//                 <div className="thick-preview" style={{
//                   background: METAL_COLORS[baseMetal],
//                   width: `${40 + Number(thickness) * 5}px`
//                 }} />
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={thickness}
//                   onChange={(e) => setThickness(Number(e.target.value))}
//                 />
//                 <div className="small-note">Thickness: {thickness}</div>
//               </div>
//               <div className="panel-actions">
//                 <button onClick={prev} className="ghost">Back</button>
//                 <button className="primary" onClick={next}>Next →</button>
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="panel">
//               <h3>Diamonds</h3>

//               <label className="row">
//                 <span>Purity</span>
//                 <select value={purity} onChange={(e) => setPurity(e.target.value)}>
//                   <option value="natural">Natural</option>
//                   <option value="lab">Lab-grown</option>
//                 </select>
//               </label>

//               <label className="row">
//                 <span>Number of diamonds</span>
//                 <select value={diamondCount} onChange={(e) => setDiamondCount(Number(e.target.value))}>
//                   <option value={1}>1</option>
//                   <option value={2}>2</option>
//                   <option value={3}>3</option>
//                 </select>
//               </label>

//               <div className="diamond-colors">
//                 <p>Diamond colors</p>
//                 {Array.from({ length: diamondCount }).map((_, i) => (
//                   <div key={i} className="diamond-row">
//                     <div className="diamond-label">#{i + 1}</div>

//                     {purity === "natural" ? (
//                       // show preset radios
//                       <div className="preset-grid">
//                         {NATURAL_PRESETS.map((p) => (
//                           <label key={p.name} className={"preset " + (diamondColors[i] === p.color ? "sel" : "")}>
//                             <input
//                               type="radio"
//                               name={"nat-" + i}
//                               checked={diamondColors[i] === p.color}
//                               onChange={() => setDiamondColorAt(i, p.color)}
//                             />
//                             <div className="preset-swatch" style={{ background: p.color }} />
//                             <div className="preset-name">{p.name}</div>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       // lab-grown: freedom to choose any color
//                       <input
//                         type="color"
//                         value={diamondColors[i]}
//                         onChange={(e) => setDiamondColorAt(i, e.target.value)}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="panel-actions">
//                 <button onClick={prev} className="ghost">Back</button>
//                 <button onClick={next} className="primary">Next →</button>
//               </div>
//             </div>
//           )}

//           {step === 3 && (
//             <div className="panel">
//               <h3>Engraving & Weight</h3>

//               <label className="row">
//                 <span>Engraving (optional)</span>
//                 <input type="text" value={engraving} onChange={(e) => setEngraving(e.target.value)} placeholder="e.g. 12.05.2024" />
//               </label>

//               <label className="row">
//                 <span>Weight (g)</span>
//                 <input type="number" min="1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
//               </label>

//               <div className="panel-actions">
//                 <button onClick={prev} className="ghost">Back</button>
//                 <button onClick={next} className="primary">Next →</button>
//               </div>
//             </div>
//           )}

//           {step === 4 && (
//             <div className="panel">
//               <h3>Summary</h3>
//               <div className="summary">
//                 <p><b>Metal:</b> {baseMetal}</p>
//                 <p><b>Thickness:</b> {thickness}</p>
//                 <p><b>Diamonds:</b> {diamondCount} ({purity})</p>
//                 {Array.from({ length: diamondCount }).map((_, i) => (
//                   <p key={i}>Diamond {i + 1} color: <span style={{
//                     display: "inline-block",
//                     width: 14,
//                     height: 14,
//                     background: diamondColors[i],
//                     marginLeft: 8,
//                     borderRadius: 3,
//                     border: "1px solid rgba(0,0,0,0.2)"
//                   }} /></p>
//                 ))}
//                 <p><b>Weight:</b> {weight} g</p>
//                 <p><b>Engraving:</b> {engraving || "—"}</p>
//               </div>

//               <div className="panel-actions">
//                 <button onClick={prev} className="ghost">Back</button>
//                 <button className="primary" onClick={onCheckout}>Checkout →</button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* right chevron */}
//         <button className="nav-btn" onClick={next} aria-label="next">›</button>
//       </div>
//     </div>
//   );
// }
// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";
// import ringGLB from "../assets/ring/ring.glb";
// export default function DesignerDashboard() {
// return (
// <div className="designer-page">
// <h1>Designer Admin Panel</h1>
// <p>Upload Rings</p>
// <p>Edit Mesh Connections</p>
// <p>View Orders</p>
// </div>
// );
// }
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DesignerPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { ringType, baseColor, diamondColors, engraving, thickness } = state || {};

  const [designer, setDesigner] = useState("");

  const designers = ["Alice", "Bob", "Charlie"]; // example options

  const handleNext = () => {
    if (!designer) return alert("Please choose a designer.");
    navigate("/checkout", {
      state: { ringType, baseColor, diamondColors, engraving, thickness, designer }
    });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Choose Your Designer</h2>
      <p>Selected Ring Type: {ringType}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "30px 0" }}>
        {designers.map((d) => (
          <div
            key={d}
            style={{
              padding: "20px",
              border: designer === d ? "2px solid #0d753a" : "2px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => setDesigner(d)}
          >
            {d}
          </div>
        ))}
      </div>

      <button className="checkout-btn" onClick={handleNext}>
        Next: Checkout
      </button>
    </div>
  );
}
