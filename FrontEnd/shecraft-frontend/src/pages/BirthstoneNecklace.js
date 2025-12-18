// import React, { useMemo, useState, useEffect } from "react";
// import axios from "axios"; // add this
// import { useNavigate } from "react-router-dom";
// import "../styles/birthstonenecklace.css";

// /* ===== chain/length assets ===== */
// import LengthImg from "../assets/necklace/length.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// /* ===== necklace preview images (CHANGE PATHS to your real files) ===== */
// import NecklaceColorPreviewImg  from "../assets/gems/birthstone.jpeg";
// import NecklaceWithGemImg from "../assets/necklace/stylebirthstone.png"; // <- change to your real file

// /* ===== cut images (from Cuts folder) ===== */
// import CutOval from "../assets/Cuts/oval.jpeg";
// import CutPear from "../assets/Cuts/pear.jpeg";
// import CutPrincess from "../assets/Cuts/princess.jpeg";
// import CutRound from "../assets/Cuts/round.jpg";

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
//   { key: "Round", img: CutRound },
//   { key: "Oval", img: CutOval },
//   { key: "Pear", img: CutPear },
//   { key: "Princess", img: CutPrincess },
// ];

// export default function BirthstoneNecklace() {
//   const navigate = useNavigate();

//   const [activePanel, setActivePanel] = useState(null); // "chainLength" | null
//   const [metal, setMetal] = useState("");
//   const [selectedChain, setSelectedChain] = useState(null);
//   const [selectedLength, setSelectedLength] = useState(null);

//   const birthstones = useMemo(
//     () => [
//       { month: "Jan", full: "January", stone: "Garnet", colors: [{ label: "Garnet Red", hex: "#7b0f1b" }] },
//       { month: "Feb", full: "February", stone: "Amethyst", colors: [{ label: "Purple", hex: "#6d2c91" }] },
//       { month: "Mar", full: "March", stone: "Aquamarine", colors: [{ label: "Aqua", hex: "#7fd6e6" }] },
//       { month: "Apr", full: "April", stone: "Diamond", colors: [{ label: "Clear", hex: "#e9edf2" }] },
//       { month: "May", full: "May", stone: "Emerald", colors: [{ label: "Emerald Green", hex: "#1f8a4c" }] },
//       { month: "Jun", full: "June", stone: "Pearl", colors: [{ label: "Pearl", hex: "#f2efe8" }, { label: "Alexandrite", hex: "#6a57a5" }] },
//       { month: "Jul", full: "July", stone: "Ruby", colors: [{ label: "Ruby Red", hex: "#b10f2e" }] },
//       { month: "Aug", full: "August", stone: "Peridot", colors: [{ label: "Lime Green", hex: "#7fcf3a" }] },
//       { month: "Sep", full: "September", stone: "Sapphire", colors: [{ label: "Sapphire Blue", hex: "#163f99" }] },
//       { month: "Oct", full: "October", stone: "Opal", colors: [{ label: "Opal", hex: "#d7f2f1" }, { label: "Tourmaline", hex: "#d22a8a" }] },
//       { month: "Nov", full: "November", stone: "Citrine", colors: [{ label: "Citrine", hex: "#f1b31c" }, { label: "Topaz", hex: "#f0c45a" }] },
//       { month: "Dec", full: "December", stone: "Blue Topaz", colors: [{ label: "Blue Topaz", hex: "#2ea7ff" }, { label: "Blue Zircon", hex: "#00a4b8" }] },
//     ],
//     []
//   );

//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null); // {label, hex}
//   const [selectedCut, setSelectedCut] = useState(null); // "Round" | ...

//   const closePanel = () => setActivePanel(null);
//   const togglePanel = () => setActivePanel((p) => (p === "chainLength" ? null : "chainLength"));

//   const onPickMonth = (m) => {
//     setSelectedMonth(m);
//     setSelectedColor(null); // force re-pick color per month
//   };

//   const canProceed =
//     !!selectedMonth &&
//     !!selectedColor &&
//     !!selectedCut &&
//     !!metal &&
//     !!selectedChain &&
//     !!selectedLength;

//   const handleSubmit = () => {
//   const missing = [];
//   if (!selectedMonth) missing.push("Month");
//   if (!selectedColor) missing.push("Color");
//   if (!selectedCut) missing.push("Cut");
//   if (!metal) missing.push("Metal");
//   if (!selectedChain) missing.push("Chain");
//   if (!selectedLength) missing.push("Length");

//   if (missing.length) {
//     alert(`Please choose: ${missing.join(", ")}`);
//     return;
//   }

//   navigate("/checkout", {
//     state: {
//       itemType: "birthstone_necklace",
//       metal,
//       chainType: selectedChain,
//       selectedLength,
//       birthstoneMonth: selectedMonth.month,
//       birthstoneName: selectedMonth.stone,
//       birthstoneColor: selectedColor,
//       birthstoneCut: selectedCut,
//     },
//   });
// };


//   return (
//     <div className="bs-page">
      
//       {/* <div className="steps-horizontal">
//         {["Customize Necklace", "Choose Designer", "Checkout"].map((label, index) => (
//           <div key={label} className={`step-box ${index === 0 ? "active" : ""}`}>
//             <div className="step-number">{index + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div> */}

//       <div className="bs-container">
//         <header className="bs-header">
//           <h2>Birthstone Necklace</h2>
//           <p className="bs-subtitle">Select month, gem color, cut, metal, chain and length.</p>
//         </header>

//         <div className="bs-customizer">
//           {/* LEFT PREVIEW */}
//           <section className="bs-preview">
//             <div className="bs-previewCard">
//               <div className="bs-previewTop">
//                 <span className="bs-badge">Live Preview</span>
//                 <span className="bs-chip">
//                   {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
//                 </span>
//               </div>

//               {/* Two previews */}
//               <div className="bs-previewGrid">
//                 <div className="bs-imageWrap">
//                   <img src={NecklaceWithGemImg} alt="Necklace preview" className="bs-mainImg" />
//                   <div className="bs-floatTag">Necklace</div>
//                 </div>

//                 <div className="bs-imageWrap bs-imageWrapSoft">
//                   <img
//                     src={NecklaceColorPreviewImg}
//                     alt="Gem color preview"
//                     className="bs-mainImg"
//                   />
//                   <div className="bs-floatTag">Gem Color</div>

//                   <div className="bs-colorBadge">
//                     <span
//                       className={`bs-colorDot ${selectedColor ? "on" : ""}`}
//                       style={{ backgroundColor: selectedColor?.hex || "#ece7ef" }}
//                     />
//                     <span className="bs-colorBadgeText">
//                       {selectedColor ? selectedColor.label : "Pick a color"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bs-meta">
//                 <div className="bs-row"><span>Month</span><strong>{selectedMonth ? selectedMonth.full : "—"}</strong></div>
//                 <div className="bs-row"><span>Stone</span><strong>{selectedMonth ? selectedMonth.stone : "—"}</strong></div>
//                 <div className="bs-row"><span>Cut</span><strong>{selectedCut || "—"}</strong></div>
//                 <div className="bs-row"><span>Chain</span><strong>{selectedChain ? selectedChain.name : "—"}</strong></div>
//                 <div className="bs-row"><span>Length</span><strong>{selectedLength ? `${selectedLength}"` : "—"}</strong></div>
//               </div>
//             </div>
//           </section>

//           {/* RIGHT CONTROLS */}
//           <section className="bs-controls">
//             {/* Month */}
//             <div className="bs-section">
//               <label className="bs-label">Month</label>
//               <div className="bs-monthGrid">
//                 {birthstones.map((b) => (
//                   <button
//                     key={b.month}
//                     type="button"
//                     className={`bs-monthBtn ${selectedMonth?.month === b.month ? "isActive" : ""}`}
//                     onClick={() => onPickMonth(b)}
//                   >
//                     {b.month}
//                   </button>
//                 ))}
//               </div>
//               <p className="bs-help">Choosing a month unlocks its gem colors.</p>
//             </div>

//             {/* Color (depends on month) */}
//             <div className="bs-section">
//               <label className="bs-label">Gem Color</label>

//               {!selectedMonth ? (
//                 <div className="bs-lockCard">Select a month first.</div>
//               ) : (
//                 <div className="bs-colorGrid">
//                   {selectedMonth.colors.map((c) => (
//                     <button
//                       key={c.label}
//                       type="button"
//                       className={`bs-colorBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
//                       onClick={() => setSelectedColor(c)}
//                     >
//                       <span className="bs-colorSwatch" style={{ backgroundColor: c.hex }} />
//                       <span className="bs-colorText">{c.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Cut (from Cuts folder images) */}
//             <div className="bs-section">
//               <label className="bs-label">Cut</label>
//               <div className="bs-cutGrid">
//                 {CUTS.map((c) => (
//                   <button
//                     key={c.key}
//                     type="button"
//                     className={`bs-cutCard ${selectedCut === c.key ? "isActive" : ""}`}
//                     onClick={() => setSelectedCut(c.key)}
//                   >
//                     <img className="bs-cutImg" src={c.img} alt={c.key} />
//                     <div className="bs-cutName">{c.key}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Metal */}
//             <div className="bs-section">
//               <label className="bs-label">Metal</label>
//               <div className="bs-metals">
//                 {METALS.map((m) => (
//                   <button
//                     key={m.name}
//                     type="button"
//                     className={`bs-metalBtn ${metal === m.color ? "isActive" : ""}`}
//                     onClick={() => setMetal(m.color)}
//                   >
//                     <span className="bs-metalDot" style={{ backgroundColor: m.color }} />
//                     <span className="bs-metalName">{m.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Chain & length opener */}
//             <button
//               type="button"
//               className={`bs-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
//               onClick={togglePanel}
//             >
//               <div className="bs-rowLeft">
//                 <span className="bs-rowTitle">Chain & Length</span>
//                 <span className="bs-rowValue">
//                   {selectedChain ? selectedChain.name : "Pick chain"} · {selectedLength ? `${selectedLength}"` : "Pick length"}
//                 </span>
//               </div>
//               <span className="bs-chevron" aria-hidden="true" />
//             </button>

//             <button className="bs-next" type="button" onClick={handleSubmit} disabled={!canProceed}>
//               Order Summary 
//             </button>

//             {!canProceed && (
//               <p className="bs-error">
//                 Required: Month, Color, Cut, Metal, Chain, Length.
//               </p>
//             )}
//           </section>

//           {/* SLIDE PANEL: chain + length */}
//           <aside className={`bs-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
//             <div className="bs-panelHeader">
//               <div>
//                 <h3 className="bs-panelTitle">Chain & Length</h3>
//                 <p className="bs-panelSub">Select your chain type and preferred length.</p>
//               </div>
//               <button type="button" className="bs-close" onClick={closePanel}>Close</button>
//             </div>

//             <div className="bs-panelBody">
//               <h4 className="bs-panelSectionTitle">Chain Type</h4>
//               <div className="bs-chainGrid">
//                 {CHAINS.map((c) => (
//                   <button
//                     key={c.name}
//                     type="button"
//                     className={`bs-chainCard ${selectedChain?.name === c.name ? "isActive" : ""}`}
//                     onClick={() => setSelectedChain(c)}
//                   >
//                     <img src={c.img} alt={c.name} className="bs-chainImg" />
//                     <strong>{c.name}</strong>
//                   </button>
//                 ))}
//               </div>

//               <h4 className="bs-panelSectionTitle">Length</h4>
//               <div className="bs-lengths">
//                 {LENGTHS.map((len) => (
//                   <button
//                     key={len}
//                     type="button"
//                     className={`bs-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
//                     onClick={() => setSelectedLength(len)}
//                   >
//                     {len}"
//                   </button>
//                 ))}
//               </div>

//               <div className="bs-lengthPreview">
//                 <img src={LengthImg} alt="Length Guide" className="bs-lengthImg" />
//               </div>
//             </div>

//             <div className="bs-panelFooter">
//               <button className="bs-confirm" type="button" onClick={closePanel}>
//                 Confirm Selection
//               </button>
//             </div>
//           </aside>

//           {activePanel && <div className="bs-overlay" onClick={closePanel} />}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/birthstonenecklace.css";

/* ===== chain/length assets ===== */
import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

/* ===== necklace preview images ===== */
import NecklaceColorPreviewImg from "../assets/gems/birthstone.jpeg";
import NecklaceWithGemImg from "../assets/necklace/stylebirthstone.png";

/* ===== cut images ===== */
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

  const [activePanel, setActivePanel] = useState(null);
  const [metal, setMetal] = useState("");
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);

  const [birthstones, setBirthstones] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // {label, hex}
  const [selectedCut, setSelectedCut] = useState(null);

  useEffect(() => {
    // Fetch stones from backend
    axios.get("/api/stones")
      .then((res) => {
        // Map data to frontend format
        const mapped = res.data.map(stone => ({
          month: stone.monthAbbr,
          full: stone.month,
          stone: stone.stoneName,
          price: stone.price || 0,  // Add price from backend
          colors: [{ label: stone.stoneName, hex: stone.hexColor }]
        }));
        setBirthstones(mapped);
      })
      .catch(err => console.error("Error fetching stones:", err));
  }, []);

  const closePanel = () => setActivePanel(null);
  const togglePanel = () => setActivePanel((p) => (p === "chainLength" ? null : "chainLength"));

  const onPickMonth = (m) => {
    setSelectedMonth(m);
    setSelectedColor(null);
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
        price: selectedMonth.price
      },
    });
  };

  return (
    <div className="bs-page">
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

              <div className="bs-previewGrid">
                <div className="bs-imageWrap">
                  <img src={NecklaceWithGemImg} alt="Necklace preview" className="bs-mainImg" />
                  <div className="bs-floatTag">Necklace</div>
                </div>

                <div className="bs-imageWrap bs-imageWrapSoft">
                  <img src={NecklaceColorPreviewImg} alt="Gem color preview" className="bs-mainImg" />
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
                <div className="bs-row"><span>Price</span><strong>{selectedMonth ? `$${selectedMonth.price}` : "—"}</strong></div>
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
                    key={b.month + b.stone}
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

            {/* Color */}
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

            {/* Cuts / Metals / Chains remain the same */}
          </section>
        </div>
      </div>
    </div>
  );
}
