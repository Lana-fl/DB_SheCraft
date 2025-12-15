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

//BEFORE CHANGE COLOR
// import React, { useRef, useEffect, useState, Suspense,useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {  useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { useNavigate } from "react-router-dom";
// import "../styles/ringselection.css";
// import { RING_MESHES } from "./RingModel";

// import ringGLB from "../assets/ring/ring.glb";
// import ring1GLB from "../assets/ring/ring1.glb";
// import ring2GLB from "../assets/ring/ring2.glb";

// // Add Ring 2 here
// const rings = [
//   { id: 1, type: "ring",  model: ringGLB,  label: "Aurora Band",       metalColor: "#FFD700" },   // Gold
//   { id: 2, type: "ring1", model: ring1GLB, label: "Celeste Solitaire", metalColor: "#E8A3B7" },   // RoseGold
//   { id: 3, type: "ring2", model: ring2GLB, label: "Tennis Horizon",    metalColor: "#C0C0C0" },   // Silver
// ];


// // function RingThumbnail({ modelPath }) {
// //   const { scene } = useGLTF(modelPath);
// //   const meshRef = useRef();
// //   const [scale, setScale] = useState(1);
// //   const [position, setPosition] = useState([0, 0, 0]);

// //   // Fit model in canvas dynamically
// //   useEffect(() => {
// //     if (!scene) return;
// //     const bbox = new THREE.Box3().setFromObject(scene);
// //     const size = bbox.getSize(new THREE.Vector3());
// //     const center = bbox.getCenter(new THREE.Vector3());
// //     const maxDim = Math.max(size.x, size.y, size.z);

// //     const scaleFactor = 2.0 / maxDim;
// //     setScale(scaleFactor);

// //     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
// //   }, [scene]);

// //   useFrame(() => {
// //     if (meshRef.current) meshRef.current.rotation.y += 0.005;
// //   });

// //   return <primitive ref={meshRef} object={scene} scale={[scale, scale, scale]} position={position} />;
// // }
// // function RingThumbnail({ modelPath, metalColor }) {
// //   const { scene } = useGLTF(modelPath);
// //   const meshRef = useRef();
// //   const [scale, setScale] = useState(1);
// //   const [position, setPosition] = useState([0, 0, 0]);

// //   // 1) Re-color the ring once the scene + metalColor are ready
// //   useEffect(() => {
// //     if (!scene) return;

// //     scene.traverse((child) => {
// //       if (child.isMesh && child.material) {
// //         // clone material so we don't mutate shared cache
// //         child.material = child.material.clone();

// //         if (child.material.color) {
// //           child.material.color.set(metalColor);
// //         }

// //         if ("metalness" in child.material) {
// //           child.material.metalness = 0.9;
// //         }
// //         if ("roughness" in child.material) {
// //           child.material.roughness = 0.25;
// //         }
// //       }
// //     });
// //   }, [scene, metalColor]);

// //   // 2) Fit model in the canvas (same as your old working code)
// //   useEffect(() => {
// //     if (!scene) return;

// //     const bbox = new THREE.Box3().setFromObject(scene);
// //     const size = bbox.getSize(new THREE.Vector3());
// //     const center = bbox.getCenter(new THREE.Vector3());
// //     const maxDim = Math.max(size.x, size.y, size.z) || 1;

// //     const scaleFactor = 2.0 / maxDim;
// //     setScale(scaleFactor);

// //     setPosition([
// //       -center.x * scaleFactor,
// //       -center.y * scaleFactor,
// //       -center.z * scaleFactor,
// //     ]);
// //   }, [scene]);

// //   // 3) Slow rotation
// //   useFrame(() => {
// //     if (meshRef.current) meshRef.current.rotation.y += 0.005;
// //   });

// //   return (
// //     <primitive
// //       ref={meshRef}
// //       object={scene}
// //       scale={[scale, scale, scale]}
// //       position={position}
// //     />
// //   );
// // }
// function RingThumbnail({ ringType, modelPath, metalColor }) {
//   const { scene: gltfScene } = useGLTF(modelPath);

//   const groupRef = useRef();

//   // Clone so each card is isolated
//   const scene = useMemo(() => {
//     if (!gltfScene) return null;
//     return gltfScene.clone(true);
//   }, [gltfScene]);

//   const [scale, setScale] = useState(1);
//   const [offset, setOffset] = useState([0, 0, 0]);

//   const findByName = (root, name) => {
//     let found = null;
//     root.traverse((o) => {
//       if (o.name === name) found = o;
//     });
//     return found;
//   };

//   useEffect(() => {
//     if (!scene) return;

//     // === Fit + center (same concept as your old working RingThumbnail) ===
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const center = bbox.getCenter(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z) || 1;

//     const s = 2.0 / maxDim;
//     setScale(s);

//     // This offset recenters the model at (0,0,0)
//     setOffset([-center.x * s, -center.y * s, -center.z * s]);

//     // === Materials: metal only for base meshes ===
//     const baseNames = RING_MESHES[ringType]?.base || [];
//     baseNames.forEach((name) => {
//       const mesh = findByName(scene, name);
//       if (!mesh || !mesh.isMesh) return;

//       mesh.material = new THREE.MeshPhysicalMaterial({
//         color: metalColor,
//         roughness: 0.25,
//         metalness: 1,
//         clearcoat: 1,
//         clearcoatRoughness: 0.15,
//       });
//     });

//     // === Materials: diamond for diamond meshes ===
//     const diamondMat = new THREE.MeshPhysicalMaterial({
//       color: "#ffffff",
//       roughness: 0,
//       metalness: 0,
//       transmission: 1,
//       ior: 2.4,
//       transparent: true,
//       thickness: 1,
//     });

//     const diamondNames = [
//       ...(RING_MESHES[ringType]?.diamonds || []),
//       ...(RING_MESHES[ringType]?.sides || []),
//     ];

//     diamondNames.forEach((name) => {
//       const mesh = findByName(scene, name);
//       if (!mesh || !mesh.isMesh) return;
//       mesh.material = diamondMat.clone();
//       mesh.visible = true;
//     });
//   }, [scene, ringType, metalColor]);

//   // Rotate the wrapper group so rotation happens around the centered origin
//   useFrame(() => {
//     if (groupRef.current) groupRef.current.rotation.y += 0.005;
//   });

//   if (!scene) return null;

//   return (
//     <group ref={groupRef}>
//       <primitive
//         object={scene}
//         scale={[scale, scale, scale]}
//         position={offset}
//       />
//     </group>
//   );
// }

// // export default function RingSelection() {
// //   const navigate = useNavigate();

// //   const handleSelectRing = (ringType) => {
// //     // Pass ringType to RingsPage
// //     navigate("/ringspage", { state: { ringType } });
// //   };

// //    return (
// //     <div className="page-wrapper">
// //       <div className="ring-selection-page full-page">
// //         <h1 className="ring-title">Choose Your Ring</h1>
// //         <p className="ring-subtitle">
// //           Personalize your ring with the style and stones you like.
// //         </p>

// //         <div className="rings-grid">
// //           {/* {rings.map((ring) => (
// //             <div
// //               key={ring.id}
// //               className="ring-card"
// //               onClick={() => handleSelectRing(ring.type)}
// //             >
// //               <div className="ring-canvas-container">
// //                 <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
// //                   <ambientLight intensity={0.6} />
// //                   <directionalLight position={[0, 5, 5]} intensity={1} />
// //                   <Suspense fallback={null}>
// //                     <RingThumbnail modelPath={ring.model} metalColor={ring.metalColor} />
// //                   </Suspense>
// //                 </Canvas>
// //               </div>
// //               <p className="ring-label">{ring.label}</p>
// //             </div>
// //           ))} */}
// //         <div className="rings-grid">
// //   {rings.map((ring) => (
// //     <div
// //       key={ring.id}
// //       className="ring-card"
// //       onClick={() => handleSelectRing(ring.type)}
// //     >
// //       <div className="ring-canvas-container">
// //         <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
// //           <ambientLight intensity={0.6} />
// //           <directionalLight position={[0, 5, 5]} intensity={1} />
// //           <Suspense fallback={null}>
// //             <RingThumbnail
// //               modelPath={ring.model}
// //               metalColor={ring.metalColor}
// //             />
// //           </Suspense>
// //         </Canvas>
// //       </div>
// //       <p className="ring-label">{ring.label}</p>
// //     </div>
// //   ))}
// // </div>

// //         </div>
// //       </div>

     
// //     </div>
// //   );
// // }
// // Optional: preload models so they appear faster

// export default function RingSelection() {
//   const navigate = useNavigate();

//   const handleSelectRing = (ringType) => {
//     navigate("/ringspage", { state: { ringType } });
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="ring-selection-page full-page">
//         <h1 className="ring-title">Choose Your Ring</h1>
//         <p className="ring-subtitle">
//           Personalize your ring with the style and stones you like.
//         </p>

//         <div className="rings-grid">
//           {rings.map((ring) => (
//             <div
//               key={ring.id}
//               className="ring-card"
//               onClick={() => handleSelectRing(ring.type)}
//             >
//               <div className="ring-canvas-container">
//                 <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
//                   <ambientLight intensity={0.6} />
//                   <directionalLight position={[0, 5, 5]} intensity={1} />
//                   <Suspense fallback={null}>
//                     <RingThumbnail
//                       ringType={ring.type}
//                       modelPath={ring.model}
//                       metalColor={ring.metalColor}
//                     />
//                   </Suspense>
//                 </Canvas>
//               </div>

//               <p className="ring-label">{ring.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// useGLTF.preload(ringGLB);
// useGLTF.preload(ring1GLB);
// useGLTF.preload(ring2GLB);

import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import "../styles/ringselection.css";
import { RING_MESHES } from "./RingModel";

import ringGLB from "../assets/ring/ring.glb";
import ring1GLB from "../assets/ring/ring1.glb";
import ring2GLB from "../assets/ring/ring2.glb";

const rings = [
  { id: 1, type: "ring", model: ringGLB, label: "Aurora Band", metalColor: "#FFD700" }, // Gold
  { id: 2, type: "ring1", model: ring1GLB, label: "Celeste Solitaire", metalColor: "#E8A3B7" }, // RoseGold
  { id: 3, type: "ring2", model: ring2GLB, label: "Tennis Horizon", metalColor: "#C0C0C0" }, // Silver
];

function RingThumbnail({ ringType, modelPath, metalColor }) {
  const { scene: gltfScene } = useGLTF(modelPath);

  const groupRef = useRef(); // rotation
  const modelRef = useRef(); // primitive holder

  const scene = useMemo(() => {
    if (!gltfScene) return null;
    const cloned = gltfScene.clone(true);
    // clone materials so each thumbnail is isolated
    cloned.traverse((o) => {
      if (o.isMesh && o.material) o.material = o.material.clone();
    });
    return cloned;
  }, [gltfScene]);

  const [scale, setScale] = useState(1);

  const findByName = (root, name) => {
    let found = null;
    root.traverse((o) => {
      if (o.name === name) found = o;
    });
    return found;
  };

  useEffect(() => {
    if (!scene || !modelRef.current) return;

    // --- Stable centering via pivot technique ---
    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    const s = 2.0 / maxDim;
    setScale(s);

    // Move the model so its center sits at origin (before scaling)
    modelRef.current.position.set(-center.x, -center.y, -center.z);

    // --- METAL only for base meshes ---
    const baseNames = RING_MESHES[ringType]?.base || [];
    baseNames.forEach((name) => {
      const mesh = findByName(scene, name);
      if (!mesh || !mesh.isMesh) return;

      mesh.material = new THREE.MeshPhysicalMaterial({
        color: metalColor,
        metalness: 1,
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      });
    });

    // --- DIAMONDS material ---
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0,
      roughness: 0,
      transmission: 1,
      ior: 2.4,
      transparent: true,
      thickness: 1,
    });

    const diamondNames = [
      ...(RING_MESHES[ringType]?.diamonds || []),
      ...(RING_MESHES[ringType]?.sides || []),
    ];

    diamondNames.forEach((name) => {
      const mesh = findByName(scene, name);
      if (!mesh || !mesh.isMesh) return;
      mesh.material = diamondMat.clone();
      mesh.visible = true;
    });
  }, [scene, ringType, metalColor]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.005;
  });

  if (!scene) return null;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive ref={modelRef} object={scene} />
    </group>
  );
}

export default function RingSelection() {
  const navigate = useNavigate();

  const handleSelectRing = (ringType) => {
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
                  {/* Environment fixes “black metal” */}
                  <Environment preset="studio" />

                  {/* Stronger lights for thumbnails */}
                  <ambientLight intensity={1.0} />
                  <directionalLight position={[6, 8, 6]} intensity={2.0} />
                  <directionalLight position={[-6, 3, -6]} intensity={1.2} />

                  <Suspense fallback={null}>
                    <RingThumbnail
                      ringType={ring.type}
                      modelPath={ring.model}
                      metalColor={ring.metalColor}
                    />
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

// Preload for smoother thumbnails
useGLTF.preload(ringGLB);
useGLTF.preload(ring1GLB);
useGLTF.preload(ring2GLB);
