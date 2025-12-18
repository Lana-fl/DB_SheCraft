// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "../styles/charmNecklace.css";

// // Chains
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";
// import Satin from "../assets/chains/satin.png";

// // Length reference image (single image)
// import LengthImg from "../assets/necklace/length.png";

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
//   { name: "Satin", img: Satin },
// ];

// const LENGTHS = [14, 15, 16, 18, 20];

// const METALS = [
//   { key: "Silver", ui: "Silver" },
//   { key: "Gold", ui: "Gold" },
//   { key: "RoseGold", ui: "Rose Gold" },
//   { key: "Multicolor", ui: "Multicolor" },
// ];

// // Vite: load all charm images from src/assets/Charms/** (png/jpg/jpeg)
// const charmImages = import.meta.glob(
//   "../assets/Charms/**/*.{png,jpg,jpeg}",
//   { eager: true }
// );

// function parseAccessoryId(path) {
//   // expects .../A001.png or A071.jpg etc
//   const m = path.match(/A(\d{3})/i);
//   if (!m) return null;
//   return `A${m[1]}`;
// }

// function inRange(id, start, end) {
//   const n = Number(id?.slice(1));
//   return Number.isFinite(n) && n >= start && n <= end;
// }

// export default function CharmNecklacePage() {
//   const navigate = useNavigate();

//   const [activePanel, setActivePanel] = useState(null); // chain | length | charms | letters
//   const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
//   const [selectedLength, setSelectedLength] = useState(16);

//   const [activeCharmCategory, setActiveCharmCategory] = useState("Colorful"); // Colorful | Gold | RoseGold | Silver
//   const [selectedCharms, setSelectedCharms] = useState([]); // array of { id, category, img }

//   const [letterMetal, setLetterMetal] = useState("Gold"); // Silver | Gold | RoseGold | Multicolor
//   const [letterText, setLetterText] = useState("");

//   const categoryData = useMemo(() => {
//     // Build a map: category -> [{id, img}]
//     const all = Object.entries(charmImages)
//       .map(([path, mod]) => {
//         const id = parseAccessoryId(path);
//         if (!id) return null;
//         const img = mod?.default ?? mod;
//         return { id, img, path };
//       })
//       .filter(Boolean);

//     const colorful = all.filter((x) => inRange(x.id, 1, 35));
//     const gold = all.filter((x) => inRange(x.id, 36, 52));
//     const rosegold = all.filter((x) => inRange(x.id, 53, 70));
//     const silver = all.filter((x) => inRange(x.id, 71, 87));

//     // Sort by numeric id
//     const sortById = (a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1));

//     return {
//       Colorful: colorful.sort(sortById),
//       Gold: gold.sort(sortById),
//       RoseGold: rosegold.sort(sortById),
//       Silver: silver.sort(sortById),
//     };
//   }, []);

//   const visibleCharms = categoryData[activeCharmCategory] ?? [];

//   const addCharm = (ch) => {
//     // allow duplicates? If you want NO duplicates, block here
//     setSelectedCharms((prev) => [...prev, { ...ch, category: activeCharmCategory }]);
//   };

//   const removeCharmAt = (index) => {
//     setSelectedCharms((prev) => prev.filter((_, i) => i !== index));
//   };

//   const addLetterCharm = () => {
//     const txt = letterText.trim();
//     if (!txt) return;

//     setSelectedCharms((prev) => [
//       ...prev,
//       {
//         id: `LETTER:${txt}:${letterMetal}`,
//         category: "Letter",
//         img: null,
//         text: txt,
//         metal: letterMetal,
//       },
//     ]);
//     setLetterText("");
//     setActivePanel(null);
//   };

//   const handleNext = () => {
//     navigate("/designer", {
//       state: {
//         itemType: "charmNecklace",
//         chainType: selectedChain,
//         selectedLength,
//         charms: selectedCharms, // includes A0xx + letter entries
//       },
//     });
//   };

//   return (
//     <div className="page-wrapper sc-page">
//       <div className="sc-container">
//         <header className="sc-header">
//           <h2 className="sc-title">Charm Necklace</h2>
//           <p className="sc-subtitle">
//             Choose your chain, select the length, then add charms by color—or add a letter charm.
//           </p>
//         </header>

//         <div className="sc-customizer">
//           {/* LEFT PREVIEW */}
//           <div className="sc-preview">
//             <div className="sc-preview-card">
//               <div className="sc-preview-top">
//                 <div className="sc-pill">
//                   {selectedChain.name} • {selectedLength}"
//                 </div>
//               </div>

//               <div className="sc-preview-body">
//                 <img className="sc-chain-img" src={selectedChain.img} alt={selectedChain.name} />
//                 <div className="sc-length-block">
//                   <img className="sc-length-img" src={LengthImg} alt="Length guide" />
//                   <div className="sc-length-text">Selected length: {selectedLength}"</div>
//                 </div>

//                 <div className="sc-selected-charms">
//                   <div className="sc-selected-title">Selected charms</div>

//                   {selectedCharms.length === 0 ? (
//                     <div className="sc-empty">No charms selected yet.</div>
//                   ) : (
//                     <div className="sc-selected-grid">
//                       {selectedCharms.map((c, i) => (
//                         <div key={`${c.id}-${i}`} className="sc-selected-item">
//                           {c.img ? (
//                             <img src={c.img} alt={c.id} />
//                           ) : (
//                             <div className="sc-letter-chip">
//                               <div className="sc-letter-top">{c.metal}</div>
//                               <div className="sc-letter-text">{c.text}</div>
//                             </div>
//                           )}
//                           <button
//                             type="button"
//                             className="sc-remove"
//                             onClick={() => removeCharmAt(i)}
//                             aria-label="Remove charm"
//                           >
//                             ×
//                           </button>
//                           <div className="sc-selected-id">{c.id.startsWith("A") ? c.id : "Letter"}</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <button className="sc-next-btn" onClick={handleNext}>
//               Next to Designer
//             </button>
//           </div>

//           {/* RIGHT FORM */}
//           <div className="sc-form">
//             <div
//               className="sc-section sc-click"
//               onClick={() => setActivePanel(activePanel === "chain" ? null : "chain")}
//             >
//               <div className="sc-section-row">
//                 <span>Chain</span>
//                 <span className="sc-arrow">▶</span>
//               </div>
//               <div className="sc-muted">{selectedChain.name}</div>
//             </div>

//             <div
//               className="sc-section sc-click"
//               onClick={() => setActivePanel(activePanel === "length" ? null : "length")}
//             >
//               <div className="sc-section-row">
//                 <span>Length</span>
//                 <span className="sc-arrow">▶</span>
//               </div>
//               <div className="sc-muted">{selectedLength}"</div>
//             </div>

//             <div
//               className="sc-section sc-click"
//               onClick={() => setActivePanel(activePanel === "charms" ? null : "charms")}
//             >
//               <div className="sc-section-row">
//                 <span>Charms by color</span>
//                 <span className="sc-arrow">▶</span>
//               </div>
//               <div className="sc-muted">Colorful / Gold / Rose Gold / Silver</div>
//             </div>

//             <div
//               className="sc-section sc-click"
//               onClick={() => setActivePanel(activePanel === "letters" ? null : "letters")}
//             >
//               <div className="sc-section-row">
//                 <span>Letter / Name charm</span>
//                 <span className="sc-arrow">▶</span>
//               </div>
//               <div className="sc-muted">Choose metal + type letters</div>
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className={`sc-panel ${activePanel ? "open" : ""}`}>
//             {activePanel === "chain" && (
//               <>
//                 <h3 className="sc-panel-title">Select Chain</h3>
//                 <div className="sc-grid">
//                   {CHAINS.map((c) => (
//                     <button
//                       key={c.name}
//                       type="button"
//                       className={`sc-card ${selectedChain.name === c.name ? "selected" : ""}`}
//                       onClick={() => setSelectedChain(c)}
//                     >
//                       <img src={c.img} alt={c.name} />
//                       <div className="sc-card-label">{c.name}</div>
//                     </button>
//                   ))}
//                 </div>
//                 <button className="sc-confirm" onClick={() => setActivePanel(null)}>
//                   Confirm
//                 </button>
//               </>
//             )}

//             {activePanel === "length" && (
//               <>
//                 <h3 className="sc-panel-title">Select Length</h3>
//                 <div className="sc-length-row">
//                   {LENGTHS.map((len) => (
//                     <button
//                       key={len}
//                       type="button"
//                       className={`sc-chip ${selectedLength === len ? "selected" : ""}`}
//                       onClick={() => setSelectedLength(len)}
//                     >
//                       {len}"
//                     </button>
//                   ))}
//                 </div>

//                 <div className="sc-length-preview">
//                   <img src={LengthImg} alt="Length guide" />
//                 </div>

//                 <button className="sc-confirm" onClick={() => setActivePanel(null)}>
//                   Confirm
//                 </button>
//               </>
//             )}

//             {activePanel === "charms" && (
//               <>
//                 <h3 className="sc-panel-title">Add Charms</h3>

//                 <div className="sc-tabs">
//                   {["Colorful", "Gold", "RoseGold", "Silver"].map((t) => (
//                     <button
//                       key={t}
//                       type="button"
//                       className={`sc-tab ${activeCharmCategory === t ? "active" : ""}`}
//                       onClick={() => setActiveCharmCategory(t)}
//                     >
//                       {t === "RoseGold" ? "Rose Gold" : t}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="sc-charm-grid">
//                   {visibleCharms.map((ch) => (
//                     <button
//                       key={ch.id}
//                       type="button"
//                       className="sc-charm"
//                       onClick={() => addCharm(ch)}
//                       title={`Add ${ch.id}`}
//                     >
//                       <img src={ch.img} alt={ch.id} />
//                       <div className="sc-charm-id">{ch.id}</div>
//                     </button>
//                   ))}
//                 </div>

//                 <button className="sc-confirm" onClick={() => setActivePanel(null)}>
//                   Done
//                 </button>
//               </>
//             )}

//             {activePanel === "letters" && (
//               <>
//                 <h3 className="sc-panel-title">Letter / Name Charm</h3>

//                 <div className="sc-field">
//                   <label>Metal</label>
//                   <div className="sc-metal-row">
//                     {METALS.map((m) => (
//                       <button
//                         key={m.key}
//                         type="button"
//                         className={`sc-chip ${letterMetal === m.key ? "selected" : ""}`}
//                         onClick={() => setLetterMetal(m.key)}
//                       >
//                         {m.ui}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="sc-field">
//                   <label>Letters / Name</label>
//                   <input
//                     className="sc-input"
//                     value={letterText}
//                     onChange={(e) => setLetterText(e.target.value)}
//                     placeholder="e.g., NICOLE or A"
//                     maxLength={12}
//                   />
//                   <div className="sc-hint">This will be added as a custom charm choice.</div>
//                 </div>

//                 <button className="sc-confirm" onClick={addLetterCharm}>
//                   Add Letter Charm
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {activePanel && <div className="sc-overlay" onClick={() => setActivePanel(null)} />}

      
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/necklace.css";

// import LengthImg from "../assets/necklace/length.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0", api: "Silver" },
//   { name: "Gold", color: "#FFD700", api: "Gold" },
//   { name: "Rose Gold", color: "#B76E79", api: "RoseGold" },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];

// const LENGTHS = [14, 16, 18, 20];
// const CHARM_COLORS = ["Multicolor", "Silver", "Gold", "RoseGold"];

// export default function CharmNecklacePage() {
//   const navigate = useNavigate();

//   const [activePanel, setActivePanel] = useState(null);

//   const [metal, setMetal] = useState(METALS[0]);
//   const [charmColor, setCharmColor] = useState("Silver");

//   const [letterCharms, setLetterCharms] = useState([]);
//   const [shapeCharms, setShapeCharms] = useState([]);

//   // one selected letter style + typed text (max 10)
//   const [selectedLetterStyle, setSelectedLetterStyle] = useState(null);
//   const [letterText, setLetterText] = useState("");

//   const [selectedShapes, setSelectedShapes] = useState([]);
//   const [confirmedCharms, setConfirmedCharms] = useState([]);

//   const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
//   const [selectedLength, setSelectedLength] = useState(16);

//   /* ---------------- FETCH CHARMS ---------------- */
//   useEffect(() => {
//     async function fetchCharms() {
//       try {
//         const [lettersRes, shapesRes] = await Promise.all([
//           fetch(`http://localhost:5000/api/charms/letters?color=${charmColor}`),
//           fetch(`http://localhost:5000/api/charms/shapes?color=${charmColor}`),
//         ]);

//         if (!lettersRes.ok)
//           throw new Error(`Letters API failed: ${lettersRes.status}`);
//         if (!shapesRes.ok)
//           throw new Error(`Shapes API failed: ${shapesRes.status}`);

//         const lettersData = await lettersRes.json();
//         const shapesData = await shapesRes.json();

//         setLetterCharms(Array.isArray(lettersData) ? lettersData : []);
//         setShapeCharms(Array.isArray(shapesData) ? shapesData : []);
//       } catch (err) {
//         console.error("Failed to fetch charms", err);
//         setLetterCharms([]);
//         setShapeCharms([]);
//       }
//     }

//     fetchCharms();
//   }, [charmColor]);

//   // Optional quality-of-life: if you change color, keep selections but clear letter text/style
//   // Remove this block if you don’t want that behavior.
//   useEffect(() => {
//     setSelectedLetterStyle(null);
//     setLetterText("");
//   }, [charmColor]);

//   /* ---------------- HELPERS ---------------- */

//   // shapes can be multi-select
//   const toggleShape = (charm) => {
//     setSelectedShapes((prev) =>
//       prev.some((c) => c.charmID === charm.charmID)
//         ? prev.filter((c) => c.charmID !== charm.charmID)
//         : [...prev, charm]
//     );
//   };

//   // letters: choose ONE style only
//   const selectLetterStyle = (styleObj) => {
//     if (selectedLetterStyle?.charmID === styleObj.charmID) {
//       setSelectedLetterStyle(null);
//       setLetterText("");
//       return;
//     }
//     setSelectedLetterStyle(styleObj);
//   };

//   // ✅ FIXED Confirm: do NOT close if invalid; always updates reliably
//   const confirmCharms = () => {
//     const trimmed = letterText.trim();

//     // If user chose a letter style, require text
//     if (selectedLetterStyle && !trimmed) {
//       alert("Please enter a word (max 10 letters) for the letter charm.");
//       return; // don't close panel
//     }

//     // If user chose nothing at all, don't close panel
//     if (!selectedLetterStyle && selectedShapes.length === 0) {
//       alert("Please select at least one charm.");
//       return;
//     }

//     const letterCustom = selectedLetterStyle
//       ? [
//           {
//             charmID: `LETTER:${selectedLetterStyle.charmID}:${charmColor}`,
//             type: "letter-custom",
//             design: selectedLetterStyle.design,
//             color: charmColor,
//             text: trimmed,
//             photoURL: selectedLetterStyle.photoURL,
//           },
//         ]
//       : [];

//     // Use functional update (extra safe)
//     setConfirmedCharms(() => [...selectedShapes, ...letterCustom]);
//     setActivePanel(null);
//   };

//   const handleSubmit = () => {
//     navigate("/checkout", {
//       state: {
//         itemType: "charm-necklace",
//         charms: confirmedCharms,
//         chain: selectedChain,
//         length: selectedLength,
//         metal,
//         letter: selectedLetterStyle
//           ? { style: selectedLetterStyle, text: letterText.trim(), color: charmColor }
//           : null,
//       },
//     });
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="nk-page">
//       <div className="nk-container">
//         <header className="nk-header">
//           <h2>Customize Your Charm Necklace</h2>
//           <p className="nk-subtitle">Select letter charms, shapes, chain, and finish.</p>
//         </header>

//         <div className="nk-customizer">
//           {/* PREVIEW */}
//           <section className="nk-preview">
//             <div className="nk-previewCard">
//               <div className="nk-previewTop">
//                 <span className="nk-badge">Live Preview</span>
//                 <span className="nk-chip">{metal.name}</span>
//               </div>

//               <div className="nk-imageWrap nk-charmPreview">
//                 {confirmedCharms.length === 0 ? (
//                   <p className="nk-placeholder">No charms selected</p>
//                 ) : (
//                   confirmedCharms.map((c) =>
//                     c.type === "letter-custom" ? (
//                       <div
//                         key={c.charmID}
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <img
//                           src={`http://localhost:5000${c.photoURL}`}
//                           alt={c.design}
//                           className="nk-charmImg"
//                         />
//                         <div style={{ fontWeight: 700 }}>{c.text}</div>
//                       </div>
//                     ) : (
//                       <img
//                         key={c.charmID}
//                         src={`http://localhost:5000${c.photoURL}`}
//                         alt={c.design}
//                         className="nk-charmImg"
//                       />
//                     )
//                   )
//                 )}
//               </div>

//               <div className="nk-previewMeta">
//                 <div className="nk-metaRow">
//                   <span>Charms</span>
//                   <strong>{confirmedCharms.length}</strong>
//                 </div>
//                 <div className="nk-metaRow">
//                   <span>Chain</span>
//                   <strong>{selectedChain.name}</strong>
//                 </div>
//                 <div className="nk-metaRow">
//                   <span>Length</span>
//                   <strong>{selectedLength}"</strong>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* CONTROLS */}
//           <section className="nk-controls">
//             <div className="nk-section">
//               <label className="nk-label">Metal</label>
//               <div className="nk-metals">
//                 {METALS.map((m) => (
//                   <button
//                     key={m.name}
//                     className={`nk-metalBtn ${metal.name === m.name ? "isActive" : ""}`}
//                     onClick={() => setMetal(m)}
//                     type="button"
//                   >
//                     <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
//                     {m.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="nk-section">
//               <label className="nk-label">Charm Color</label>
//               <select
//                 className="nk-input"
//                 value={charmColor}
//                 onChange={(e) => setCharmColor(e.target.value)}
//               >
//                 {CHARM_COLORS.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <button className="nk-rowBtn" onClick={() => setActivePanel("charms")} type="button">
//               <span>Charms</span>
//               <span>{confirmedCharms.length || "Select"}</span>
//             </button>

//             <button className="nk-rowBtn" onClick={() => setActivePanel("chain")} type="button">
//               <span>Chain & Length</span>
//               <span>
//                 {selectedChain.name} · {selectedLength}"
//               </span>
//             </button>

//             <button className="nk-next" onClick={handleSubmit} type="button">
//               Go to Checkout
//             </button>
//           </section>

//           {/* PANEL */}
//           <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
//             <div className="nk-panelHeader">
//               <h3>{activePanel === "charms" ? "Select Your Charms" : "Chain & Length"}</h3>
//               <button onClick={() => setActivePanel(null)} type="button">
//                 Close
//               </button>
//             </div>

//             <div className="nk-panelBody">
//               {activePanel === "charms" && (
//                 <>
//                   <h4>Letter Charm Style (choose 1)</h4>
//                   <div className="nk-grid">
//                     {letterCharms.map((c) => (
//                       <button
//                         key={c.charmID}
//                         className={`nk-cardPick ${
//                           selectedLetterStyle?.charmID === c.charmID ? "isActive" : ""
//                         }`}
//                         onClick={() => selectLetterStyle(c)}
//                         type="button"
//                       >
//                         <img src={`http://localhost:5000${c.photoURL}`} alt={c.design} />
//                         <small>{c.design.replace("letter ", "")}</small>
//                       </button>
//                     ))}
//                   </div>

//                   {selectedLetterStyle && (
//                     <div style={{ marginTop: 12 }}>
//                       <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
//                         Enter your word (max 10)
//                       </label>
//                       <input
//                         className="nk-input"
//                         value={letterText}
//                         onChange={(e) => setLetterText(e.target.value.slice(0, 10))}
//                         maxLength={10}
//                         placeholder="e.g. NICOLE"
//                       />
//                     </div>
//                   )}

//                   <h4 style={{ marginTop: 18 }}>Shape Charms</h4>
//                   <div className="nk-grid">
//                     {shapeCharms.map((c) => (
//                       <button
//                         key={c.charmID}
//                         className={`nk-cardPick ${
//                           selectedShapes.some((x) => x.charmID === c.charmID) ? "isActive" : ""
//                         }`}
//                         onClick={() => toggleShape(c)}
//                         type="button"
//                       >
//                         <img src={`http://localhost:5000${c.photoURL}`} alt={c.design} />
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activePanel === "chain" && (
//                 <>
//                   <h4>Chain Type</h4>
//                   <div className="nk-chainGrid">
//                     {CHAINS.map((c) => (
//                       <button
//                         key={c.name}
//                         className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
//                         onClick={() => setSelectedChain(c)}
//                         type="button"
//                       >
//                         <img src={c.img} alt={c.name} />
//                         <strong>{c.name}</strong>
//                       </button>
//                     ))}
//                   </div>

//                   <h4>Length</h4>
//                   <div className="nk-lengths">
//                     {LENGTHS.map((len) => (
//                       <button
//                         key={len}
//                         className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
//                         onClick={() => setSelectedLength(len)}
//                         type="button"
//                       >
//                         {len}"
//                       </button>
//                     ))}
//                   </div>

//                   <img src={LengthImg} alt="Length guide" />
//                 </>
//               )}
//             </div>

//             {activePanel === "charms" && (
//               <div className="nk-panelFooter">
//                 <button
//                   className="nk-confirm"
//                   type="button"
//                   onClick={confirmCharms}
//                   // Disable only when a letter style is chosen but text is empty AND no shapes selected
//                   disabled={
//                     selectedLetterStyle &&
//                     letterText.trim().length === 0 &&
//                     selectedShapes.length === 0
//                   }
//                 >
//                   Confirm Selection
//                 </button>
//               </div>
//             )}
//           </aside>

//           {activePanel && <div className="nk-overlay" onClick={() => setActivePanel(null)} />}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

const API_BASE = "http://localhost:5000";

// Change if your route name is different
const ORDER_PAGE_ROUTE = "/orderpage";

// DB constraints
const CHAIN_DB_MAP = { Cable: "cable", Rope: "rope", Box: "box", Thin: "thin" };
const NECKLACE_DB_STYLE = "free charm"; // allowed: 'name','free charm','birthstone'

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "RoseGold" },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [14, 16, 18, 20];
const CHARM_COLORS = ["Multicolor", "Silver", "Gold", "RoseGold"];

function safeNum(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

/**
 * Local cart helper (no backend needed for now).
 * Prevent duplicates by accessoryID.
 */
function addToLocalCartOnce(cartItem) {
  if (!cartItem?.accessoryID) return;

  const raw = localStorage.getItem("cart");
  const cart = raw ? JSON.parse(raw) : [];

  if (!cart.some((it) => it.accessoryID === cartItem.accessoryID)) {
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export default function CharmNecklacePage() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null);

  const [metal, setMetal] = useState(METALS[0]);
  const [charmColor, setCharmColor] = useState("Silver");

  const [letterCharms, setLetterCharms] = useState([]);
  const [shapeCharms, setShapeCharms] = useState([]);

  // letter: one style + typed word (max 10)
  const [selectedLetterStyle, setSelectedLetterStyle] = useState(null);
  const [letterText, setLetterText] = useState("");

  // shapes: multi select
  const [selectedShapes, setSelectedShapes] = useState([]);

  // confirmed design = used for summary
  const [confirmedCharms, setConfirmedCharms] = useState([]);

  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

  // UI mode: editing vs checkout-summary
  const [isCheckoutView, setIsCheckoutView] = useState(false);

  const [uiError, setUiError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  /* ---------------- FETCH CHARMS ---------------- */
  useEffect(() => {
    async function fetchCharms() {
      try {
        const [lettersRes, shapesRes] = await Promise.all([
          fetch(`${API_BASE}/api/charms/letters?color=${charmColor}`),
          fetch(`${API_BASE}/api/charms/shapes?color=${charmColor}`),
        ]);

        if (!lettersRes.ok) throw new Error(`Letters API failed: ${lettersRes.status}`);
        if (!shapesRes.ok) throw new Error(`Shapes API failed: ${shapesRes.status}`);

        const lettersData = await lettersRes.json();
        const shapesData = await shapesRes.json();

        setLetterCharms(Array.isArray(lettersData) ? lettersData : []);
        setShapeCharms(Array.isArray(shapesData) ? shapesData : []);
      } catch (err) {
        console.error("Failed to fetch charms", err);
        setLetterCharms([]);
        setShapeCharms([]);
      }
    }

    fetchCharms();
  }, [charmColor]);

  /* ---------------- HELPERS ---------------- */

  const toggleShape = (charm) => {
    setUiError("");
    setSelectedShapes((prev) =>
      prev.some((c) => c.charmID === charm.charmID)
        ? prev.filter((c) => c.charmID !== charm.charmID)
        : [...prev, charm]
    );
  };

  const selectLetterStyleFn = (styleObj) => {
    setUiError("");
    if (selectedLetterStyle?.charmID === styleObj.charmID) {
      setSelectedLetterStyle(null);
      setLetterText("");
      return;
    }
    setSelectedLetterStyle(styleObj);
  };

  const letterInConfirmed = useMemo(
    () => confirmedCharms.find((c) => c.type === "letter-custom") || null,
    [confirmedCharms]
  );

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name] || null,
    [selectedChain]
  );

  /**
   * Confirm in panel -> locks design selection (no API call)
   */
  const confirmSelection = () => {
    setUiError("");

    const trimmed = letterText.trim().slice(0, 10);

    // constraint: cannot confirm letter style without text
    if (selectedLetterStyle && !trimmed) {
      setUiError("Enter the letters/word (max 10) before confirming a letter charm.");
      return;
    }

    const letterCustom = selectedLetterStyle
      ? [
          {
            charmID: selectedLetterStyle.charmID, // REAL charmID from DB
            type: "letter-custom",
            design: selectedLetterStyle.design,
            color: charmColor,
            text: trimmed,
            photoURL: selectedLetterStyle.photoURL,
            price: selectedLetterStyle.price,
          },
        ]
      : [];

    setConfirmedCharms([...selectedShapes, ...letterCustom]);
    setActivePanel(null);
    setIsCheckoutView(false);
  };

  /**
   * “Go to Checkout” (NO API) - just opens summary
   */
  const goToCheckoutView = () => {
    setUiError("");

    if (confirmedCharms.length === 0) {
      setUiError("Please confirm your charms selection first.");
      return;
    }

    // safety: if letter exists, must have text
    if (letterInConfirmed && !letterInConfirmed.text?.trim()) {
      setUiError("Letter charm requires text (max 10).");
      return;
    }

    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    setIsCheckoutView(true);
  };

  /**
   * “Edit Design” - return to editing mode
   */
  const editDesign = () => {
    setUiError("");
    setIsCheckoutView(false);
    setActivePanel("charms");
  };

  /**
   * Estimated total = charms prices + material base (if you don’t have material price here,
   * this will only sum charms. If you DO have metal base price from backend, plug it here.)
   */
  const estimatedTotal = useMemo(() => {
    const charmsSum = confirmedCharms.reduce((sum, c) => sum + safeNum(c.price), 0);
    // If you later fetch metal price, replace 0 with that metal price.
    const metalBase = 0;
    return charmsSum + metalBase;
  }, [confirmedCharms]);

  const charmSummaryList = useMemo(() => {
    return confirmedCharms.map((c) => {
      const id = c.charmID;
      const design = c.design || "Charm";
      const color = c.color || charmColor || "—";
      const extra = c.type === "letter-custom" ? ` (Text: ${c.text || ""})` : "";
      return {
        key: `${id}-${c.type || "shape"}`,
        id,
        label: `${design}${extra}`,
        color,
      };
    });
  }, [confirmedCharms, charmColor]);

  /**
   * “Confirm and Pay” = ONLY place to call POST /api/accessory-instance
   * then add to cart ONCE and navigate to OrderPage.
   */
  const confirmAndPay = async () => {
    setUiError("");

    if (!isCheckoutView) {
      setUiError("Click 'Go to Checkout' first to review your order summary.");
      return;
    }

    if (!confirmedCharms.length) {
      setUiError("No charms confirmed.");
      return;
    }

    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    if (letterInConfirmed && !letterInConfirmed.text?.trim()) {
      setUiError("Letter charm requires text (max 10).");
      return;
    }

    setIsPaying(true);

    try {
      // IMPORTANT: Your accessoryInstanceModel expects charms as objects with charmID/quantity
      const payload = {
        type: "necklace",
        metal: metal.api, // controller resolves materialID
        nbOfCharms: confirmedCharms.length,
        nbOfStones: 0,
        product: {
          chain: chainDbValue, // cable/thin/rope/box
          style: NECKLACE_DB_STYLE, // 'free charm'
          length: selectedLength,
        },
        charms: confirmedCharms.map((c) => ({
          charmID: c.charmID,
          quantity: 1,
          // optional for your app logic (DB doesn’t use this column in ornaments)
          text: c.type === "letter-custom" ? c.text : null,
        })),
        stones: [],
      };

      const res = await fetch(`${API_BASE}/api/accessory-instance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const details = data?.sqlMessage || data?.error || data?.message || `Failed (${res.status})`;
        throw new Error(details);
      }

      const accessoryID = data?.accessoryID;
      const computedPrice = data?.computedPrice;

      if (!accessoryID) {
        throw new Error("Backend did not return accessoryID.");
      }

      // ✅ Add to cart ONCE
      addToLocalCartOnce({
        accessoryID,
        type: "necklace",
        style: "free charm",
        metal: metal.name,
        chain: selectedChain.name,
        length: selectedLength,
        charmColor,
        charms: confirmedCharms.map((c) => ({
          charmID: c.charmID,
          design: c.design,
          color: c.color,
          text: c.type === "letter-custom" ? c.text : null,
          price: c.price,
        })),
        price: computedPrice ?? estimatedTotal,
      });

      // ✅ go to OrderPage (as you asked)
      navigate(ORDER_PAGE_ROUTE);
    } catch (err) {
      console.error("confirmAndPay error:", err);
      setUiError(err.message || "Confirm & Pay failed.");
    } finally {
      setIsPaying(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Charm Necklace</h2>
          <p className="nk-subtitle">Build your design, then review summary, then Confirm & Pay.</p>
        </header>

        {uiError ? (
          <div
            style={{
              marginBottom: 12,
              padding: 10,
              borderRadius: 10,
              background: "#ffe7e7",
              fontWeight: 700,
            }}
          >
            {uiError}
          </div>
        ) : null}

        <div className="nk-customizer">
          {/* LEFT: SUMMARY / PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">
                  {isCheckoutView ? "Checkout Summary" : "Order Summary"}
                </span>
              </div>

              {/* images */}
              <div className="nk-imageWrap nk-charmPreview">
                {confirmedCharms.length === 0 ? (
                  <p className="nk-placeholder">No charms confirmed yet.</p>
                ) : (
                  confirmedCharms.map((c) => (
                    <img
                      key={`${c.charmID}-${c.type || "shape"}`}
                      src={`${API_BASE}${c.photoURL}`}
                      alt={c.design || "charm"}
                      className="nk-charmImg"
                    />
                  ))
                )}
              </div>

              {/* details */}
              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Metal</span>
                  <strong>{metal?.name || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Chain</span>
                  <strong>{selectedChain?.name || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Length</span>
                  <strong>{selectedLength}"</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Charm Color</span>
                  <strong>{charmColor}</strong>
                </div>

                {/* LIST OF CHARMS (IDs + color + name) */}
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Charms</div>
                  {charmSummaryList.length === 0 ? (
                    <div style={{ opacity: 0.8 }}>—</div>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {charmSummaryList.map((x) => (
                        <li key={x.key} style={{ marginBottom: 4 }}>
                          <strong>{x.id}</strong> — {x.label} — <em>{x.color}</em>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="nk-metaRow" style={{ marginTop: 10 }}>
                  <span>Total (estimated)</span>
                  <strong>${estimatedTotal.toFixed(2)}</strong>
                </div>
              </div>

              {/* when in checkout-view show the pay buttons here (like your screenshot) */}
              {isCheckoutView && (
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <button
                    className="nk-next"
                    type="button"
                    onClick={confirmAndPay}
                    disabled={isPaying}
                    style={{ flex: 1 }}
                  >
                    {isPaying ? "Processing..." : "Confirm and Pay"}
                  </button>

                  <button
                    type="button"
                    onClick={editDesign}
                    style={{
                      flex: 0,
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid #999",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Edit Design
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: CONTROLS */}
          <section className="nk-controls">
            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    className={`nk-metalBtn ${metal.name === m.name ? "isActive" : ""}`}
                    onClick={() => {
                      setUiError("");
                      setMetal(m);
                      setIsCheckoutView(false);
                    }}
                    type="button"
                  >
                    <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="nk-section">
              <label className="nk-label">Charm Color</label>
              <select
                className="nk-input"
                value={charmColor}
                onChange={(e) => {
                  setUiError("");
                  setCharmColor(e.target.value);
                  setIsCheckoutView(false);
                }}
              >
                {CHARM_COLORS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              className="nk-rowBtn"
              onClick={() => {
                setUiError("");
                setActivePanel("charms");
                setIsCheckoutView(false);
              }}
              type="button"
            >
              <span>Charms</span>
              <span>{confirmedCharms.length || "Select"}</span>
            </button>

            <button
              className="nk-rowBtn"
              onClick={() => {
                setUiError("");
                setActivePanel("chain");
                setIsCheckoutView(false);
              }}
              type="button"
            >
              <span>Chain & Length</span>
              <span>
                {selectedChain.name} · {selectedLength}"
              </span>
            </button>

            {/* ✅ This is the UI-only checkout step */}
            <button className="nk-next" onClick={goToCheckoutView} type="button">
              Go to Checkout
            </button>
          </section>

          {/* SIDE PANEL */}
          <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
            <div className="nk-panelHeader">
              <h3>{activePanel === "charms" ? "Select Your Charms" : "Chain & Length"}</h3>
              <button onClick={() => setActivePanel(null)} type="button">
                Close
              </button>
            </div>

            <div className="nk-panelBody">
              {activePanel === "charms" && (
                <>
                  <h4>Letter Charm Style (choose 1)</h4>
                  <div className="nk-grid">
                    {letterCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${selectedLetterStyle?.charmID === c.charmID ? "isActive" : ""}`}
                        onClick={() => selectLetterStyleFn(c)}
                        type="button"
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                        <small>{(c.design || "").replace("letter ", "")}</small>
                      </button>
                    ))}
                  </div>

                  {selectedLetterStyle && (
                    <div style={{ marginTop: 12 }}>
                      <label style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
                        Enter your word (required, max 10)
                      </label>
                      <input
                        className="nk-input"
                        value={letterText}
                        onChange={(e) => {
                          setUiError("");
                          setLetterText(e.target.value.slice(0, 10));
                        }}
                        maxLength={10}
                        placeholder="e.g. NICOLE"
                      />
                    </div>
                  )}

                  <h4 style={{ marginTop: 18 }}>Shape Charms</h4>
                  <div className="nk-grid">
                    {shapeCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${selectedShapes.some((x) => x.charmID === c.charmID) ? "isActive" : ""}`}
                        onClick={() => toggleShape(c)}
                        type="button"
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activePanel === "chain" && (
                <>
                  <h4>Chain Type</h4>
                  <div className="nk-chainGrid">
                    {CHAINS.map((c) => (
                      <button
                        key={c.name}
                        className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedChain(c);
                          setIsCheckoutView(false);
                        }}
                        type="button"
                      >
                        <img src={c.img} alt={c.name} />
                        <strong>{c.name}</strong>
                      </button>
                    ))}
                  </div>

                  <h4>Length</h4>
                  <div className="nk-lengths">
                    {LENGTHS.map((len) => (
                      <button
                        key={len}
                        className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedLength(len);
                          setIsCheckoutView(false);
                        }}
                        type="button"
                      >
                        {len}"
                      </button>
                    ))}
                  </div>

                  <img src={LengthImg} alt="Length guide" />
                </>
              )}
            </div>

            {activePanel === "charms" && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" onClick={confirmSelection} type="button">
                  Confirm Selection
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={() => setActivePanel(null)} />}
        </div>
      </div>
    </div>
  );
}
