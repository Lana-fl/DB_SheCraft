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
// import { useNavigate } from "react-router-dom";

// export default function RingSelection() {
//   const navigate = useNavigate();

//   return (
//     <div className="ring-selection">
//       <h1>Choose Your Ring Style</h1>

//       <div className="ring-grid">
//         <div onClick={() => navigate("/customize/ring")}>
//           <img src="../assets/ring/ring.glb" />
//           <p>Classic Ring</p>
//         </div>

//         <div onClick={() => navigate("/customize/ring1")}>
//           <img src="../assets/ring/ring.glb" />
//           <p>Luxury Ring</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import "../styles/ringselection.css";
import Footer from "./Footer";

import ringGLB from "../assets/ring/ring.glb";
import ring1GLB from "../assets/ring/ring1.glb";
import ring2GLB from "../assets/ring/ring2.glb";

// Add Ring 2 here
const rings = [
  { id: 1, type: "ring", model: ringGLB, label: "Aurora Band" },
  { id: 2, type: "ring1", model: ring1GLB, label: "Celeste Solitaire" },
  { id: 3, type: "ring2", model: ring2GLB, label: "Tennis Horizon" },
];


function RingThumbnail({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState([0, 0, 0]);

  // Fit model in canvas dynamically
  useEffect(() => {
    if (!scene) return;
    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const scaleFactor = 2.0 / maxDim;
    setScale(scaleFactor);

    setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });

  return <primitive ref={meshRef} object={scene} scale={[scale, scale, scale]} position={position} />;
}

export default function RingSelection() {
  const navigate = useNavigate();

  const handleSelectRing = (ringType) => {
    // Pass ringType to RingsPage
    navigate("/ringspage", { state: { ringType } });
  };

   return (
    <div className="page-wrapper">
      <div className="ring-selection-page full-page">
        <h1 className="ring-title">Choose Your Ring</h1>
        <p className="ring-subtitle">
          Personalize your ring with the style and stones you like.
        </p>

        <div className="rings-grid">
          {rings.map((ring) => (
            <div
              key={ring.id}
              className="ring-card"
              onClick={() => handleSelectRing(ring.type)}
            >
              <div className="ring-canvas-container">
                <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <Suspense fallback={null}>
                    <RingThumbnail modelPath={ring.model} />
                  </Suspense>
                </Canvas>
              </div>
              <p className="ring-label">{ring.label}</p>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}
