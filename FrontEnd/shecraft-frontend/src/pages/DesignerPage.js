
// // import React, { useState, Suspense, useRef, useEffect } from "react";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// // import * as THREE from "three";
// // import "../styles/ring.css";
// // import Footer from "./Footer";
// // import ringGLB from "../assets/ring/ring.glb";
// // export default function DesignerDashboard() {
// // return (
// // <div className="designer-page">
// // <h1>Designer Admin Panel</h1>
// // <p>Upload Rings</p>
// // <p>Edit Mesh Connections</p>
// // <p>View Orders</p>
// // </div>
// // );
// // }

// // import React, { useState, Suspense } from "react";
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import RingModel from "./RingModel";
// import Footer from "./Footer";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";

// export default function DesignerPage() {
//   const { state } = useLocation() || {};
//   const navigate = useNavigate();

//   // Determine the type
//   const itemType = state?.itemType || "ring";

//   // Ring props (safe destructuring with default values)
//   const ringProps = itemType === "ring" ? {
//     ringType: state?.ringType || "ring",
//     baseColor: state?.baseColor || "#C0C0C0",
//     diamondColors: state?.diamondColors || [],
//     engraving: state?.engraving || "",
//     thickness: state?.thickness || 1,
//     diamondCount: state?.diamondCount || 0,
//     selectedDiamond: state?.selectedDiamond || null,
//   } : {};

//   // Necklace props (safe destructuring)
//   const necklaceProps = itemType === "necklace" ? {
//     selectedNameStyle: state?.selectedNameStyle || null,
//     chainType: state?.chainType || null,
//     selectedLength: state?.selectedLength || 16,
//     nameText: state?.nameText || "",
//     metal: state?.metal || "#C0C0C0",
//   } : {};

//   const [designer, setDesigner] = useState("");
//   const designers = ["Alice", "Bob", "Charlie"];
//   const [currentStep, setCurrentStep] = useState(2);

//   const handleNext = () => {
//     if (!designer) return alert("Please choose a designer.");

//     navigate("/checkout", {
//       state: {
//         itemType,
//         designer,
//         ...(itemType === "ring" ? ringProps : necklaceProps),
//       },
//     });
//   };

//   return (
//     <div className="designer-page">
//       <h2>Choose Your Designer</h2>

//       {/* Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Item", "Choose Your Designer", "Checkout"].map((label, idx) => (
//           <div
//             key={idx}
//             className={`step-box ${currentStep === idx + 1 ? "active" : ""}`}
//             onClick={() => setCurrentStep(idx + 1)}
//           >
//             <div className="step-number">{idx + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="designer-content">
//         {/* Viewer */}
//         <div className="designer-viewer">
//           {itemType === "ring" ? (
//             <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} />
//               <RingModel {...ringProps} />
//               <Environment preset="city" background={false} />
//               <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//             </Canvas>
//           ) : (
//             <div className="necklace-preview">
//               {/* Display necklace images (hover logic is handled in NecklacesPage) */}
//               {necklaceProps.selectedNameStyle && (
//                 <img src={necklaceProps.selectedNameStyle.img} alt="necklace" />
//               )}
//             </div>
//           )}
//         </div>

//             {/* Designer Options */}
//          <div className="tabs-sidebar">
//            {designers.map((d) => (
//              <div
//                key={d}
//                className={`designer-card ${designer === d ? "selected" : ""}`}
//                onClick={() => setDesigner(d)}
//              >
//                {d}
//              </div>
//            ))}
//            <button className="checkout-btn" onClick={handleNext}>
//              Next: Checkout
//            </button>
//          </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import RingModel from "./RingModel";
// import Footer from "./Footer";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";

// // Chain & Name Style imports from your NecklacesPage
// import Name1Img from "../assets/necklace/name1.png";
// import Name2Img from "../assets/necklace/name2.png";
// import Name3Img from "../assets/necklace/name3.png";
// import Name4Img from "../assets/necklace/name4.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// const NAME_STYLES = [
//   { name: "Style 1", img: Name1Img },
//   { name: "Style 2", img: Name2Img },
//   { name: "Style 3", img: Name3Img },
//   { name: "Style 4", img: Name4Img },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];

// export default function DesignerPage() {
//   const { state } = useLocation() || {};
//   const navigate = useNavigate();

//   const itemType = state?.itemType || "ring";

//   // --- Ring props ---
//   const ringProps = itemType === "ring" ? {
//     ringType: state?.ringType || "ring",
//     baseColor: state?.baseColor || "#C0C0C0",
//     diamondColors: state?.diamondColors || [],
//     engraving: state?.engraving || "",
//     thickness: state?.thickness || 1,
//     diamondCount: state?.diamondCount || 0,
//     selectedDiamond: state?.selectedDiamond || null,
//   } : {};

//   // --- Necklace state ---
//   const [selectedNameStyle, setSelectedNameStyle] = useState(
//     state?.selectedNameStyle || NAME_STYLES[0]
//   );
//   const [selectedChain, setSelectedChain] = useState(
//     state?.chainType || CHAINS[0]
//   );
//   const [selectedLength, setSelectedLength] = useState(
//     state?.selectedLength || 16
//   );
//   const [nameText, setNameText] = useState(state?.nameText || "");
//   const [metal, setMetal] = useState(state?.metal || "#C0C0C0");

//   // Designer state
//   const [designer, setDesigner] = useState("");
//   const designers = ["Alice", "Bob", "Charlie"];
//   const [currentStep, setCurrentStep] = useState(2);

//   // Hover cycling for necklaces if nameStyle not fixed
//   const [hoverIndex, setHoverIndex] = useState(0);
//   useEffect(() => {
//     if (itemType !== "necklace") return;
//     const interval = setInterval(() => {
//       setHoverIndex(prev => (prev + 1) % NAME_STYLES.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [itemType]);

//   // --- Navigate to checkout ---
//   const handleNext = () => {
//     if (!designer) return alert("Please choose a designer.");

//     navigate("/checkout", {
//       state: {
//         itemType,
//         designer,
//         ...(itemType === "ring"
//           ? ringProps
//           : {
//               itemType: "necklace",
//               selectedNameStyle,
//               chainType: selectedChain,
//               selectedLength,
//               nameText,
//               metal,
//             }),
//       },
//     });
//   };

//   return (
//     <div className="designer-page">
//       <h2>Choose Your Designer</h2>

//       {/* Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Item", "Choose Your Designer", "Checkout"].map((label, idx) => (
//           <div
//             key={idx}
//             className={`step-box ${currentStep === idx + 1 ? "active" : ""}`}
//             onClick={() => setCurrentStep(idx + 1)}
//           >
//             <div className="step-number">{idx + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="designer-content" style={{ display: "flex", gap: "20px" }}>
//         {/* LEFT VIEWER */}
//         <div className="designer-viewer" style={{ flex: 2 }}>
//           {itemType === "ring" ? (
//             <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
//               <ambientLight intensity={0.6} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} />
//               <RingModel {...ringProps} />
//               <Environment preset="city" background={false} />
//               <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//             </Canvas>
//           ) : (
//             <div className="necklace-compact-preview">
//               <img
//                 src={selectedNameStyle.fixed ? selectedNameStyle.img : NAME_STYLES[hoverIndex].img}
//                 alt={selectedNameStyle.name}
//                 style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
//               />
//               <p style={{ textAlign: "center", marginTop: "10px" }}>{nameText}</p>
//               <img
//                 src={selectedChain.img}
//                 alt={selectedChain.name}
//                 style={{
//                   width: "80%",
//                   maxHeight: "100px",
//                   objectFit: "contain",
//                   display: "block",
//                   margin: "10px auto",
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="tabs-sidebar" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
//           <h3>Select Designer</h3>
//           {designers.map(d => (
//             <div
//               key={d}
//               className={`designer-card ${designer === d ? "selected" : ""}`}
//               onClick={() => setDesigner(d)}
//               style={{
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 textAlign: "center",
//               }}
//             >
//               {d}
//             </div>
//           ))}
//           <button
//             className="checkout-btn"
//             onClick={handleNext}
//             style={{ marginTop: "20px", padding: "10px", borderRadius: "8px", cursor: "pointer" }}
//           >
//             Next: Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React ,{ useState, Suspense } from "react"; // ✅ Added Suspense
// import { useLocation, useNavigate } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import "../styles/DesignerPage.css";
// import Footer from "./Footer";
// import RingModel from "./RingModel";

// export default function DesignerPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const {
//     ringType,
//     baseColor,
//     diamondColors,
//     engraving,
//     thickness,
//     diamondCount,
//     selectedDiamond,
//   } = state || {};

//   const [designer, setDesigner] = useState("");
//   const designers = ["Alice", "Bob", "Charlie"];
//   const [currentStep, setCurrentStep] = useState(2);

//   const handleNext = () => {
//     if (!designer) return alert("Please choose a designer.");
//     navigate("/checkout", {
//       state: {
//         ringType,
//         baseColor,
//         diamondColors,
//         engraving,
//         thickness,
//         designer,
//         diamondCount,
//         selectedDiamond,
//       },
//     });
//   };

//   return (
//     <div className="ring-page full-page">
//       <h2>Choose Your Designer</h2>

//       {/* Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Ring", "Choose Your Designer", "Checkout"].map(
//           (label, index) => (
//             <div
//               key={index}
//               className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//               onClick={() => setCurrentStep(index + 1)}
//             >
//               <div className="step-number">{index + 1}</div>
//               <div className="step-labels">{label}</div>
//             </div>
//           )
//         )}
//       </div>

//       {/* Main content */}
//       <div className="ring-customizer">
//         {/* 3D Viewer */}
//         <div className="viewer">
//           <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[5, 5, 5]} intensity={1.5} />
//             <directionalLight position={[-5, 5, -5]} intensity={1} />
//             <Suspense fallback={null}>
//               <RingModel
//                 ringType={ringType}
//                 baseColor={baseColor}
//                 diamondColors={diamondColors}
//                 showDiamonds={diamondCount > 0}
//                 thickness={thickness}
//                 selectedDiamond={selectedDiamond}
//                 diamondCount={diamondCount}
//               />
//               <Environment preset="city" background={false} />
//             </Suspense>
//             <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//           </Canvas>
//         </div>

//         {/* Designer Options */}
//         <div className="tabs-sidebar">
//           {designers.map((d) => (
//             <div
//               key={d}
//               className={`designer-card ${designer === d ? "selected" : ""}`}
//               onClick={() => setDesigner(d)}
//             >
//               {d}
//             </div>
//           ))}
//           <button className="checkout-btn" onClick={handleNext}>
//             Next: Checkout
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
import React, { useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "../styles/DesignerPage.css";
import Footer from "./Footer";
import RingModel from "./RingModel";

export default function DesignerPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const itemType = state?.itemType || "ring";

  // RING DATA (may be undefined if necklace)
  const {
    ringType,
    baseColor,
    diamondColors,
    engraving,
    thickness,
    diamondCount,
    selectedDiamond,
  } = state || {};

  // NECKLACE DATA
  const {
    selectedNameStyle,
    chainType,
    selectedLength,
    nameText,
    metal,
  } = state || {};

  const [designer, setDesigner] = useState("");
  const designers = ["Alice", "Bob", "Charlie"];
  const [currentStep, setCurrentStep] = useState(2);

  const handleNext = () => {
    if (!designer) return alert("Please choose a designer.");

    navigate("/checkout", {
      state: {
        itemType,
        designer,

        ...(itemType === "ring" && {
          ringType,
          baseColor,
          diamondColors,
          engraving,
          thickness,
          diamondCount,
          selectedDiamond,
        }),

        ...(itemType === "necklace" && {
          selectedNameStyle,
          chainType,
          selectedLength,
          nameText,
          metal,
        }),
      },
    });
  };

  return (
    <div className="designer-page full-page">
      <h2>Choose Your Designer</h2>

      {/* Steps */}
      <div className="steps-horizontal">
        {["Customize", "Choose Designer", "Checkout"].map((label, index) => (
          <div
            key={index}
            className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-labels">{label}</div>
          </div>
        ))}
      </div>

      <div className="ring-customizer">
        {/* LEFT SIDE VIEWER — changes depending on itemType */}
        <div className="viewer">

          {/* ========== RING CASE ========== */}
          {itemType === "ring" && (
            <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
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
          )}

 {/* ========== NECKLACE CASE ========== */}
{itemType === "necklace" && (
  <div className="necklace-preview-wrapper">

    {/* Name Style Box */}
    <div className="hover-box">
      <img
        src={selectedNameStyle?.img}
        alt="Name Style"
        className="hover-img"
      />
      <p className="img-label">Name Style: {selectedNameStyle?.name}</p>
    </div>

    {/* Chain Box */}
    <div className="hover-box">
      <img
        src={chainType?.img}
        alt="Chain"
        className="hover-img"
      />
      <p className="img-label">Chain: {chainType?.name}</p>
    </div>

    {/* Details */}
    <div className="necklace-info">
      <p><b>Name:</b> {nameText || "—"}</p>
      <p><b>Metal:</b> {metal}</p>
      <p><b>Length:</b> {selectedLength}"</p>
    </div>

  </div>
)}


        </div>

        {/* RIGHT SIDE (Designer options) */}
        <div className="tabs-sidebar">
          {designers.map((d) => (
            <div
              key={d}
              className={`designer-card ${designer === d ? "selected" : ""}`}
              onClick={() => setDesigner(d)}
            >
              {d}
            </div>
          ))}

          <button className="checkout-btn" onClick={handleNext}>
            Next: Checkout
          </button>
        </div>
      </div>

     
    </div>
  );
}
