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
