
// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/earring.css";

// // ---- IMAGES ----
// import birthstoneEarringImg from "../assets/Earring/birthstoneearing.jpg";
// import danglingImg from "../assets/Earring/dangling1.jpg";
// import danglingCharmImg from "../assets/Earring/danglingwithcharm.jpeg";
// import hoopRoundImg from "../assets/Earring/hoopround.jpg";
// import hoopRoundGemImg from "../assets/Earring/hooproundwithgem.jpeg";
// import hoopSquareImg from "../assets/Earring/hoopsquare.png";
// import hoopSquareGemImg from "../assets/Earring/hoopsquarewithgem.png";
// import hoopCharmImg from "../assets/Earring/hoopwithcharm.jpeg";
// import birthstoneImg from "../assets/gems/birthstone.jpeg";
// // Cuts
// import CutOval from "../assets/Cuts/oval.jpeg";
// import CutPear from "../assets/Cuts/pear.jpeg";
// import CutPrincess from "../assets/Cuts/princess.jpeg";
// import CutRound from "../assets/Cuts/round.jpg";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const BACKINGS = [
//   { name: "Push Back", value: "push" },
//   { name: "Screw Back", value: "screw" },
 
// ];

// const CUTS = [
//   { key: "Round", img: CutRound },
//   { key: "Oval", img: CutOval },
//   { key: "Pear", img: CutPear },
//   { key: "Princess", img: CutPrincess },
// ];

// const CHARM_STYLES = [
//   { name: "Hoop Round", img: hoopRoundImg },
//   { name: "Hoop Square", img: hoopSquareImg },
//   { name: "Dangling", img: danglingImg },
//   { name: "Hoop with Charm", img: hoopCharmImg },
//   { name: "Dangling with Charm", img: danglingCharmImg },
// ];

// export default function EarringsPage() {
//   const navigate = useNavigate();
  
//   const [type, setType] = useState(null); // "birthstone" | "charm"
//   const [backing, setBacking] = useState(null);
//   const [metal, setMetal] = useState("");
  
//   // Birthstone specific
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedCut, setSelectedCut] = useState(null);
  
//   // Charm specific
//   const [charmStyle, setCharmStyle] = useState(null);
//   const [earringColor, setEarringColor] = useState("");
//   const [charmColor, setCharmColor] = useState("");

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

//   const onPickMonth = (m) => {
//     setSelectedMonth(m);
//     setSelectedColor(null);
//   };

//   const canProceedBirthstone = !!selectedMonth && !!selectedColor && !!selectedCut && !!metal && !!backing;
//   const canProceedCharm = !!charmStyle && !!earringColor && !!charmColor && !!metal && !!backing;

//   const handleSubmit = () => {
//     if (type === "birthstone") {
//       if (!canProceedBirthstone) {
//         alert("Please complete all selections for birthstone earrings");
//         return;
//       }
//       navigate("/checkout", {
//         state: {
//           itemType: "birthstone_earring",
//           metal,
//           backing,
//           birthstoneMonth: selectedMonth.month,
//           birthstoneName: selectedMonth.stone,
//           birthstoneColor: selectedColor,
//           birthstoneCut: selectedCut,
//         },
//       });
//     } else if (type === "charm") {
//       if (!canProceedCharm) {
//         alert("Please complete all selections for charm earrings");
//         return;
//       }
//       navigate("/checkout", {
//         state: {
//           itemType: "charm_earring",
//           metal,
//           backing,
//           charmStyle: charmStyle.name,
//           earringColor,
//           charmColor,
//         },
//       });
//     }
//   };

//   // Initial type selection
//   if (!type) {
//     return (
//       <div className="ear-page">
//         <header className="ear-hero">
//           <h1 className="ear-title">Design Your Earrings</h1>
//           <p className="ear-subtitle">A piece made just for you</p>
//         </header>

//         <div className="ear-typeGrid">
//           <button className="ear-typeCard" onClick={() => setType("birthstone")}>
//             <div className="ear-typeImg">
//               <img src={birthstoneEarringImg} alt="Birthstone Earrings" />
//             </div>
//             <h3>Birthstone</h3>
//             <p>Personal. Meaningful. Timeless.</p>
//           </button>

//           <button className="ear-typeCard" onClick={() => setType("charm")}>
//             <div className="ear-typeImg">
//               <img src={hoopCharmImg} alt="Charm Earrings" />
//             </div>
//             <h3>Charm</h3>
//             <p>Create your own story</p>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Birthstone Flow
//   if (type === "birthstone") {
//     return (
//       <div className="ear-page">
//         <div className="ear-container">
//           <header className="ear-header">
//             <h2>Birthstone Earrings</h2>
//             <p className="ear-headerSub">Select month, color, cut, metal and backing.</p>
//           </header>

//           <div className="ear-customizer">
//             {/* LEFT PREVIEW */}
//             <section className="ear-preview">
//               <div className="ear-previewCard">
//                 <div className="ear-previewTop">
//                   <span className="ear-badge">Live Preview</span>
//                   <span className="ear-chip">
//                     {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
//                   </span>
//                 </div>

//                 <div className="ear-previewGrid">
//                   <div className="ear-imageWrap">
//                     <img src={birthstoneEarringImg} alt="Earring preview" className="ear-mainImg" />
//                     <div className="ear-floatTag">Earring</div>
//                   </div>

//                   <div className="ear-imageWrap ear-imageWrapSoft">
//                     <img src={birthstoneImg} alt="Gem color preview" className="ear-mainImg" />
//                     <div className="ear-floatTag">Gem Color</div>

//                     <div className="ear-colorBadge">
//                       <span
//                         className={`ear-colorDot ${selectedColor ? "on" : ""}`}
//                         style={{ backgroundColor: selectedColor?.hex || "#ece7ef" }}
//                       />
//                       <span className="ear-colorBadgeText">
//                         {selectedColor ? selectedColor.label : "Pick a color"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="ear-meta">
//                   <div className="ear-row"><span>Month</span><strong>{selectedMonth ? selectedMonth.full : "—"}</strong></div>
//                   <div className="ear-row"><span>Stone</span><strong>{selectedMonth ? selectedMonth.stone : "—"}</strong></div>
//                   <div className="ear-row"><span>Cut</span><strong>{selectedCut || "—"}</strong></div>
//                   <div className="ear-row"><span>Backing</span><strong>{backing ? BACKINGS.find(b => b.value === backing)?.name : "—"}</strong></div>
//                 </div>
//               </div>
//             </section>

//             {/* RIGHT CONTROLS */}
//             <section className="ear-controls">
//               <div className="ear-section">
//                 <label className="ear-label">Month</label>
//                 <div className="ear-monthGrid">
//                   {birthstones.map((b) => (
//                     <button
//                       key={b.month}
//                       type="button"
//                       className={`ear-monthBtn ${selectedMonth?.month === b.month ? "isActive" : ""}`}
//                       onClick={() => onPickMonth(b)}
//                     >
//                       {b.month}
//                     </button>
//                   ))}
//                 </div>
//                 <p className="ear-help">Choosing a month unlocks its gem colors.</p>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Gem Color</label>
//                 {!selectedMonth ? (
//                   <div className="ear-lockCard">Select a month first.</div>
//                 ) : (
//                   <div className="ear-colorGrid">
//                     {selectedMonth.colors.map((c) => (
//                       <button
//                         key={c.label}
//                         type="button"
//                         className={`ear-colorBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
//                         onClick={() => setSelectedColor(c)}
//                       >
//                         <span className="ear-colorSwatch" style={{ backgroundColor: c.hex }} />
//                         <span className="ear-colorText">{c.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Cut</label>
//                 <div className="ear-cutGrid">
//                   {CUTS.map((c) => (
//                     <button
//                       key={c.key}
//                       type="button"
//                       className={`ear-cutCard ${selectedCut === c.key ? "isActive" : ""}`}
//                       onClick={() => setSelectedCut(c.key)}
//                     >
//                       <img className="ear-cutImg" src={c.img} alt={c.key} />
//                       <div className="ear-cutName">{c.key}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Metal</label>
//                 <div className="ear-metals">
//                   {METALS.map((m) => (
//                     <button
//                       key={m.name}
//                       type="button"
//                       className={`ear-metalBtn ${metal === m.color ? "isActive" : ""}`}
//                       onClick={() => setMetal(m.color)}
//                     >
//                       <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
//                       <span className="ear-metalName">{m.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Backing Type</label>
//                 <div className="ear-backingGrid">
//                   {BACKINGS.map((b) => (
//                     <button
//                       key={b.value}
//                       type="button"
//                       className={`ear-backingBtn ${backing === b.value ? "isActive" : ""}`}
//                       onClick={() => setBacking(b.value)}
//                     >
//                       {b.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button className="ear-next" type="button" onClick={handleSubmit} disabled={!canProceedBirthstone}>
//                 Order Summary
//               </button>

//               {!canProceedBirthstone && (
//                 <p className="ear-error">Required: Month, Color, Cut, Metal, Backing.</p>
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Charm Flow
//   if (type === "charm") {
//     return (
//       <div className="ear-page">
//         <div className="ear-container">
//           <header className="ear-header">
//             <h2>Charm Earrings</h2>
//             <p className="ear-headerSub">Select style, colors, metal and backing.</p>
//           </header>

//           <div className="ear-customizer">
//             {/* LEFT PREVIEW */}
//             <section className="ear-preview">
//               <div className="ear-previewCard">
//                 <div className="ear-previewTop">
//                   <span className="ear-badge">Live Preview</span>
//                   <span className="ear-chip">
//                     {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
//                   </span>
//                 </div>

//                 <div className="ear-previewSingle">
//                   <img 
//                     src={charmStyle ? charmStyle.img : hoopCharmImg} 
//                     alt="Charm earring preview" 
//                     className="ear-mainImg" 
//                   />
//                 </div>

//                 <div className="ear-meta">
//                   <div className="ear-row"><span>Style</span><strong>{charmStyle ? charmStyle.name : "—"}</strong></div>
//                   <div className="ear-row"><span>Earring Color</span><strong>{earringColor ? METALS.find(m => m.color === earringColor)?.name : "—"}</strong></div>
//                   <div className="ear-row"><span>Charm Color</span><strong>{charmColor || "—"}</strong></div>
//                   <div className="ear-row"><span>Backing</span><strong>{backing ? BACKINGS.find(b => b.value === backing)?.name : "—"}</strong></div>
//                 </div>
//               </div>
//             </section>

//             {/* RIGHT CONTROLS */}
//             <section className="ear-controls">
//               <div className="ear-section">
//                 <label className="ear-label">Style</label>
//                 <div className="ear-styleGrid">
//                   {CHARM_STYLES.map((s) => (
//                     <button
//                       key={s.name}
//                       type="button"
//                       className={`ear-styleCard ${charmStyle?.name === s.name ? "isActive" : ""}`}
//                       onClick={() => setCharmStyle(s)}
//                     >
//                       <img src={s.img} alt={s.name} className="ear-styleImg" />
//                       <div className="ear-styleName">{s.name}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Earring Color</label>
//                 <div className="ear-metals">
//                   {METALS.map((m) => (
//                     <button
//                       key={m.name}
//                       type="button"
//                       className={`ear-metalBtn ${earringColor === m.color ? "isActive" : ""}`}
//                       onClick={() => setEarringColor(m.color)}
//                     >
//                       <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
//                       <span className="ear-metalName">{m.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Charm Color</label>
//                 <p className="ear-help">Images will be added later</p>
//                 <input 
//                   type="text" 
//                   className="ear-textInput"
//                   placeholder="Enter charm color (e.g., Pink, Blue)"
//                   value={charmColor}
//                   onChange={(e) => setCharmColor(e.target.value)}
//                 />
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Metal</label>
//                 <div className="ear-metals">
//                   {METALS.map((m) => (
//                     <button
//                       key={m.name}
//                       type="button"
//                       className={`ear-metalBtn ${metal === m.color ? "isActive" : ""}`}
//                       onClick={() => setMetal(m.color)}
//                     >
//                       <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
//                       <span className="ear-metalName">{m.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="ear-section">
//                 <label className="ear-label">Backing Type</label>
//                 <div className="ear-backingGrid">
//                   {BACKINGS.map((b) => (
//                     <button
//                       key={b.value}
//                       type="button"
//                       className={`ear-backingBtn ${backing === b.value ? "isActive" : ""}`}
//                       onClick={() => setBacking(b.value)}
//                     >
//                       {b.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button className="ear-next" type="button" onClick={handleSubmit} disabled={!canProceedCharm}>
//                 Order Summary
//               </button>

//               {!canProceedCharm && (
//                 <p className="ear-error">Required: Style, Earring Color, Charm Color, Metal, Backing.</p>
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/earring.css";

// Images
import birthstoneEarringImg from "../assets/Earring/birthstoneearing.jpg";
import hoopCharmImg from "../assets/Earring/hoopwithcharm.jpeg";

export default function EarringsPage() {
  const navigate = useNavigate();

  return (
    <div className="ear-page">
      <header className="ear-hero">
        <h1 className="ear-title">Design Your Earrings</h1>
        <p className="ear-subtitle">Choose your style to begin</p>
      </header>

      <div className="ear-typeGrid">
        {/* BIRTHSTONE */}
        <button
          className="ear-typeCard"
          onClick={() => navigate("/earrings/birthstone")}
        >
          <div className="ear-typeImg">
            <img src={birthstoneEarringImg} alt="Birthstone Earrings" />
          </div>
          <h3>Birthstone Earrings</h3>
          <p>Personal, meaningful, and timeless</p>
        </button>

        {/* CHARM */}
        <button
          className="ear-typeCard"
          onClick={() => navigate("/earrings/charm")}
        >
          <div className="ear-typeImg">
            <img src={hoopCharmImg} alt="Charm Earrings" />
          </div>
          <h3>Charm Earrings</h3>
          <p>Create your own story</p>
        </button>
      </div>
    </div>
  );
}
