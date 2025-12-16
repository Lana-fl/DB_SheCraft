import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

// ===== Name style images (ONLY THESE) =====
import BubbleImg from "../assets/necklace/necklacestyle/bubble.jpg";
import CursiveImg from "../assets/necklace/necklacestyle/cursive.jpg";
import LetterSparkImg from "../assets/necklace/necklacestyle/letterspark.jpg";

// ===== Other images =====
import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

const METALS = [
{ name: "Silver", color: "#C0C0C0" },
{ name: "Gold", color: "#FFD700" },
{ name: "Rose Gold", color: "#B76E79" },
];

const NAME_STYLES = [
{ name: "Bubble", img: BubbleImg },
{ name: "Cursive", img: CursiveImg },
{ name: "Letter Spark", img: LetterSparkImg },
];

const CHAINS = [
{ name: "Cable", img: Cable },
{ name: "Rope", img: Rope },
{ name: "Box", img: Box },
{ name: "Thin", img: Thin },
];

const LENGTHS = [14, 16, 18, 20];

export default function NecklacesPage() {
const navigate = useNavigate();

// Steps (for the horizontal tabs)
const [currentStep, setCurrentStep] = useState(1);

// Panels
const [activePanel, setActivePanel] = useState(null); // "nameStyle" | "chainLength" | null

// Selection state
const [selectedNameStyle, setSelectedNameStyle] = useState({
...NAME_STYLES[0],
fixed: false,
});
const [hoverIndex, setHoverIndex] = useState(0);

const [nameText, setNameText] = useState("");
const [metal, setMetal] = useState(METALS[0].color);
const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
const [selectedLength, setSelectedLength] = useState(16);

// Auto-cycle preview until style is fixed
useEffect(() => {
if (selectedNameStyle.fixed) return;
const interval = setInterval(() => {
setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
}, 1100);
return () => clearInterval(interval);
}, [selectedNameStyle.fixed]);

const closePanel = () => setActivePanel(null);
const togglePanel = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

const handleSubmit = () => {
setCurrentStep(2);
navigate("/designer", {
state: {
itemType: "necklace",
selectedNameStyle,
chainType: selectedChain,
selectedLength,
nameText,
metal,
},
});
};

const onStepClick = (step) => {
setCurrentStep(step);

// Step navigation behavior (adjust routes if needed)
if (step === 1) return; // already here

if (step === 2) {
handleSubmit();
return;
}

if (step === 3) {
navigate("/checkout"); // change if your route name differs
}
};

const steps = ["Customize Your Necklace", "Choose Your Designer", "Checkout"];

return (
<div className="nk-page">
<div className="nk-container">
<header className="nk-header">
<h2>Customize Your Necklace</h2>
<p className="nk-subtitle">Choose a style, chain, and finish then make it yours.</p>
</header>

{/* ===== HORIZONTAL STEPS (LIKE RING) ===== */}
<div className="steps-horizontal">
{steps.map((label, index) => (
<div
key={label}
className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
onClick={() => onStepClick(index + 1)}
role="button"
tabIndex={0}
>
<div className="step-number">{index + 1}</div>
<div className="step-labels">{label}</div>
</div>
))}
</div>

<div className="nk-customizer">
{/* LEFT PREVIEW */}
<section className="nk-preview">
<div className="nk-previewCard">
<div className="nk-previewTop">
<span className="nk-badge">Live Preview</span>
<span className="nk-chip">
{METALS.find((m) => m.color === metal)?.name || "Metal"}
</span>
</div>

<div className="nk-imageWrap">
<img
src={selectedNameStyle.fixed ? selectedNameStyle.img : NAME_STYLES[hoverIndex].img}
alt="Necklace Preview"
className="nk-mainImg"
/>

{nameText && (
<div className="nk-nameOverlay">
<span className="nk-nameText">{nameText}</span>
</div>
)}
</div>

<div className="nk-previewMeta">
<div className="nk-metaRow">
<span>Style</span>
<strong>{selectedNameStyle.name}</strong>
</div>
<div className="nk-metaRow">
<span>Chain</span>
<strong>{selectedChain.name}</strong>
</div>
<div className="nk-metaRow">
<span>Length</span>
<strong>{selectedLength}"</strong>
</div>
</div>
</div>
</section>

{/* RIGHT CONTROLS */}
<section className="nk-controls">
<div className="nk-section">
<label className="nk-label">Engraved Name</label>
<input
className="nk-input"
type="text"
maxLength={12}
placeholder="Enter name (max 12)"
value={nameText}
onChange={(e) => setNameText(e.target.value)}
/>
<p className="nk-help">Tip: shorter names look more balanced.</p>
</div>

<div className="nk-section">
<label className="nk-label">Metal</label>
<div className="nk-metals">
{METALS.map((m) => (
<button
key={m.name}
type="button"
className={`nk-metalBtn ${metal === m.color ? "isActive" : ""}`}
onClick={() => setMetal(m.color)}
>
<span className="nk-metalDot" style={{ backgroundColor: m.color }} />
<span className="nk-metalName">{m.name}</span>
</button>
))}
</div>
</div>

{/* Panel openers */}
<button
type="button"
className={`nk-rowBtn ${activePanel === "nameStyle" ? "open" : ""}`}
onClick={() => togglePanel("nameStyle")}
>
<div className="nk-rowLeft">
<span className="nk-rowTitle">Name Style</span>
<span className="nk-rowValue">{selectedNameStyle.name}</span>
</div>
<span className="nk-chevron" aria-hidden="true" />
</button>

<button
type="button"
className={`nk-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
onClick={() => togglePanel("chainLength")}
>
<div className="nk-rowLeft">
<span className="nk-rowTitle">Chain & Length</span>
<span className="nk-rowValue">
{selectedChain.name} · {selectedLength}"
</span>
</div>
<span className="nk-chevron" aria-hidden="true" />
</button>

<button className="nk-next" type="button" onClick={handleSubmit}>
Next to Designer
</button>
</section>

{/* RIGHT SLIDE PANEL */}
<aside className={`nk-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
<div className="nk-panelHeader">
<div>
<h3 className="nk-panelTitle">
{activePanel === "nameStyle" ? "Select Name Style" : "Chain & Length"}
</h3>
<p className="nk-panelSub">
{activePanel === "nameStyle"
? "Pick the font look that matches your vibe."
: "Choose the chain type and length."}
</p>
</div>

<button type="button" className="nk-close" onClick={closePanel}>
Close
</button>
</div>

<div className="nk-panelBody">
{activePanel === "nameStyle" && (
<div className="nk-grid">
{NAME_STYLES.map((style) => (
<button
key={style.name}
type="button"
className={`nk-cardPick ${
selectedNameStyle.name === style.name ? "isActive" : ""
}`}
onClick={() => setSelectedNameStyle({ ...style, fixed: true })}
>
<img src={style.img} alt={style.name} className="nk-cardImg" />
<div className="nk-cardText">
<strong>{style.name}</strong>
<span>Tap to select</span>
</div>
</button>
))}
</div>
)}

{activePanel === "chainLength" && (
<>
<h4 className="nk-panelSectionTitle">Chain Type</h4>
<div className="nk-chainGrid">
{CHAINS.map((c) => (
<button
key={c.name}
type="button"
className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
onClick={() => setSelectedChain(c)}
>
<img src={c.img} alt={c.name} className="nk-chainImg" />
<strong>{c.name}</strong>
</button>
))}
</div>

<h4 className="nk-panelSectionTitle">Length</h4>
<div className="nk-lengths">
{LENGTHS.map((len) => (
<button
key={len}
type="button"
className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
onClick={() => setSelectedLength(len)}
>
{len}"
</button>
))}
</div>

<div className="nk-lengthPreview">
<img src={LengthImg} alt="Length Guide" className="nk-lengthImg" />
</div>
</>
)}
</div>

{/* FIXED FOOTER */}
{activePanel && (
<div className="nk-panelFooter">
<button className="nk-confirm" type="button" onClick={closePanel}>
{activePanel === "nameStyle" ? "Confirm Style" : "Confirm Selection"}
</button>
</div>
)}
</aside>

{/* OVERLAY */}
{activePanel && <div className="nk-overlay" onClick={closePanel} />}
</div>
</div>
</div>
);
}