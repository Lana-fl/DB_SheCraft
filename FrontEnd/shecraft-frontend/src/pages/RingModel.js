import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import ringGLB from "../assets/ring/ring.glb";
import ring1GLB from "../assets/ring/ring1.glb";
import ring2GLB from "../assets/ring/ring2.glb";
import cutGLB from "../assets/ring/cuts.glb";

export const RING_MESHES = {
  ring: {
    base: ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"],
    diamonds: ["ThinRing_ThinRing_0"], // middle
    sides: ["ThinRing1_ThinRing1_0", "ThinRing2_ThinRing2_0"],
  },
  ring1: {
    base: ["Object_2", "Object_3"],
    diamonds: ["Diamond_Round"], // middle
    sides: [
      "Diamond_Round_2",
      "Diamond_Round_3",
      "Diamond_Round_4",
      "Diamond_Round_5",
      "Diamond_Round_6",
      "Diamond_Round_7",
      "Diamond_Round_8",
      "Diamond_Round_9",
    ],
  },
  ring2: {
    base: ["alliance"], // Ring2 base = Alliance
    diamonds: [], // no middle diamond
    sides: Array.from({ length: 44 }, (_, i) => `dia${String(i + 1).padStart(3, "0")}`),
  },
};

export default function RingModel({
  ringType,
  baseColor = "#ffffff",
  diamondColors = [],
  showDiamonds = true,
  // thickness = 1,
  selectedDiamond = -1,
  diamondCount = 2,
  diamondCut = "Brilliant", 
}) {
  const { scene } = useGLTF(
    ringType === "ring"
      ? ringGLB
      : ringType === "ring1"
      ? ring1GLB
      : ring2GLB
  );

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState([0, 0, 0]);

  // ===== Center & Scale =====
  useEffect(() => {
    if (!scene) return;

    let scaleFactor = 1;
    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    // Normalize Ring2 scale to match Ring and Ring1
    if (ringType === "ring2") {
      const referenceScale = 2; // same as others
      const maxDim = Math.max(size.x, size.y, size.z);
      scaleFactor = referenceScale / maxDim;
    } else {
      const maxDim = Math.max(size.x, size.y, size.z);
      scaleFactor = 2 / maxDim;
    }

    setScale(scaleFactor);
    setPosition([
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor,
    ]);
  }, [scene, ringType]);

  // ===== Materials & Visibility =====
  useEffect(() => {
    if (!scene) return;

    // Base
    RING_MESHES[ringType].base.forEach((name) => {
      const mesh = scene.getObjectByName(name);
      if (!mesh) return;
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        roughness: 0.3,
        metalness: 1,
        clearcoat: 1,
      });
      // thickness is informational only
    });

    // Middle Diamond
    if (RING_MESHES[ringType].diamonds.length > 0) {
      const middleMesh = scene.getObjectByName(RING_MESHES[ringType].diamonds[0]);
      if (middleMesh) {
        middleMesh.visible = showDiamonds && diamondCount >= 1;
        middleMesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[0]?.color || "#ffffff",
          roughness: 0,
          metalness: 0,
          transmission: 1,
          ior: 2.4,
          transparent: true,
        });
        middleMesh.material.emissive.set(selectedDiamond === 0 ? "#ffff00" : "#000000");
        middleMesh.material.emissiveIntensity = selectedDiamond === 0 ? 0.5 : 0;
      }
    }
    



    // Side Diamonds
    const sideMeshes = RING_MESHES[ringType].sides || [];

    if (ringType === "ring") {
      sideMeshes.forEach((name, index) => {
        const mesh = scene.getObjectByName(name);
        if (!mesh) return;
        let visible = false;
        if (diamondCount === 2 && index === 0) visible = true;
        if (diamondCount >= 3 && index <= 1) visible = true;
        mesh.visible = showDiamonds && visible;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[index + 1]?.color || "#ffffff",
          roughness: 0,
          metalness: 0,
          transmission: 1,
          ior: 2.4,
          transparent: true,
        });
        mesh.material.emissive.set(selectedDiamond === index + 1 ? "#ffff00" : "#000000");
        mesh.material.emissiveIntensity = selectedDiamond === index + 1 ? 0.5 : 0;
      });
    }

    if (ringType === "ring1") {
      sideMeshes.forEach((name) => {
        const mesh = scene.getObjectByName(name);
        if (!mesh) return;
        mesh.visible = showDiamonds && diamondCount === 2;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[1]?.color || "#ffffff",
          roughness: 0,
          metalness: 0,
          transmission: 1,
          ior: 2.4,
          transparent: true,
        });
        mesh.material.emissive.set(selectedDiamond === 1 ? "#ffff00" : "#000000");
        mesh.material.emissiveIntensity = selectedDiamond === 1 ? 0.5 : 0;
      });
    }

    if (ringType === "ring2") {
      // All side diamonds same color
      sideMeshes.forEach((name) => {
        const mesh = scene.getObjectByName(name);
        if (!mesh) return;
        mesh.visible = showDiamonds && diamondCount > 0;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[0]?.color || "#ffffff",
          roughness: 0,
          metalness: 0,
          transmission: 1,
          ior: 2.4,
          transparent: true,
        });
        mesh.material.emissive.set(selectedDiamond === 0 ? "#ffff00" : "#000000");
        mesh.material.emissiveIntensity = selectedDiamond === 0 ? 0.5 : 0;
      });
    }
  }, [scene, baseColor, diamondColors, showDiamonds, selectedDiamond, diamondCount, ringType]);

  useFrame(() => {
    if (scene) scene.rotation.y += 0.005;
  });

  if (!scene) return null;
  return <primitive object={scene} scale={[scale, scale, scale]} position={position} />;
}
