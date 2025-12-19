

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
