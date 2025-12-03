// import React, { useEffect, useRef, useMemo } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import ringGLB from "../assets/ring/ring.glb"; // import instead of string path

// export default function RingModel({ baseColor, diamondColors }) {
//   const gltf = useGLTF(ringGLB); // ✅ correct usage inside component
//   const sceneRef = useRef();

//   // Create base and diamond materials once
//   const baseMaterial = useMemo(
//     () =>
//       new THREE.MeshPhysicalMaterial({
//         roughness: 0.2,
//         metalness: 1,
//         clearcoat: 1,
//         clearcoatRoughness: 0.05,
//         reflectivity: 0.9,
//         color: baseColor,
//       }),
//     []
//   );

//   const diamondMaterials = useMemo(
//     () =>
//       diamondColors.map(
//         (d) =>
//           new THREE.MeshPhysicalMaterial({
//             roughness: 0,
//             metalness: 0,
//             transparent: true,
//             opacity: 1,
//             transmission: 1,
//             ior: 2.4,
//             reflectivity: 0.9,
//             clearcoat: 1,
//             clearcoatRoughness: 0.05,
//             color: d.color,
//           })
//       ),
//     []
//   );

//   // Clone GLB scene
//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;

//     // Assign base material
//     const baseMesh = scene.getObjectByName("ThinRing3");
//     if (baseMesh) baseMesh.material = baseMaterial;

//     // Assign diamond materials
//     diamondColors.forEach((d, i) => {
//       const mesh = scene.getObjectByName(d.meshName);
//       if (mesh) mesh.material = diamondMaterials[i];
//     });
//   }, [gltf, baseMaterial, diamondMaterials, diamondColors]);

//   // Update colors dynamically
//   useEffect(() => {
//     if (baseMaterial) baseMaterial.color.set(baseColor);
//   }, [baseColor, baseMaterial]);

//   useEffect(() => {
//     diamondColors.forEach((d, i) => {
//       if (diamondMaterials[i]) diamondMaterials[i].color.set(d.color);
//     });
//   }, [diamondColors, diamondMaterials]);

//   return sceneRef.current ? <primitive object={sceneRef.current} /> : null;
// }
// components/RingModel.jsx
// components/RingModel.jsx
// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { useGLTF } from "@react-three/drei";
// import ringGLB from "../assets/ring/ring.glb";

// const DIAMOND_MESHES = [
//   { name: "Middle", mesh: "ThinRing_ThinRing_0" },
//   { name: "Side1", mesh: "ThinRing1_ThinRing1_0" },
//   { name: "Side2", mesh: "ThinRing2_ThinRing2_0" },
// ];

// const BASE_MESH = "ThinRing3_ThinRing3_0";

// export default function RingModel({
//   baseColor,
//   diamondColors,
//   diamondCount,
//   engravingText,
// }) {
//   const { scene } = useGLTF(ringGLB);
//   const modelRef = useRef();
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const clone = scene.clone(true);
//     modelRef.current = clone;

//     const box = new THREE.Box3().setFromObject(clone);
//     const size = box.getSize(new THREE.Vector3());
//     const max = Math.max(size.x, size.y, size.z);
//     setScale(2 / max);
//   }, [scene]);

//   // Base update
//   useEffect(() => {
//     if (!modelRef.current) return;
//     modelRef.current.traverse((mesh) => {
//       if (mesh.name === BASE_MESH) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: 0.25,
//           metalness: 1,
//           clearcoat: 1,
//         });
//       }
//     });
//   }, [baseColor]);

//   // Diamonds update
//   useEffect(() => {
//     if (!modelRef.current) return;

//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = modelRef.current.getObjectByName(d.mesh);
//       if (!mesh) return;

//       // visibility
//       mesh.visible =
//         diamondCount === 3 ||
//         (diamondCount === 1 && i === 0) ||
//         (diamondCount === 2 && i !== 2);

//       // color
//       mesh.material = new THREE.MeshPhysicalMaterial({
//         color: diamondColors[i] || "#ffffff",
//         roughness: 0,
//         metalness: 0,
//         transmission: 1,
//         ior: 2.4,
//         clearcoat: 1,
//       });
//     });
//   }, [diamondColors, diamondCount]);

//   // Engraving (optional: can add 3D text later)
//   useEffect(() => {
//     if (!modelRef.current || !engravingText) return;
//   }, [engravingText]);

//   if (!modelRef.current) return null;

//   return (
//     <primitive
//       object={modelRef.current}
//       scale={[scale, scale, scale]}
//       position={[0, -0.5, 0]}
//     />
//   );
// }
// RingBuilderPage.jsx
import React, { useState } from "react";
import RingViewer from "./RingViewer";
import BottomCarousel from "./BottomCarousel";
import { useNavigate } from "react-router-dom";
import "../styles/ring.css";

export default function RingBuilderPage() {
  const navigate = useNavigate();

  // Core state
  const [baseMetal, setBaseMetal] = useState("gold"); // "silver" | "gold" | "rosegold"
  const METAL_COLORS = { silver: "#C0C0C0", gold: "#FFD700", rosegold: "#b76e79" };

  const [thickness, setThickness] = useState(5); // 1..10
  const [diamondCount, setDiamondCount] = useState(1); // 1..3
  const [purity, setPurity] = useState("natural"); // natural | lab
  // diamondColors holds 3 values; natural uses only selected presets
  const [diamondColors, setDiamondColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
  const [engraving, setEngraving] = useState("");
  const [weight, setWeight] = useState(2);

  // carousel wizard step index (0..4)
  const [step, setStep] = useState(0);

  // Natural diamond preset colors (3 "pure" choices)
  const NATURAL_PRESETS = [
    { name: "D (pure)", color: "#ffffff" },     // pure white
    { name: "E", color: "#f0f6ff" },            // near white cool
    { name: "F", color: "#fff7f2" },            // warm white
  ];

  // helper to set one diamond color
  const setDiamondColorAt = (idx, color) => {
    setDiamondColors((prev) => prev.map((c, i) => (i === idx ? color : c)));
  };

  const goCheckout = () => {
    navigate("/checkout", {
      state: {
        baseMetal,
        metalColorHex: METAL_COLORS[baseMetal],
        thickness,
        diamondCount,
        purity,
        diamondColors: diamondColors.slice(0, diamondCount),
        engraving,
        weight,
      },
    });
  };

  return (
    <div className="rb-page">
      {/* centered 3D viewer */}
      <div className="rb-content">
        <div className="viewer-wrap">
          <RingViewer
            baseColor={METAL_COLORS[baseMetal]}
            diamondColors={diamondColors.slice(0, diamondCount)}
            diamondCount={diamondCount}
            engravingText={engraving}
            thickness={thickness}
          />
        </div>

        {/* right-side floating summary quick info (optional small panel) */}
        <aside className="quick-info">
          <div className="mini-card">
            <h4>Quick Info</h4>
            <p><b>Metal:</b> {baseMetal}</p>
            <p><b>Thickness:</b> {thickness}</p>
            <p><b>Diamonds:</b> {diamondCount} ({purity})</p>
          </div>
        </aside>
      </div>

      {/* Bottom carousel wizard bar */}
      <BottomCarousel
        step={step}
        setStep={setStep}
        // pass all state + setters so the carousel can render the step content
        baseMetal={baseMetal}
        setBaseMetal={setBaseMetal}
        METAL_COLORS={METAL_COLORS}
        thickness={thickness}
        setThickness={setThickness}
        diamondCount={diamondCount}
        setDiamondCount={setDiamondCount}
        purity={purity}
        setPurity={setPurity}
        diamondColors={diamondColors}
        setDiamondColorAt={setDiamondColorAt}
        NATURAL_PRESETS={NATURAL_PRESETS}
        engraving={engraving}
        setEngraving={setEngraving}
        weight={weight}
        setWeight={setWeight}
        onCheckout={goCheckout}
      />
    </div>
  );
}



