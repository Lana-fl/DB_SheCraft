import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bracelet.css";

/* ===== Preview image (use any existing bracelet image) ===== */
import BraceletPreview from "../assets/Bracelet/names.jpg";

/* ===== CONSTANTS ===== */
const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
  { name: "Satin", color: "#e8e1dc" }, // ✅ added
];

const LENGTHS = [15, 16, 17, 18, 19];

export default function BraceletsPage() {
  const navigate = useNavigate();

  /* ===== STEPS ===== */
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Customize Your Bracelet", "Choose Your Designer", "Checkout"];

  /* ===== STATE ===== */
  const [metal, setMetal] = useState(METALS[0].color);
  const [selectedLength, setSelectedLength] = useState(17);
  const [engraving, setEngraving] = useState("");

  /* ===== NAVIGATION ===== */
  const handleSubmit = () => {
    setCurrentStep(2);
    navigate("/designer", {
      state: {
        itemType: "bracelet",
        metal,
        length: selectedLength,
        engraving,
      },
    });
  };

  const onStepClick = (step) => {
    setCurrentStep(step);
    if (step === 2) handleSubmit();
    if (step === 3) navigate("/checkout");
  };

  return (
    <div className="br-page">
      <div className="br-container">
        {/* ===== HEADER ===== */}
        <header className="br-header">
          <h2>Customize Your Bracelet</h2>
          <p className="br-subtitle">
            Choose your finish, size, and personal touch.
          </p>
        </header>

        {/* ===== STEPS ===== */}
        <div className="steps-horizontal">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`step-box ${
                currentStep === index + 1 ? "active" : ""
              }`}
              onClick={() => onStepClick(index + 1)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-labels">{label}</div>
            </div>
          ))}
        </div>

        <div className="br-customizer">
          {/* ===== LEFT PREVIEW ===== */}
          <section className="br-preview">
            <div className="br-previewCard">
              <span className="br-badge">Live Preview</span>

              <div className="br-imageWrap">
                <img
                  src={BraceletPreview}
                  alt="Bracelet Preview"
                  className="br-mainImg"
                />
              </div>

              {engraving && (
                <div className="br-engraving">{engraving}</div>
              )}

              <div className="br-previewMeta">
                <div className="br-metaRow">
                  <span>Finish</span>
                  <strong>
                    {METALS.find((m) => m.color === metal)?.name}
                  </strong>
                </div>
                <div className="br-metaRow">
                  <span>Length</span>
                  <strong>{selectedLength}"</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RIGHT CONTROLS ===== */}
          <section className="br-controls">
            {/* Engraving */}
            <div className="br-section">
              <label className="br-label">Engraving (optional)</label>
              <input
                className="br-input"
                type="text"
                maxLength={10}
                placeholder="Max 10 characters"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
              />
            </div>

            {/* Metal / Satin */}
            <div className="br-section">
              <label className="br-label">Metal</label>
              <div className="br-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`br-metalBtn ${
                      metal === m.color ? "isActive" : ""
                    }`}
                    onClick={() => setMetal(m.color)}
                  >
                    <span
                      className="br-metalDot"
                      style={{ backgroundColor: m.color }}
                    />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="br-section">
              <label className="br-label">Length</label>
              <div className="br-lengths">
                {LENGTHS.map((len) => (
                  <button
                    key={len}
                    type="button"
                    className={`br-lengthBtn ${
                      selectedLength === len ? "isActive" : ""
                    }`}
                    onClick={() => setSelectedLength(len)}
                  >
                    {len}"
                  </button>
                ))}
              </div>
            </div>

            {/* Next */}
            <button className="br-next" type="button" onClick={handleSubmit}>
              Next to Designer
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
