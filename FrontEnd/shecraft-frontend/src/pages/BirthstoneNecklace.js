// import React, { useMemo, useState, useEffect } from "react";

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
//   const [birthstones, setBirthstones] = useState([]);
//   const [loadingStones, setLoadingStones] = useState(true);
//   // const birthstones = useMemo(
//   //   () => [
//   //     { month: "Jan", full: "January", stone: "Garnet", colors: [{ label: "Garnet Red", hex: "#7b0f1b" }] },
//   //     { month: "Feb", full: "February", stone: "Amethyst", colors: [{ label: "Purple", hex: "#6d2c91" }] },
//   //     { month: "Mar", full: "March", stone: "Aquamarine", colors: [{ label: "Aqua", hex: "#7fd6e6" }] },
//   //     { month: "Apr", full: "April", stone: "Diamond", colors: [{ label: "Clear", hex: "#e9edf2" }] },
//   //     { month: "May", full: "May", stone: "Emerald", colors: [{ label: "Emerald Green", hex: "#1f8a4c" }] },
//   //     { month: "Jun", full: "June", stone: "Pearl", colors: [{ label: "Pearl", hex: "#f2efe8" }, { label: "Alexandrite", hex: "#6a57a5" }] },
//   //     { month: "Jul", full: "July", stone: "Ruby", colors: [{ label: "Ruby Red", hex: "#b10f2e" }] },
//   //     { month: "Aug", full: "August", stone: "Peridot", colors: [{ label: "Lime Green", hex: "#7fcf3a" }] },
//   //     { month: "Sep", full: "September", stone: "Sapphire", colors: [{ label: "Sapphire Blue", hex: "#163f99" }] },
//   //     { month: "Oct", full: "October", stone: "Opal", colors: [{ label: "Opal", hex: "#d7f2f1" }, { label: "Tourmaline", hex: "#d22a8a" }] },
//   //     { month: "Nov", full: "November", stone: "Citrine", colors: [{ label: "Citrine", hex: "#f1b31c" }, { label: "Topaz", hex: "#f0c45a" }] },
//   //     { month: "Dec", full: "December", stone: "Blue Topaz", colors: [{ label: "Blue Topaz", hex: "#2ea7ff" }, { label: "Blue Zircon", hex: "#00a4b8" }] },
//   //   ],
//   //   []
//   // );
//  const fetchStonesByHex = async (color) => {
//   setSelectedColor(color);

//   try {
//     const res = await fetch(
//       `http://localhost:5000/api/stones/hex/${color.hex.replace("#", "")}`
//     );

//     const data = await res.json();
//     setStonesByColor(data);
//   } catch (err) {
//     console.error("Error fetching stones by hex:", err);
//   }
// };



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
//                       onClick={() => fetchStonesByHex(c)}

//                     >
//                       <span className="bs-colorSwatch" style={{ backgroundColor: c.hex }} />
//                       <span className="bs-colorText">{c.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <button
//   type="button"
//   className={`bs-colorBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
//   onClick={() => fetchStonesByHex(c)}
// >
//   <span className="bs-colorSwatch" style={{ backgroundColor: c.hex }} />
//   <span className="bs-colorText">{c.label}</span>

//   {selectedColor?.hex === c.hex && stonesByColor.length > 0 && (
//     <span className="bs-colorPrice">
//       ${stonesByColor[0].price}
//     </span>
//   )}
// </button>

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
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

/* chain/length assets */
import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

/* preview images */
import NecklaceColorPreviewImg from "../assets/gems/birthstone.jpeg";
import NecklaceWithGemImg from "../assets/necklace/stylebirthstone.png";

/* cut images */
import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const API_BASE = "http://localhost:5000";

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

  // panel (same concept as NecklacesPage)
  const [activePanel, setActivePanel] = useState(null); // "chainLength" | null

  // data
  const [allBirthstones, setAllBirthstones] = useState([]); // raw B* stones

  // selections
  const [selectedMonth, setSelectedMonth] = useState(null); // string month
  const [monthStones, setMonthStones] = useState([]); // all stones for selected month
  const [availableColors, setAvailableColors] = useState([]); // unique colors for month [{label, hex, price}]
  const [selectedColor, setSelectedColor] = useState(null); // {label, hex, price}
  const [selectedColorStones, setSelectedColorStones] = useState([]); // stones filtered by color

  const [selectedCut, setSelectedCut] = useState(null);
  const [metal, setMetal] = useState(METALS[0].color);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

  useEffect(() => {
    const fetchBirthstones = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/stones`);
        const data = await res.json();

        const filtered = Array.isArray(data)
          ? data.filter((s) => typeof s.stoneID === "string" && s.stoneID.startsWith("B"))
          : [];

        setAllBirthstones(filtered);
      } catch (err) {
        console.error("Failed to fetch birthstones:", err);
        setAllBirthstones([]);
      }
    };

    fetchBirthstones();
  }, []);

 const months = useMemo(() => {
  const uniqueMonths = new Set();

  for (const s of allBirthstones) {
    if (typeof s.gem === "string" && s.gem.trim() !== "") {
      uniqueMonths.add(s.gem.trim());
    }
  }

  // optional: keep a stable sorted display
  return Array.from(uniqueMonths);
}, [allBirthstones]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  // Month pick: load month stones + unique colors
  const onPickMonth = (month) => {
    setSelectedMonth(month);
    setSelectedColor(null);
    setSelectedCut(null);

   const stones = allBirthstones.filter((s) => (s.gem || "").trim() === month);

    setMonthStones(stones);

    const unique = new Map();
    for (const st of stones) {
      const hex = (st.colorHex || "").trim();
      if (!hex) continue;
      if (!unique.has(hex)) {
        unique.set(hex, {
          label: st.color || "Color",
          hex: hex,
          price: st.price ?? 0,
        });
      }
    }
    const colors = Array.from(unique.values());
    setAvailableColors(colors);

    setSelectedColorStones([]);
  };

  // Color pick: filter monthStones -> selectedColorStones
  const onPickColor = (c) => {
  setSelectedColor(c);
  const filtered = monthStones.filter((s) => (s.colorHex || "").trim() === c.hex);
  setSelectedColorStones(filtered);
};


  const canProceed =
    !!selectedMonth &&
    !!selectedColor &&
    !!selectedCut &&
    !!metal &&
    !!selectedChain &&
    !!selectedLength;

  const handleSubmit = () => {
    if (!canProceed) return;

    navigate("/checkout", {
      state: {
        itemType: "birthstone_necklace",
        metal, // hex color for metal like your necklace page
        chainType: selectedChain, // keep object consistent with your necklace flow
        selectedLength,
        birthstoneMonth: selectedMonth,
        birthstoneColor: selectedColor, // {label, hex, price}
        birthstoneCut: selectedCut,
        // optional details if you need them later:
        birthstoneCandidates: selectedColorStones,
      },
    });
  };

  const shownPrice =
    selectedColor?.price ??
    selectedColorStones?.[0]?.price ??
    monthStones?.[0]?.price ??
    0;

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Birthstone Necklace</h2>
          <p className="nk-subtitle">Select Month → Color → Cut → Metal → Chain & Length.</p>
        </header>

        <div className="nk-customizer">
          {/* LEFT PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">{METALS.find((m) => m.color === metal)?.name}</span>
              </div>

              <div className="nk-imageWrap">
                <img src={NecklaceWithGemImg} alt="Necklace preview" className="nk-mainImg" />
              </div>

      <div className="nk-imageWrap" style={{ marginTop: 12 }}>
  <img
    src={NecklaceColorPreviewImg}
    alt="Gem color preview"
    className="nk-mainImg"
  />
</div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Month</span>
                  <strong>{selectedMonth || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Color</span>
                  <strong>
                    {selectedColor ? (
                      <span style={{ color: selectedColor.hex }}>{selectedColor.label}</span>
                    ) : (
                      "—"
                    )}
                  </strong>
                </div>
                <div className="nk-metaRow">
                  <span>Cut</span>
                  <strong>{selectedCut || "—"}</strong>
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
            {/* MONTH FIRST */}
            <div className="nk-section">
              <label className="nk-label">Month</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`nk-cardPick ${selectedMonth === m ? "isActive" : ""}`}
                    onClick={() => onPickMonth(m)}
                  >
                    <div className="nk-cardText">
                      <strong>{m}</strong>
                      <span>Tap to select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* COLORS AFTER MONTH */}
            {selectedMonth && (
              <div className="nk-section">
                <label className="nk-label">Gem Color</label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {availableColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => onPickColor(c)}
                      className={`nk-metalBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        padding: 0,
                      }}
                      title={`${c.label} ($${c.price})`}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                          border: "2px solid rgba(0,0,0,0.08)",
                          display: "inline-block",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {selectedColor && (
                  <p className="nk-help" style={{ marginTop: 10 }}>
                    Selected: <strong style={{ color: selectedColor.hex }}>{selectedColor.label}</strong>{" "}
                    · <strong>${shownPrice}</strong>
                  </p>
                )}
              </div>
            )}

            {/* CUT */}
            <div className="nk-section">
              <label className="nk-label">Cut</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                {CUTS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`nk-cardPick ${selectedCut === c.key ? "isActive" : ""}`}
                    onClick={() => setSelectedCut(c.key)}
                  >
                    <img src={c.img} alt={c.key} className="nk-cardImg" />
                    <div className="nk-cardText">
                      <strong>{c.key}</strong>
                      <span>Tap to select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* METAL */}
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

            {/* Chain & Length (right tab like necklace page) */}
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

            <button className="nk-next" type="button" onClick={handleSubmit} disabled={!canProceed}>
              Order Summary
            </button>

            {!canProceed && (
              <p className="nk-help" style={{ color: "#b00020" }}>
                Required: Month, Color, Cut, Metal, Chain, Length.
              </p>
            )}
          </section>

          {/* RIGHT SLIDE PANEL (Chain & Length) */}
          <aside className={`nk-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
            <div className="nk-panelHeader">
              <div>
                <h3 className="nk-panelTitle">Chain & Length</h3>
                <p className="nk-panelSub">Choose the chain type and length.</p>
              </div>

              <button type="button" className="nk-close" onClick={closePanel}>
                Close
              </button>
            </div>

            <div className="nk-panelBody">
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
            </div>

            {activePanel && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" type="button" onClick={closePanel}>
                  Confirm Selection
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={closePanel} />}
        </div>
      </div>
    </div>
  );
}
