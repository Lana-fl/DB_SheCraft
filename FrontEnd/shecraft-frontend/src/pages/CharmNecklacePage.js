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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

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

export default function CharmNecklacePage() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null);

  const [metal, setMetal] = useState(METALS[0]);
  const [charmColor, setCharmColor] = useState("Silver");

  const [letterCharms, setLetterCharms] = useState([]);
  const [shapeCharms, setShapeCharms] = useState([]);

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [confirmedCharms, setConfirmedCharms] = useState([]);

  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

  /* ---------------- FETCH CHARMS ---------------- */

  useEffect(() => {
    async function fetchCharms() {
      try {
        const [lettersRes, shapesRes] = await Promise.all([
          fetch(
            `http://localhost:5000/api/charms/letters?color=${charmColor}`
          ),
          fetch(
            `http://localhost:5000/api/charms/shapes?color=${charmColor}`
          ),
        ]);

        setLetterCharms(await lettersRes.json());
        setShapeCharms(await shapesRes.json());
      } catch (err) {
        console.error("Failed to fetch charms", err);
      }
    }

    fetchCharms();
  }, [charmColor]);

  /* ---------------- HELPERS ---------------- */

  const toggleCharm = (charm, type) => {
    const list = type === "letter" ? selectedLetters : selectedShapes;
    const setList = type === "letter" ? setSelectedLetters : setSelectedShapes;

    if (list.some((c) => c.charmID === charm.charmID)) {
      setList(list.filter((c) => c.charmID !== charm.charmID));
    } else {
      setList([...list, charm]);
    }
  };

  const confirmCharms = () => {
    setConfirmedCharms([...selectedLetters, ...selectedShapes]);
    setActivePanel(null);
  };

  const handleSubmit = () => {
    navigate("/checkout", {
      state: {
        itemType: "charm-necklace",
        charms: confirmedCharms,
        chain: selectedChain,
        length: selectedLength,
        metal,
      },
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Charm Necklace</h2>
          <p className="nk-subtitle">
            Select letter charms, shapes, chain, and finish.
          </p>
        </header>

        <div className="nk-customizer">
          {/* PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">{metal.name}</span>
              </div>

              <div className="nk-imageWrap nk-charmPreview">
                {confirmedCharms.length === 0 ? (
                  <p className="nk-placeholder">No charms selected</p>
                ) : (
                  confirmedCharms.map((c) => (
                    <img
                      key={c.charmID}
                      src={c.photoURL}
                      alt={c.design}
                      className="nk-charmImg"
                    />
                  ))
                )}
              </div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Charms</span>
                  <strong>{confirmedCharms.length}</strong>
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

          {/* CONTROLS */}
          <section className="nk-controls">
            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    className={`nk-metalBtn ${
                      metal.name === m.name ? "isActive" : ""
                    }`}
                    onClick={() => setMetal(m)}
                  >
                    <span
                      className="nk-metalDot"
                      style={{ backgroundColor: m.color }}
                    />
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
                onChange={(e) => setCharmColor(e.target.value)}
              >
                {CHARM_COLORS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              className="nk-rowBtn"
              onClick={() => setActivePanel("charms")}
            >
              <span>Charms</span>
              <span>{confirmedCharms.length || "Select"}</span>
            </button>

            <button
              className="nk-rowBtn"
              onClick={() => setActivePanel("chain")}
            >
              <span>Chain & Length</span>
              <span>
                {selectedChain.name} · {selectedLength}"
              </span>
            </button>

            <button className="nk-next" onClick={handleSubmit}>
              Next to Designer
            </button>
          </section>

          {/* PANEL */}
          <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
            <div className="nk-panelHeader">
              <h3>
                {activePanel === "charms"
                  ? "Select Your Charms"
                  : "Chain & Length"}
              </h3>
              <button onClick={() => setActivePanel(null)}>Close</button>
            </div>

            <div className="nk-panelBody">
              {activePanel === "charms" && (
                <>
                  <h4>Letter Charms</h4>
                  <div className="nk-grid">
                    {letterCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${
                          selectedLetters.some(
                            (x) => x.charmID === c.charmID
                          )
                            ? "isActive"
                            : ""
                        }`}
                        onClick={() => toggleCharm(c, "letter")}
                      >
                        <img src={c.photoURL} alt={c.design} />
                        <small>{c.design.replace("letter ", "")}</small>
                      </button>
                    ))}
                  </div>

                  <h4>Shape Charms</h4>
                  <div className="nk-grid">
                    {shapeCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${
                          selectedShapes.some(
                            (x) => x.charmID === c.charmID
                          )
                            ? "isActive"
                            : ""
                        }`}
                        onClick={() => toggleCharm(c, "shape")}
                      >
                        <img src={c.photoURL} alt="shape charm" />
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
                        className={`nk-chainCard ${
                          selectedChain.name === c.name ? "isActive" : ""
                        }`}
                        onClick={() => setSelectedChain(c)}
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
                        className={`nk-lengthBtn ${
                          selectedLength === len ? "isActive" : ""
                        }`}
                        onClick={() => setSelectedLength(len)}
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
                <button className="nk-confirm" onClick={confirmCharms}>
                  Confirm Selection
                </button>
              </div>
            )}
          </aside>

          {activePanel && (
            <div className="nk-overlay" onClick={() => setActivePanel(null)} />
          )}
        </div>
      </div>
    </div>
  );
}

