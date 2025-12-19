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
