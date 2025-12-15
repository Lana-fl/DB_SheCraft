import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/birthstonenecklace.css";

/* ===== chain/length assets ===== */
import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

/* ===== necklace preview images (CHANGE PATHS to your real files) ===== */
import NecklaceColorPreviewImg  from "../assets/gems/birthstone.jpeg";
import NecklaceWithGemImg from "../assets/necklace/stylebirthstone.png"; // <- change to your real file

/* ===== cut images (from Cuts folder) ===== */
import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [14, 16, 18, 20];

const CUTS = [
  { key: "Round", img: CutRound },
  { key: "Oval", img: CutOval },
  { key: "Pear", img: CutPear },
  { key: "Princess", img: CutPrincess },
];

export default function BirthstoneNecklace() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null); // "chainLength" | null
  const [metal, setMetal] = useState("");
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);

  const birthstones = useMemo(
    () => [
      { month: "Jan", full: "January", stone: "Garnet", colors: [{ label: "Garnet Red", hex: "#7b0f1b" }] },
      { month: "Feb", full: "February", stone: "Amethyst", colors: [{ label: "Purple", hex: "#6d2c91" }] },
      { month: "Mar", full: "March", stone: "Aquamarine", colors: [{ label: "Aqua", hex: "#7fd6e6" }] },
      { month: "Apr", full: "April", stone: "Diamond", colors: [{ label: "Clear", hex: "#e9edf2" }] },
      { month: "May", full: "May", stone: "Emerald", colors: [{ label: "Emerald Green", hex: "#1f8a4c" }] },
      { month: "Jun", full: "June", stone: "Pearl", colors: [{ label: "Pearl", hex: "#f2efe8" }, { label: "Alexandrite", hex: "#6a57a5" }] },
      { month: "Jul", full: "July", stone: "Ruby", colors: [{ label: "Ruby Red", hex: "#b10f2e" }] },
      { month: "Aug", full: "August", stone: "Peridot", colors: [{ label: "Lime Green", hex: "#7fcf3a" }] },
      { month: "Sep", full: "September", stone: "Sapphire", colors: [{ label: "Sapphire Blue", hex: "#163f99" }] },
      { month: "Oct", full: "October", stone: "Opal", colors: [{ label: "Opal", hex: "#d7f2f1" }, { label: "Tourmaline", hex: "#d22a8a" }] },
      { month: "Nov", full: "November", stone: "Citrine", colors: [{ label: "Citrine", hex: "#f1b31c" }, { label: "Topaz", hex: "#f0c45a" }] },
      { month: "Dec", full: "December", stone: "Blue Topaz", colors: [{ label: "Blue Topaz", hex: "#2ea7ff" }, { label: "Blue Zircon", hex: "#00a4b8" }] },
    ],
    []
  );

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // {label, hex}
  const [selectedCut, setSelectedCut] = useState(null); // "Round" | ...

  const closePanel = () => setActivePanel(null);
  const togglePanel = () => setActivePanel((p) => (p === "chainLength" ? null : "chainLength"));

  const onPickMonth = (m) => {
    setSelectedMonth(m);
    setSelectedColor(null); // force re-pick color per month
  };

  const canProceed =
    !!selectedMonth &&
    !!selectedColor &&
    !!selectedCut &&
    !!metal &&
    !!selectedChain &&
    !!selectedLength;

  const handleSubmit = () => {
  const missing = [];
  if (!selectedMonth) missing.push("Month");
  if (!selectedColor) missing.push("Color");
  if (!selectedCut) missing.push("Cut");
  if (!metal) missing.push("Metal");
  if (!selectedChain) missing.push("Chain");
  if (!selectedLength) missing.push("Length");

  if (missing.length) {
    alert(`Please choose: ${missing.join(", ")}`);
    return;
  }

  navigate("/checkout", {
    state: {
      itemType: "birthstone_necklace",
      metal,
      chainType: selectedChain,
      selectedLength,
      birthstoneMonth: selectedMonth.month,
      birthstoneName: selectedMonth.stone,
      birthstoneColor: selectedColor,
      birthstoneCut: selectedCut,
    },
  });
};


  return (
    <div className="bs-page">
      
      {/* <div className="steps-horizontal">
        {["Customize Necklace", "Choose Designer", "Checkout"].map((label, index) => (
          <div key={label} className={`step-box ${index === 0 ? "active" : ""}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-labels">{label}</div>
          </div>
        ))}
      </div> */}

      <div className="bs-container">
        <header className="bs-header">
          <h2>Birthstone Necklace</h2>
          <p className="bs-subtitle">Select month, gem color, cut, metal, chain and length.</p>
        </header>

        <div className="bs-customizer">
          {/* LEFT PREVIEW */}
          <section className="bs-preview">
            <div className="bs-previewCard">
              <div className="bs-previewTop">
                <span className="bs-badge">Live Preview</span>
                <span className="bs-chip">
                  {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
                </span>
              </div>

              {/* Two previews */}
              <div className="bs-previewGrid">
                <div className="bs-imageWrap">
                  <img src={NecklaceWithGemImg} alt="Necklace preview" className="bs-mainImg" />
                  <div className="bs-floatTag">Necklace</div>
                </div>

                <div className="bs-imageWrap bs-imageWrapSoft">
                  <img
                    src={NecklaceColorPreviewImg}
                    alt="Gem color preview"
                    className="bs-mainImg"
                  />
                  <div className="bs-floatTag">Gem Color</div>

                  <div className="bs-colorBadge">
                    <span
                      className={`bs-colorDot ${selectedColor ? "on" : ""}`}
                      style={{ backgroundColor: selectedColor?.hex || "#ece7ef" }}
                    />
                    <span className="bs-colorBadgeText">
                      {selectedColor ? selectedColor.label : "Pick a color"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bs-meta">
                <div className="bs-row"><span>Month</span><strong>{selectedMonth ? selectedMonth.full : "—"}</strong></div>
                <div className="bs-row"><span>Stone</span><strong>{selectedMonth ? selectedMonth.stone : "—"}</strong></div>
                <div className="bs-row"><span>Cut</span><strong>{selectedCut || "—"}</strong></div>
                <div className="bs-row"><span>Chain</span><strong>{selectedChain ? selectedChain.name : "—"}</strong></div>
                <div className="bs-row"><span>Length</span><strong>{selectedLength ? `${selectedLength}"` : "—"}</strong></div>
              </div>
            </div>
          </section>

          {/* RIGHT CONTROLS */}
          <section className="bs-controls">
            {/* Month */}
            <div className="bs-section">
              <label className="bs-label">Month</label>
              <div className="bs-monthGrid">
                {birthstones.map((b) => (
                  <button
                    key={b.month}
                    type="button"
                    className={`bs-monthBtn ${selectedMonth?.month === b.month ? "isActive" : ""}`}
                    onClick={() => onPickMonth(b)}
                  >
                    {b.month}
                  </button>
                ))}
              </div>
              <p className="bs-help">Choosing a month unlocks its gem colors.</p>
            </div>

            {/* Color (depends on month) */}
            <div className="bs-section">
              <label className="bs-label">Gem Color</label>

              {!selectedMonth ? (
                <div className="bs-lockCard">Select a month first.</div>
              ) : (
                <div className="bs-colorGrid">
                  {selectedMonth.colors.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      className={`bs-colorBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      <span className="bs-colorSwatch" style={{ backgroundColor: c.hex }} />
                      <span className="bs-colorText">{c.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cut (from Cuts folder images) */}
            <div className="bs-section">
              <label className="bs-label">Cut</label>
              <div className="bs-cutGrid">
                {CUTS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`bs-cutCard ${selectedCut === c.key ? "isActive" : ""}`}
                    onClick={() => setSelectedCut(c.key)}
                  >
                    <img className="bs-cutImg" src={c.img} alt={c.key} />
                    <div className="bs-cutName">{c.key}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div className="bs-section">
              <label className="bs-label">Metal</label>
              <div className="bs-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`bs-metalBtn ${metal === m.color ? "isActive" : ""}`}
                    onClick={() => setMetal(m.color)}
                  >
                    <span className="bs-metalDot" style={{ backgroundColor: m.color }} />
                    <span className="bs-metalName">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chain & length opener */}
            <button
              type="button"
              className={`bs-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
              onClick={togglePanel}
            >
              <div className="bs-rowLeft">
                <span className="bs-rowTitle">Chain & Length</span>
                <span className="bs-rowValue">
                  {selectedChain ? selectedChain.name : "Pick chain"} · {selectedLength ? `${selectedLength}"` : "Pick length"}
                </span>
              </div>
              <span className="bs-chevron" aria-hidden="true" />
            </button>

            <button className="bs-next" type="button" onClick={handleSubmit} disabled={!canProceed}>
              Order Summary 
            </button>

            {!canProceed && (
              <p className="bs-error">
                Required: Month, Color, Cut, Metal, Chain, Length.
              </p>
            )}
          </section>

          {/* SLIDE PANEL: chain + length */}
          <aside className={`bs-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
            <div className="bs-panelHeader">
              <div>
                <h3 className="bs-panelTitle">Chain & Length</h3>
                <p className="bs-panelSub">Select your chain type and preferred length.</p>
              </div>
              <button type="button" className="bs-close" onClick={closePanel}>Close</button>
            </div>

            <div className="bs-panelBody">
              <h4 className="bs-panelSectionTitle">Chain Type</h4>
              <div className="bs-chainGrid">
                {CHAINS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`bs-chainCard ${selectedChain?.name === c.name ? "isActive" : ""}`}
                    onClick={() => setSelectedChain(c)}
                  >
                    <img src={c.img} alt={c.name} className="bs-chainImg" />
                    <strong>{c.name}</strong>
                  </button>
                ))}
              </div>

              <h4 className="bs-panelSectionTitle">Length</h4>
              <div className="bs-lengths">
                {LENGTHS.map((len) => (
                  <button
                    key={len}
                    type="button"
                    className={`bs-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
                    onClick={() => setSelectedLength(len)}
                  >
                    {len}"
                  </button>
                ))}
              </div>

              <div className="bs-lengthPreview">
                <img src={LengthImg} alt="Length Guide" className="bs-lengthImg" />
              </div>
            </div>

            <div className="bs-panelFooter">
              <button className="bs-confirm" type="button" onClick={closePanel}>
                Confirm Selection
              </button>
            </div>
          </aside>

          {activePanel && <div className="bs-overlay" onClick={closePanel} />}
        </div>
      </div>
    </div>
  );
}
// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/birthstonenecklace.css";

// /* ===== Assets ===== */
// import LengthImg from "../assets/necklace/length.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// import BirthstoneNecklaceImg from "../assets/gems/birthstone.jpeg";
// import BirthstoneGuideImg from "../assets/necklace/stylebirthstone.png";

// import CutOval from "../assets/Cuts/oval.jpeg";
// import CutPear from "../assets/Cuts/pear.jpeg";
// import CutPrincess from "../assets/Cuts/princess.jpeg";
// import CutRound from "../assets/Cuts/round.jpg";

// /* ===== Constants ===== */
// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];

// const LENGTHS = [14, 16, 18, 20];

// const CUTS = [
//   { name: "Round", img: CutRound },
//   { name: "Princess", img: CutPrincess },
//   { name: "Oval", img: CutOval },
//   { name: "Pear", img: CutPear },
// ];

// const MONTHS = [
//   { key: "Jan", label: "Jan", stone: "Garnet", suggestedColor: "#8B1E2D" },
//   { key: "Feb", label: "Feb", stone: "Amethyst", suggestedColor: "#7A3DB8" },
//   { key: "Mar", label: "Mar", stone: "Aquamarine", suggestedColor: "#6EC7E6" },
//   { key: "Apr", label: "Apr", stone: "Diamond", suggestedColor: "#E9EEF3" },
//   { key: "May", label: "May", stone: "Emerald", suggestedColor: "#22B573" },
//   { key: "Jun", label: "Jun", stone: "Pearl", suggestedColor: "#F3EBDD" },
//   { key: "Jul", label: "Jul", stone: "Ruby", suggestedColor: "#B11226" },
//   { key: "Aug", label: "Aug", stone: "Peridot", suggestedColor: "#7ED957" },
//   { key: "Sep", label: "Sep", stone: "Sapphire", suggestedColor: "#1C4ED8" },
//   { key: "Oct", label: "Oct", stone: "Opal", suggestedColor: "#B8F2E6" },
//   { key: "Nov", label: "Nov", stone: "Citrine", suggestedColor: "#F4B400" },
//   { key: "Dec", label: "Dec", stone: "Blue Topaz", suggestedColor: "#2BB3E6" },
// ];

// const GEM_COLORS = [
//   { name: "Ruby Red", value: "#B11226" },
//   { name: "Garnet", value: "#8B1E2D" },
//   { name: "Amethyst", value: "#7A3DB8" },
//   { name: "Sapphire Blue", value: "#1C4ED8" },
//   { name: "Aquamarine", value: "#6EC7E6" },
//   { name: "Emerald Green", value: "#22B573" },
//   { name: "Peridot Green", value: "#7ED957" },
//   { name: "Citrine Gold", value: "#F4B400" },
//   { name: "Pearl", value: "#F3EBDD" },
//   { name: "Diamond", value: "#E9EEF3" },
//   { name: "Opal", value: "#B8F2E6" },
//   { name: "Topaz", value: "#2BB3E6" },
// ];

// export default function BirthstoneNecklacePage() {
//   const navigate = useNavigate();

//   const [activePanel, setActivePanel] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedCut, setSelectedCut] = useState(null);
//   const [metal, setMetal] = useState(null);
//   const [selectedChain, setSelectedChain] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);
//   const [missingText, setMissingText] = useState("");

//   const missingList = useMemo(() => {
//     const miss = [];
//     if (!selectedMonth) miss.push("Month");
//     if (!selectedColor) miss.push("Color");
//     if (!selectedCut) miss.push("Cut");
//     if (!metal) miss.push("Metal");
//     if (!selectedChain) miss.push("Chain");
//     if (!selectedLength) miss.push("Length");
//     return miss;
//   }, [selectedMonth, selectedColor, selectedCut, metal, selectedChain, selectedLength]);

//   const handleNext = () => {
//     if (missingList.length) {
//       setMissingText(`Please choose: ${missingList.join(", ")}.`);
//       return;
//     }

//     navigate("/designer", {
//       state: {
//         itemType: "birthstone_necklace",
//         month: selectedMonth.key,
//         birthstone: selectedMonth.stone,
//         color: selectedColor,
//         cut: selectedCut.name,
//         metal,
//         chain: selectedChain.name,
//         length: selectedLength,
//       },
//     });
//   };

//   return (
//     <div className="bs-page">
//       <div className="bs-container">
//         <h2>Birthstone Necklace</h2>

//         <div className="bs-customizer">
//           {/* PREVIEW */}
//           <section className="bs-preview">
//             <img src={BirthstoneNecklaceImg} alt="Necklace Preview" />
//             {selectedColor && (
//               <span
//                 className="bs-colorBubble"
//                 style={{ background: selectedColor.value }}
//               />
//             )}
//             <img src={BirthstoneGuideImg} alt="Birthstone Guide" />
//           </section>

//           {/* CONTROLS */}
//           <section className="bs-controls">
//             <h4>Month</h4>
//             <div className="bs-monthGrid">
//               {MONTHS.map(m => (
//                 <button
//                   key={m.key}
//                   className={selectedMonth?.key === m.key ? "active" : ""}
//                   onClick={() => setSelectedMonth(m)}
//                 >
//                   {m.label}
//                 </button>
//               ))}
//             </div>

//             <h4>Gem Color</h4>
//             <div className="bs-colorGrid">
//               {GEM_COLORS.map(c => (
//                 <button
//                   key={c.name}
//                   className={selectedColor?.name === c.name ? "active" : ""}
//                   onClick={() => setSelectedColor(c)}
//                 >
//                   <span style={{ background: c.value }} />
//                   {c.name}
//                 </button>
//               ))}
//             </div>

//             <h4>Cut</h4>
//             <div className="bs-cutGrid">
//               {CUTS.map(cut => (
//                 <button
//                   key={cut.name}
//                   className={selectedCut?.name === cut.name ? "active" : ""}
//                   onClick={() => setSelectedCut(cut)}
//                 >
//                   <img src={cut.img} alt={cut.name} />
//                   {cut.name}
//                 </button>
//               ))}
//             </div>

//             <h4>Metal</h4>
//             {METALS.map(m => (
//               <button key={m.name} onClick={() => setMetal(m.color)}>
//                 {m.name}
//               </button>
//             ))}

//             <button onClick={() => setActivePanel("chain")}>
//               Chain & Length
//             </button>

//             <button className="bs-next" onClick={handleNext}>
//               Next
//             </button>

//             {missingText && <p className="bs-missing">{missingText}</p>}
//           </section>
//         </div>

//         {/* SLIDE PANEL */}
//         {activePanel && (
//           <aside className="bs-panel">
//             <h4>Chain</h4>
//             {CHAINS.map(c => (
//               <button key={c.name} onClick={() => setSelectedChain(c)}>
//                 <img src={c.img} alt={c.name} />
//                 {c.name}
//               </button>
//             ))}

//             <h4>Length</h4>
//             {LENGTHS.map(l => (
//               <button key={l} onClick={() => setSelectedLength(l)}>
//                 {l}"
//               </button>
//             ))}

//             <img src={LengthImg} alt="Length Guide" />
//             <button onClick={() => setActivePanel(null)}>Confirm</button>
//           </aside>
//         )}
//       </div>
//     </div>
//   );
// }
