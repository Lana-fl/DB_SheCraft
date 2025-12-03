import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ringGLB from "../assets/ring/ring.glb";

const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];
const DIAMOND_MESHES = [
  { meshName: "ThinRing_ThinRing_0", defaultColor: "#ffffff" },
  { meshName: "ThinRing1_ThinRing1_0", defaultColor: "#ffffff" },
  { meshName: "ThinRing2_ThinRing2_0", defaultColor: "#ffffff" },
];

export default function RingViewer({ baseColor, diamondColors }) {
  const gltf = useGLTF(ringGLB);
  const sceneRef = useRef();
  const scaleRef = useRef(1);
  const posRef = useRef([0, 0, 0]);

  // Clone scene and auto-fit
  useEffect(() => {
    const scene = gltf.scene.clone();
    sceneRef.current = scene;

    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 2 / maxDim;
    scaleRef.current = scaleFactor;

    const center = bbox.getCenter(new THREE.Vector3());
    posRef.current = [-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor];
  }, [gltf]);

  // Update base/prongs
  useEffect(() => {
    if (!sceneRef.current) return;

    sceneRef.current.traverse(mesh => {
      if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: baseColor,
          roughness: 0.25,
          metalness: 1,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          reflectivity: 0.9,
        });
      }
    });
  }, [baseColor]);

  // Update diamonds
  useEffect(() => {
    if (!sceneRef.current) return;

    DIAMOND_MESHES.forEach((d, i) => {
      const mesh = sceneRef.current.getObjectByName(d.meshName);
      if (mesh) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[i] || d.defaultColor,
          roughness: 0,
          metalness: 0,
          transparent: true,
          opacity: 1,
          transmission: 1,
          ior: 2.4,
          reflectivity: 0.9,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
        });
      }
    });
  }, [diamondColors]);

  if (!sceneRef.current) return null;

  return (
    <primitive
      object={sceneRef.current}
      scale={[scaleRef.current, scaleRef.current, scaleRef.current]}
      position={posRef.current}
    />
  );
}
