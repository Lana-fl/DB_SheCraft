import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "../styles/checkout.css";
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
    selectedDiamond,
  } = state || {};

  // OTHER ITEMS
  const {
    nameText,
    metal,
    selectedLength,
    chainType,
    designer,
  } = state || {};

  const handleEditDesign = () => {
    switch (itemType) {
      case "ring":
        navigate("/ringspage", { state });
        break;
      case "necklace":
        navigate("/necklaces", { state });
        break;
      case "bracelet":
        navigate("/bracelets", { state });
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* PREVIEW — RING ONLY */}
        {itemType === "ring" && (
          <div className="checkout-preview">
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

              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        )}

        {/* ORDER SUMMARY */}
        <div className="checkout-details">
          <h3>Order Summary</h3>

          {itemType === "ring" ? (
            <>
              <p><strong>Ring Type:</strong> {ringType || "N/A"}</p>

              <p className="color-row">
                <strong>Base Color:</strong>
                {baseColor ? (
                  <>
                    <span
                      className="color-dot"
                      style={{ backgroundColor: baseColor }}
                    />
                    {baseColor}
                  </>
                ) : (
                  "N/A"
                )}
              </p>

              <p><strong>Thickness:</strong> {thickness || "N/A"}</p>
              <p><strong>Engraving:</strong> {engraving || "None"}</p>

              <p><strong>Diamond Type:</strong> {diamondType || "N/A"}</p>
              <p><strong>Diamond Count:</strong> {diamondCount || 0}</p>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {nameText || "N/A"}</p>
              <p><strong>Metal:</strong> {metal || "N/A"}</p>
              <p><strong>Length:</strong> {selectedLength ? `${selectedLength}"` : "N/A"}</p>
              <p><strong>Chain Type:</strong> {chainType?.name || chainType || "N/A"}</p>
            </>
          )}

          <p><strong>Designer:</strong> {designer || "N/A"}</p>

          <div className="checkout-actions">
            <button className="primary">Confirm and Pay</button>
            <button className="secondary" onClick={handleEditDesign}>
              Edit Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
