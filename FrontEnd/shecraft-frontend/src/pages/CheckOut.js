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
// 
// import React, { Suspense } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import "../styles/checkout.css";
// import Footer from "./Footer";
// import RingModel from "./RingModel";

// export default function CheckoutPage() {
//   const { state } = useLocation();
//   const itemType = state?.itemType || "ring";

//   // Ring props
//   const { ringType, baseColor, diamondColors, diamondType, engraving, thickness, diamondCount, selectedDiamond } = state || {};

//   // Necklace/Earring/Bracelet props
//   const { image, nameText, metal, necklaceLength, chainType, fontType, designer } = state || {};

//   return (
//     <div className="checkout-page full-page">
//       <h1>Checkout</h1>

//       {/* Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Item", "Choose Your Designer", "Checkout"].map((label, index) => (
//           <div key={index} className={`step-box ${index + 1 === 3 ? "active" : ""}`}>
//             <div className="step-number">{index + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="checkout-container">
//         {/* Preview */}
//         <div className="checkout-preview">
//           {itemType === "ring" ? (
//             <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }} className="checkout-canvas">
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} />
//               <Suspense fallback={null}>
//                 <RingModel
//                   ringType={ringType}
//                   baseColor={baseColor}
//                   diamondColors={diamondColors}
//                   showDiamonds={diamondCount > 0}
//                   thickness={thickness}
//                   selectedDiamond={selectedDiamond}
//                   diamondCount={diamondCount}
//                 />
//                 <Environment preset="city" background={false} />
//               </Suspense>
//               <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//             </Canvas>
//           ) : (
//             <div className="image-viewer">
//               <img src={image} alt={nameText} className="main-item-img" />
//             </div>
//           )}
//         </div>

//         {/* Order Details */}
//         <div className="checkout-details">
//           <h3>Order Summary</h3>
//           {itemType === "ring" ? (
//             <>
//               <p><strong>Ring Type:</strong> {ringType || "N/A"}</p>
//               <p><strong>Base Color:</strong> {baseColor || "N/A"}</p>
//               <p><strong>Diamonds:</strong></p>
//               <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px" }}>
//                 {diamondColors && diamondColors.length > 0 ? (
//                   diamondColors.map((d, i) =>
//                     diamondType === "lab" ? (
//                       <div key={i} className="color-box" style={{ backgroundColor: d.color }}></div>
//                     ) : (
//                       <div key={i} className="color-label">{d.name || d.color}</div>
//                     )
//                   )
//                 ) : (
//                   <span>N/A</span>
//                 )}
//               </div>
//               <p><strong>Diamond Type:</strong> {diamondType === "lab" ? "Lab Grown" : "Real Gem"}</p>
//               <p><strong>Engraving:</strong> {engraving || "None"}</p>
//               <p><strong>Thickness:</strong> {thickness || "N/A"}</p>
//             </>
//           ) : (
//             <>
//               <p><strong>Name:</strong> {nameText || "N/A"}</p>
//               <p><strong>Metal:</strong> {metal || "N/A"}</p>
//               {itemType === "necklace" && <p><strong>Length:</strong> {necklaceLength || "N/A"} inches</p>}
//               {itemType === "necklace" && <p><strong>Chain Type:</strong> {chainType || "N/A"}</p>}
//               {fontType && <p><strong>Font:</strong> {fontType}</p>}
//             </>
//           )}
//           <p><strong>Designer:</strong> {designer || "N/A"}</p>

//           <div className="checkout-actions">
//             <button className="primary">Confirm & Pay</button>
//             <Link to="/" className="secondary">Edit Design</Link>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { Suspense } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import "../styles/checkout.css";
// import Footer from "./Footer";
// import RingModel from "./RingModel";

// export default function CheckoutPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const itemType = state?.itemType || "ring";

//   // Ring props
//   const { ringType, baseColor, diamondColors, diamondType, engraving, thickness, diamondCount, selectedDiamond } = state || {};

//   // Necklace/Earring/Bracelet props
//   const { image, nameText, metal, necklaceLength, chainType, fontType, designer } = state || {};

//  const handleEditDesign = () => {
//   switch (itemType) {
//     case "ring":
//       navigate("/ringspage", { state }); // stays on ring selection
//       break;
//     case "necklace":
//       navigate("/necklacespage", { state }); // go to necklaces page
//       break;
//     case "bracelet":
//       navigate("/bracelets", { state });
//       break;
//     case "earring":
//       navigate("/earrings", { state });
//       break;
//     default:
//       navigate("/", { state });
//       break;
//   }
// };



//   return (
//     <div className="checkout-page full-page">
//       <h1>Checkout</h1>

//       {/* Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Item", "Choose Your Designer", "Checkout"].map((label, index) => (
//           <div key={index} className={`step-box ${index + 1 === 3 ? "active" : ""}`}>
//             <div className="step-number">{index + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="checkout-container">
//         {/* Preview */}
//         <div className="checkout-preview">
//           {itemType === "ring" ? (
//             <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }} className="checkout-canvas">
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} />
//               <Suspense fallback={null}>
//                 <RingModel
//                   ringType={ringType}
//                   baseColor={baseColor}
//                   diamondColors={diamondColors}
//                   showDiamonds={diamondCount > 0}
//                   thickness={thickness}
//                   selectedDiamond={selectedDiamond}
//                   diamondCount={diamondCount}
//                 />
//                 <Environment preset="city" background={false} />
//               </Suspense>
//               <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//             </Canvas>
//           ) : (
//             <div className="image-viewer">
//               <img src={image} alt={nameText} className="main-item-img" />
//             </div>
//           )}
//         </div>

//         {/* Order Details */}
//         <div className="checkout-details">
//           <h3>Order Summary</h3>
//           {itemType === "ring" ? (
//             <>
//               <p><strong>Ring Type:</strong> {ringType || "N/A"}</p>
//               <p><strong>Base Color:</strong> {baseColor || "N/A"}</p>
//               <p><strong>Diamonds:</strong></p>
//               <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px" }}>
//                 {diamondColors && diamondColors.length > 0 ? (
//                   diamondColors.map((d, i) =>
//                     diamondType === "lab" ? (
//                       <div key={i} className="color-box" style={{ backgroundColor: d.color }}></div>
//                     ) : (
//                       <div key={i} className="color-label">{d.name || d.color}</div>
//                     )
//                   )
//                 ) : (
//                   <span>N/A</span>
//                 )}
//               </div>
//               <p><strong>Diamond Type:</strong> {diamondType === "lab" ? "Lab Grown" : "Real Gem"}</p>
//               <p><strong>Engraving:</strong> {engraving || "None"}</p>
//               <p><strong>Thickness:</strong> {thickness || "N/A"}</p>
//             </>
//           ) : (
//             <>
//               <p><strong>Name:</strong> {nameText || "N/A"}</p>
//               <p><strong>Metal:</strong> {metal || "N/A"}</p>
//               {itemType === "necklace" && <p><strong>Length:</strong> {necklaceLength || "N/A"} inches</p>}
//               {itemType === "necklace" && <p><strong>Chain Type:</strong> {chainType || "N/A"}</p>}
//               {fontType && <p><strong>Font:</strong> {fontType}</p>}
//             </>
//           )}
//           <p><strong>Designer:</strong> {designer || "N/A"}</p>

//           <div className="checkout-actions">
//             <button className="primary">Confirm & Pay</button>
//             <button className="secondary" onClick={handleEditDesign}>Edit Design</button>
//           </div>
          
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

//Working
import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "../styles/checkout.css";
import Footer from "./Footer";
import RingModel from "./RingModel";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const itemType = state?.itemType || "ring";

  // RING PROPS
  const {
    ringType,
    baseColor,
    diamondColors,
    diamondType,
    engraving,
    thickness,
    diamondCount,
    selectedDiamond
  } = state || {};

  // NECKLACE / BRACELET / EARRING PROPS
  const {
    image,
    nameText,
    metal,
    necklaceLength,
    chainType,
    fontType,
    designer
  } = state || {};

  // Go back to correct designer page
  const handleEditDesign = () => {
    switch (itemType) {
      case "ring":
        navigate("/ringspage", { state });
        break;
      case "necklace":
        navigate("/necklacespage", { state });
        break;
      case "bracelet":
        navigate("/bracelets", { state });
        break;
      case "earring":
        navigate("/earrings", { state });
        break;
      default:
        navigate("/", { state });
    }
  };

  return (
    <div className="checkout-page full-page">
      <h1>Checkout</h1>

      {/* STEPS */}
      <div className="steps-horizontal">
        {["Customize", "Choose Designer", "Checkout"].map((label, index) => (
          <div
            key={index}
            className={`step-box ${index + 1 === 3 ? "active" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-labels">{label}</div>
          </div>
        ))}
      </div>

      <div className="checkout-container">
        {/* LEFT — PREVIEW */}
        <div className="checkout-preview">
          {itemType === "ring" ? (
            <Canvas
              shadows
              camera={{ position: [0, 1.5, 4], fov: 50 }}
              className="checkout-canvas"
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <directionalLight position={[-5, 5, -5]} intensity={1} />

              <Suspense fallback={null}>
                <RingModel
                  ringType={ringType}
                  baseColor={baseColor}
                  diamondColors={diamondColors}
                  showDiamonds={diamondCount > 0}
                  thickness={thickness}
                  selectedDiamond={selectedDiamond}
                  diamondCount={diamondCount}
                />
                <Environment preset="city" background={false} />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={false} enableRotate />
            </Canvas>
          ) : (
            <div className="image-viewer">
              <img src={image} alt={nameText} className="main-item-img" />
            </div>
          )}
        </div>

        {/* RIGHT — ORDER DETAILS */}
        <div className="checkout-details">
          <h3>Order Summary</h3>

          {itemType === "ring" ? (
            <>
              <p><strong>Ring Type:</strong> {ringType || "N/A"}</p>
              <p><strong>Base Color:</strong> {baseColor || "N/A"}</p>

              <p><strong>Diamonds:</strong></p>
              <div className="diamond-display">
                {diamondColors && diamondColors.length > 0 ? (
                  diamondColors.map((d, i) =>
                    diamondType === "lab" ? (
                      <div
                        key={i}
                        className="color-box"
                        style={{ backgroundColor: d.color }}
                      ></div>
                    ) : (
                      <div key={i} className="color-label">
                        {d.name || d.color}
                      </div>
                    )
                  )
                ) : (
                  "N/A"
                )}
              </div>

              <p>
                <strong>Diamond Type:</strong>{" "}
                {diamondType === "lab" ? "Lab Grown" : "Natural Gem"}
              </p>

              <p><strong>Engraving:</strong> {engraving || "None"}</p>
              <p><strong>Thickness:</strong> {thickness || "N/A"}</p>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {nameText || "N/A"}</p>
              <p><strong>Metal:</strong> {metal || "N/A"}</p>

              {itemType === "necklace" && (
                <>
                  <p><strong>Length:</strong> {necklaceLength || "N/A"}"</p>
                  <p><strong>Chain Type:</strong> {chainType?.name || chainType}</p>
                </>
              )}

              {fontType && <p><strong>Font:</strong> {fontType}</p>}
            </>
          )}

          <p><strong>Designer:</strong> {designer || "N/A"}</p>

          <div className="checkout-actions">
            <button className="primary">Confirm & Pay</button>
            <button className="secondary" onClick={handleEditDesign}>
              Edit Design
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}
// import React, { Suspense } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import "../styles/checkout.css";
// import Footer from "./Footer";
// import RingModel from "./RingModel";

// export default function CheckoutPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const itemType = state?.itemType || "ring";

//   // Ring props
//   const {
//     ringType,
//     baseColor,
//     diamondColors,
//     diamondType,
//     engraving,
//     thickness,
//     diamondCount,
//     selectedDiamond,
//   } = state || {};

//   // Necklace/Earring/Bracelet props
//   const {
//     image,
//     nameText,
//     metal,
//     necklaceLength,
//     chainType,
//     fontType,
//     designer,
//   } = state || {};

//   const handleEditDesign = () => {
//     switch (itemType) {
//       case "ring":
//         navigate("/ringspage", { state });
//         break;
//       case "necklace":
//         navigate("/necklacespage", { state });
//         break;
//       case "bracelet":
//         navigate("/bracelets", { state });
//         break;
//       case "earring":
//         navigate("/earrings", { state });
//         break;
//       default:
//         navigate("/", { state });
//         break;
//     }
//   };

//   return (
//     <div className="checkout-page fade-in">
//       <h1>Checkout</h1>

//       {/* Steps */}
//       <div className="steps-horizontal fade-up">
//         {["Customize Your Item", "Choose Your Designer", "Checkout"].map(
//           (label, index) => (
//             <div
//               key={index}
//               className={`step-box ${index + 1 === 3 ? "active" : ""}`}
//             >
//               <div className="step-number">{index + 1}</div>
//               <div className="step-labels">{label}</div>
//             </div>
//           )
//         )}
//       </div>

//       <div className="checkout-container fade-up-delayed">
//         {/* Preview */}
//         <div className="checkout-preview">
//           {itemType === "ring" ? (
//             <Canvas
//               shadows
//               camera={{ position: [0, 1.5, 4], fov: 50 }}
//               className="checkout-canvas"
//             >
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} />
//               <Suspense fallback={null}>
//                 <RingModel
//                   ringType={ringType}
//                   baseColor={baseColor}
//                   diamondColors={diamondColors}
//                   showDiamonds={diamondCount > 0}
//                   thickness={thickness}
//                   selectedDiamond={selectedDiamond}
//                   diamondCount={diamondCount}
//                 />
//                 <Environment preset="city" background={false} />
//               </Suspense>
//               <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//             </Canvas>
//           ) : (
//             <div className="image-viewer">
//               <img src={image} alt={nameText} className="main-item-img" />
//             </div>
//           )}
//         </div>

//         {/* Order Details */}
//         <div className="checkout-details fade-right">
//           <h3>Order Summary</h3>

//           {itemType === "ring" ? (
//             <>
//               <p>
//                 <strong>Ring Type:</strong> {ringType || "N/A"}
//               </p>
//               <p>
//                 <strong>Base Color:</strong> {baseColor || "N/A"}
//               </p>
//               <p>
//                 <strong>Diamonds:</strong>
//               </p>
//               <div style={{ display: "flex", flexWrap: "wrap", marginTop: 5 }}>
//                 {diamondColors && diamondColors.length > 0 ? (
//                   diamondColors.map((d, i) =>
//                     diamondType === "lab" ? (
//                       <div
//                         key={i}
//                         className="color-box"
//                         style={{ backgroundColor: d.color }}
//                       />
//                     ) : (
//                       <div key={i} className="color-label">
//                         {d.name || d.color}
//                       </div>
//                     )
//                   )
//                 ) : (
//                   <span>N/A</span>
//                 )}
//               </div>

//               <p>
//                 <strong>Diamond Type:</strong>{" "}
//                 {diamondType === "lab" ? "Lab Grown" : "Real Gem"}
//               </p>
//               <p>
//                 <strong>Engraving:</strong> {engraving || "None"}
//               </p>
//               <p>
//                 <strong>Thickness:</strong> {thickness || "N/A"}
//               </p>
//             </>
//           ) : (
//             <>
//               <p>
//                 <strong>Name:</strong> {nameText || "N/A"}
//               </p>
//               <p>
//                 <strong>Metal:</strong> {metal || "N/A"}
//               </p>
//               {itemType === "necklace" && (
//                 <>
//                   <p>
//                     <strong>Length:</strong> {necklaceLength || "N/A"} inches
//                   </p>
//                   <p>
//                     <strong>Chain Type:</strong> {chainType || "N/A"}
//                   </p>
//                 </>
//               )}
//               {fontType && (
//                 <p>
//                   <strong>Font:</strong> {fontType}
//                 </p>
//               )}
//             </>
//           )}

//           <p>
//             <strong>Designer:</strong> {designer || "N/A"}
//           </p>

//           <div className="checkout-actions">
//             <button className="primary">Confirm & Pay</button>
//             <button className="secondary" onClick={handleEditDesign}>
//               Edit Design
//             </button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
