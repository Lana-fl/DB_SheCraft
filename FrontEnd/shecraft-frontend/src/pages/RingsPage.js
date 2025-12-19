import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";

import RingModel from "./RingModel";
import "../styles/ring.css";


import roundCut from "../assets/Cuts/round.jpg";
import ovalCut from "../assets/Cuts/oval.jpeg";
import pearCut from "../assets/Cuts/pear.jpeg";
import princessCut from "../assets/Cuts/princess.jpeg";


import diamondImg from "../assets/gems/diamond.jpg";
import emeraldImg from "../assets/gems/emerald.jpg";
import rubyImg from "../assets/gems/ruby.jpg";
import sapphireImg from "../assets/gems/saphire.jpg"; // keep filename spelling
import labgrownImg from "../assets/gems/labgrowngem.jpg";


import ringSizeImg from "../assets/ring/ringsize.png";


const BASE_OPTIONS = [
  { name: "Silver", color: "#C0C0C0", price: 100 },
  { name: "Gold", color: "#FFD700", price: 200 },
  { name: "Rose Gold", color: "#B76E79", price: 220 },
  { name: "14K Gold", color: "#E6BE8A", price: 240 },
  { name: "14K Silver", color: "#D3D3D3", price: 150 },
];

const CUTS = [
  { name: "Round", img: roundCut },
  { name: "Princess", img: princessCut },
  { name: "Oval", img: ovalCut },
  { name: "Pear", img: pearCut },
];


const REAL_GEMS = [
  { name: "Diamond", color: "#ffffff", img: diamondImg },
  { name: "Ruby", color: "#E0115F", img: rubyImg },
  { name: "Emerald", color: "#50C878", img: emeraldImg },
  { name: "Sapphire", color: "#0F52BA", img: sapphireImg },
];


const LAB_COLORS = [
  { name: "White", color: "#ffffff" },
  { name: "Yellow", color: "#f5d547" },
  { name: "Pink", color: "#f19acb" },
  { name: "Lavender", color: "#9b7fd1" },
  { name: "Ice", color: "#cfe8ff" },
  { name: "Blue Green", color: "#43c6c9" },
  { name: "Green", color: "#4f9f6b" },
  { name: "Orange", color: "#f59b2f" },
  { name: "Peach", color: "#f4b59b" },
  { name: "Black", color: "#111111" },
];


const DIAMETERS_MM = [
  14.0, 14.4, 14.8, 15.2, 15.6,
  16.0, 16.45, 16.9, 17.3, 17.7, 18.2,
  18.6, 19.0, 19.4, 19.8, 20.2, 20.6,
  21.0, 21.4, 21.8, 22.2, 22.6,
];

function maxDiamondsFor(ringType) {
  if (ringType === "ring1") return 2;
  if (ringType === "ring2") return 1; // TENNIS RING: locked
  return 3;
}


function requiredStoneCount(ringType, diamondCount) {
  if (diamondCount <= 0) return 0;
  if (ringType === "ring2") return 1;
  return diamondCount;
}

export default function RingsPage() {
  const { state } = useLocation();
  const { ringType } = state || { ringType: "ring" };
  const navigate = useNavigate();

 
  const baseOptions = BASE_OPTIONS;

  const [baseColor, setBaseColor] = useState(baseOptions[0].color);
  const [metalPicked, setMetalPicked] = useState(false);

 
  const [diamondCount, setDiamondCount] = useState(ringType === "ring2" ? 1 : 0);

  // color arrays (ring2 uses index 0 as control color)
  const [diamondColors, setDiamondColors] = useState(
    ringType === "ring1"
      ? [{ color: "" }, { color: "" }]
      : ringType === "ring2"
      ? [{ color: "" }]
      : [{ color: "" }, { color: "" }, { color: "" }]
  );

  const [diamondType, setDiamondType] = useState("lab"); // lab | real
  const [selectedDiamond, setSelectedDiamond] = useState(null);

  const [ringDiameter, setRingDiameter] = useState(""); // required
  const [sizePicked, setSizePicked] = useState(false);

  const [diamondCut, setDiamondCut] = useState(""); // required for ring/ring1 when stones>0
  const [engraving, setEngraving] = useState("");
  const [price, setPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  // right tabs
  const [rightTab, setRightTab] = useState("size"); // "size" | "stones"

  const maxDiamonds = useMemo(() => maxDiamondsFor(ringType), [ringType]);

  // LOCK ring2 to 1 always
  useEffect(() => {
    if (ringType === "ring2" && diamondCount !== 1) setDiamondCount(1);
  }, [ringType, diamondCount]);

  // also reset selected diamond if count changes
  useEffect(() => {
    if (selectedDiamond !== null && selectedDiamond >= diamondCount) {
      setSelectedDiamond(null);
    }
  }, [diamondCount, selectedDiamond]);

  const toggleDiamond = (index) => {
    setSelectedDiamond((prev) => (prev === index ? null : index));
  };

  const setStoneColor = (index, color) => {
    setDiamondColors((prev) => {
      const next = [...prev];
      next[index] = { color };
      return next;
    });
  };

  const pickMetal = (color) => {
    setBaseColor(color);
    setMetalPicked(true);
  };

  const pickSize = (val) => {
    setRingDiameter(val);
    setSizePicked(true);
  };

  /* pricing */
  useEffect(() => {
    let total = baseOptions.find((b) => b.color === baseColor)?.price || 100;

    if (diamondCount > 0) total += 300;
    if (diamondCount > 1) total += 250;
    if (diamondCount > 2) total += 250;
    if (engraving.trim()) total += 50;

    setPrice(total);
  }, [baseColor, diamondCount, diamondColors, engraving, ringDiameter, diamondType, diamondCut, baseOptions]);

  /* validation */
  const reqCount = requiredStoneCount(ringType, diamondCount);

  const stonesComplete = useMemo(() => {
    if (reqCount === 0) return true;

    if (ringType === "ring2") return !!diamondColors[0]?.color;

    for (let i = 0; i < reqCount; i++) {
      if (!diamondColors[i]?.color) return false;
    }
    return true;
  }, [reqCount, ringType, diamondColors]);

  const cutRequired = ringType !== "ring2" && diamondCount > 0;
  const cutComplete = !cutRequired || !!diamondCut;

  const canNext = metalPicked && sizePicked && stonesComplete && cutComplete;

  return (
    <div className="ring-page full-page">
      <h2>{ringType === "ring1" ? "Customize Ring 1" : ringType === "ring2" ? "Customize Tennis Ring" : "Customize Your Ring"}</h2>

      {/* steps */}
      {/* <div className="steps-horizontal">
        {["Customize Your Ring", "Choose Your Designer", "Checkout"].map((label, index) => (
          <div
            key={label}
            className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-labels">{label}</div>
          </div>
        ))}
      </div> */}

      <div className="ring-customizer">
        {/* viewer */}
        <div className="viewer">
          <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }} shadows>
            <Environment preset="studio" background={false} />
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 6, 6]} intensity={1.6} />
            <directionalLight position={[-4, 3, -4]} intensity={1.2} />

            <Suspense fallback={null}>
              <RingModel
                ringType={ringType}
                baseColor={baseColor}
                diamondColors={diamondColors}
                showDiamonds={diamondCount > 0}
                selectedDiamond={selectedDiamond}
                diamondCount={diamondCount}
                diamondCut={diamondCut}
                ringDiameter={ringDiameter}
              />
            </Suspense>

            <OrbitControls enablePan={false} enableZoom={false} enableRotate />
          </Canvas>
        </div>

        {/* sidebar */}
        <div className="tabs-sidebar">
          {/* METAL */}
          <div className="tab-section">
            <label>Metal Type</label>
            <div className="metal-grid">
              {baseOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  className={`metal-chip ${baseColor === option.color ? "selected" : ""}`}
                  onClick={() => pickMetal(option.color)}
                >
                  <span className="metal-dot" style={{ backgroundColor: option.color }} />
                  <span className="metal-name">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* right tabs */}
          <div className="right-tabs">
            <button
              type="button"
              className={`right-tab ${rightTab === "size" ? "active" : ""}`}
              onClick={() => setRightTab("size")}
            >
              Size
            </button>
            <button
              type="button"
              className={`right-tab ${rightTab === "stones" ? "active" : ""}`}
              onClick={() => setRightTab("stones")}
              disabled={!metalPicked} // you wanted order: pick metal then proceed
              title={!metalPicked ? "Pick metal first" : ""}
            >
              Stones
            </button>
          </div>

          {/* SIZE TAB */}
          {rightTab === "size" && (
            <div className="tab-section">
              <label>Ring Size (Diameter in mm)</label>

              <div className="size-chart-wrap">
                <img className="size-chart-img" src={ringSizeImg} alt="Ring size chart" />
              </div>

              <select value={ringDiameter} onChange={(e) => pickSize(parseFloat(e.target.value))}>
                <option value="">Select diameter</option>
                {DIAMETERS_MM.map((d) => (
                  <option key={d} value={d}>
                    {d.toFixed(2)} mm
                  </option>
                ))}
              </select>

              <p className="helper-text">Choose based on ring diameter from the chart.</p>

              <button
                type="button"
                className="soft-next"
                onClick={() => setRightTab("stones")}
                disabled={!sizePicked || !metalPicked}
              >
                Continue to Stones
              </button>
            </div>
          )}

          {/* STONES TAB */}
          {rightTab === "stones" && (
            <div className={`tab-section ${!sizePicked ? "section-disabled" : ""}`}>
              <label>Diamonds / Gems</label>

              <div className="segmented">
                <button
                  type="button"
                  className={`seg-btn ${diamondType === "lab" ? "active" : ""}`}
                  onClick={() => setDiamondType("lab")}
                >
                  Lab Grown
                </button>
                <button
                  type="button"
                  className={`seg-btn ${diamondType === "real" ? "active" : ""}`}
                  onClick={() => setDiamondType("real")}
                >
                  Real Gem
                </button>
              </div>

              {/* DIAMOND COUNT: hidden for ring2 */}
              {ringType !== "ring2" && (
                <>
                  <label style={{ marginTop: 10 }}>Number of Diamonds</label>
                  <input
                    type="number"
                    min={0}
                    max={maxDiamonds}
                    value={diamondCount}
                    onChange={(e) => setDiamondCount(parseInt(e.target.value || "0", 10))}
                  />
                </>
              )}

              {ringType === "ring2" && (
                <p className="helper-text" style={{ marginTop: 8 }}>
                  Tennis ring: number of diamonds is fixed.
                </p>
              )}

              {/* CUTS (only ring/ring1) */}
              {ringType !== "ring2" && diamondCount > 0 && (
                <>
                  <label style={{ marginTop: 14 }}>Diamond Cut</label>
                  <div className="cuts-grid-pics">
                    {CUTS.map((cut) => (
                      <button
                        type="button"
                        key={cut.name}
                        className={`cut-pic-card ${diamondCut === cut.name ? "selected" : ""}`}
                        onClick={() => setDiamondCut(cut.name)}
                      >
                        <img src={cut.img} alt={cut.name} />
                        <span>{cut.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="helper-text">Applies to the middle diamond.</p>
                </>
              )}

              {/* ring/ring1 choose which stone */}
              {diamondCount > 0 && ringType !== "ring2" && (
                <>
                  <label style={{ marginTop: 14 }}>Choose which stone</label>
                  <div className="stone-buttons">
                    {Array.from({ length: diamondCount }).map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        className={`stone-btn ${selectedDiamond === i ? "active" : ""}`}
                        onClick={() => toggleDiamond(i)}
                      >
                        {i === 0 ? "Middle" : `Side ${i}`}
                        <span className="stone-mini" style={{ background: diamondColors[i]?.color || "#eee" }} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* RING2: one control color */}
              {diamondCount > 0 && ringType === "ring2" && (
                <>
                  <label style={{ marginTop: 14 }}>Side Stones Color</label>

                  {diamondType === "lab" ? (
                    <>
                      <img className="lab-hero" src={labgrownImg} alt="Lab grown palette" />
                      <div className="lab-color-grid">
                        {LAB_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            className={`lab-color-dot ${diamondColors[0]?.color === c.color ? "selected" : ""}`}
                            style={{ backgroundColor: c.color }}
                            onClick={() => setStoneColor(0, c.color)}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="real-gem-grid">
                      {REAL_GEMS.map((g) => (
                        <button
                          type="button"
                          key={g.name}
                          className={`real-gem-card ${diamondColors[0]?.color === g.color ? "selected" : ""}`}
                          onClick={() => setStoneColor(0, g.color)}
                        >
                          <img src={g.img} alt={g.name} />
                          <span>{g.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ring/ring1 per-stone color chooser */}
              {diamondCount > 0 && ringType !== "ring2" && selectedDiamond !== null && (
                <>
                  <label style={{ marginTop: 14 }}>
                    Color for {selectedDiamond === 0 ? "Middle" : `Side ${selectedDiamond}`}
                  </label>

                  {diamondType === "lab" ? (
                    <>
                      <img className="lab-hero" src={labgrownImg} alt="Lab grown" />
                      <div className="lab-color-grid">
                        {LAB_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            className={`lab-color-dot ${diamondColors[selectedDiamond]?.color === c.color ? "selected" : ""}`}
                            style={{ backgroundColor: c.color }}
                            onClick={() => setStoneColor(selectedDiamond, c.color)}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="real-gem-grid">
                      {REAL_GEMS.map((g) => (
                        <button
                          type="button"
                          key={g.name}
                          className={`real-gem-card ${diamondColors[selectedDiamond]?.color === g.color ? "selected" : ""}`}
                          onClick={() => setStoneColor(selectedDiamond, g.color)}
                        >
                          <img src={g.img} alt={g.name} />
                          <span>{g.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {diamondCount > 0 && ringType !== "ring2" && selectedDiamond === null && (
                <p className="helper-text" style={{ marginTop: 10 }}>
                  Select a stone first (Middle / Side) to choose its color.
                </p>
              )}
            </div>
          )}

          {/* engraving */}
          <div className="tab-section">
            <label>Engraving</label>
            <input
              type="text"
              placeholder="Enter engraving text"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
            />
            <div className="price-row">
              <span>Total</span>
              <strong>${price}</strong>
            </div>
          </div>

          {/* next */}
          <button
            className="next-btn"
            disabled={!canNext}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  ringType,
                  baseColor,
                  diamondColors,
                  engraving,
                  diamondCount,
                  selectedDiamond,
                  ringDiameter,
                  diamondCut,
                  diamondType,
                },
              })
            }
          >
            Order Summary 
          </button>

          {!canNext && (
            <p className="helper-text" style={{ marginTop: 10 }}>
              Please select: metal, size, and stone colors{cutRequired ? " + cut" : ""} before proceeding.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}