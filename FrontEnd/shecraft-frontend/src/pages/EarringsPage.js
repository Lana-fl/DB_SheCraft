// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/earring.css";

// // ---- IMAGES (from your assets) ----
// import birthstoneImg from "../assets/Earring/birthstoneearing.jpg";
// import danglingImg from "../assets/Earring/dangling1.jpg";
// import danglingCharmImg from "../assets/Earring/danglingwithcharm.jpeg";
// import hoopRoundImg from "../assets/Earring/hoopround.jpg";
// import hoopRoundGemImg from "../assets/Earring/hooproundwithgem.jpeg";
// import hoopSquareImg from "../assets/Earring/hoopsquare.png";
// import hoopSquareGemImg from "../assets/Earring/hoopsquarewithgem.png";
// import hoopCharmImg from "../assets/Earring/hoopwithcharm.jpeg";


// const birthstones = [
//   { id: 1, name: "Garnet", color: "#8b1e2d" },
//   { id: 2, name: "Amethyst", color: "#7b4fa3" },
//   { id: 3, name: "Aquamarine", color: "#7fd6e8" },
//   { id: 4, name: "Emerald", color: "#1f8f4a" },
//   { id: 5, name: "Ruby", color: "#b11226" },
// ];

// const materials = [
//   { label: "Gold", color: "#d4af37" },
//   { label: "Silver", color: "#cfd3d6" },
//   { label: "Rose Gold", color: "#d8a39d" },
//   { label: "14k Gold", color: "#c9a44c" },
//   { label: "14k Silver", color: "#bfc3c7" },
// ];

// export default function EarringsPage() {
//   const [type, setType] = useState(null);
//   const [style, setStyle] = useState(null);
//   const [birthstone, setBirthstone] = useState(null);
//   const [material, setMaterial] = useState(null);

//   return (
//     <div className="earring-page">
//       <h1 className="page-title">Design Your Earrings</h1>
//       <p className="page-sub">A piece made just for you </p>

//       {!type && (
//         <section className="choice-grid">
//           <ChoiceCard
//             img={birthstoneImg}
//             title="Birthstone"
//             subtitle="Personal. Meaningful. Timeless."
//             onClick={() => setType("birthstone")}
//           />
//           <ChoiceCard
//             img={hoopCharmImg}
//             title="Charm"
//             subtitle="Create your own story"
//             onClick={() => setType("charm")}
//           />
//         </section>
//       )}

//       {type && !style && (
//         <section>
//           <h2 className="step-title">Choose your style</h2>
//           <div className="style-grid">
//             {type === "birthstone" && (
//               <>
//                 <StyleCard img={hoopRoundGemImg} label="Hoop Round" onClick={() => setStyle("hoop round")} />
//                 <StyleCard img={hoopSquareGemImg} label="Hoop Square" onClick={() => setStyle("hoop square")} />
//                 <StyleCard img={danglingImg} label="Dangling" onClick={() => setStyle("dangling")} />
//               </>
//             )}

//             {type === "charm" && (
//               <>
//                 <StyleCard img={hoopCharmImg} label="Hoop" onClick={() => setStyle("hoop")} />
//                 <StyleCard img={danglingCharmImg} label="Dangling" onClick={() => setStyle("dangling")} />
//               </>
//             )}
//           </div>
//         </section>
//       )}

//       {type === "birthstone" && style && !birthstone && (
//         <section>
//           <h2 className="step-title">Choose your gemstone</h2>
//           <div className="stone-grid">
//             {birthstones.map((s) => (
//               <button
//                 key={s.id}
//                 className="stone-circle"
//                 style={{ backgroundColor: s.color }}
//                 onClick={() => setBirthstone(s)}
//                 title={s.name}
//               />
//             ))}
//           </div>
//         </section>
//       )}

//       {(birthstone || type === "charm") && !material && (
//         <section>
//           <h2 className="step-title">Choose your material</h2>
//           <div className="material-grid">
//             {materials.map((m) => (
//               <div
//                 key={m.label}
//                 className="material-card"
//                 onClick={() => setMaterial(m.label)}
//               >
//                 <span className="material-swatch" style={{ backgroundColor: m.color }} />
//                 <p>{m.label}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {material && (
//         <section className="final-box">
//           <h2>Your Earring</h2>
//           <p>
//             {type} • {style} • {material}
//             {birthstone && ` • ${birthstone.name}`}
//           </p>
//           <button className="add-btn">Add to Cart</button>
//         </section>
//       )}
//     </div>
//   );
// }

// function StyleCard({ img, label, onClick }) {
//   return (
//     <div className="style-card" onClick={onClick}>
//       <img src={img} alt={label} />
//       <h4>{label}</h4>
//     </div>
//   );
// }

// function ChoiceCard({ img, title, subtitle, onClick }) {
//   return (
//     <div className="choice-card" onClick={onClick}>
//       <img src={img} alt={title} />
//       <h3>{title}</h3>
//       <p>{subtitle}</p>
//     </div>
//   );
// }
// import React, { useState, useMemo } from "react";
// import "../styles/earring.css";

// // images
// import BirthstoneImg from "../assets/Earring/birthstoneearing.jpg";
// import HoopRoundImg from "../assets/Earring/hoopround.jpg";
// import HoopSquareImg from "../assets/Earring/hoopsquare.png";
// import DanglingImg from "../assets/Earring/dangling1.jpg";

// const METALS = [
//   { name: "Gold", color: "#d4af37" },
//   { name: "Silver", color: "#cfd3d6" },
//   { name: "Rose Gold", color: "#d8a39d" },
//   { name: "14k Gold", color: "#c9a44c" },
//   { name: "14k Silver", color: "#bfc3c7" },
// ];

// export default function EarringsPage() {
//   const [step, setStep] = useState(1);
//   const [type, setType] = useState(null);
//   const [style, setStyle] = useState(null);
//   const [month, setMonth] = useState(null);
//   const [color, setColor] = useState(null);
//   const [metal, setMetal] = useState(null);

//   const birthstones = useMemo(() => [
//     { month: "Jan", stone: "Garnet", colors: ["#7b0f1b"] },
//     { month: "Feb", stone: "Amethyst", colors: ["#6d2c91"] },
//     { month: "Mar", stone: "Aquamarine", colors: ["#7fd6e6"] },
//     { month: "Apr", stone: "Diamond", colors: ["#e9edf2"] },
//     { month: "May", stone: "Emerald", colors: ["#1f8a4c"] },
//     { month: "Jun", stone: "Pearl", colors: ["#f2efe8"] },
//     { month: "Jul", stone: "Ruby", colors: ["#b10f2e"] },
//     { month: "Aug", stone: "Peridot", colors: ["#7fcf3a"] },
//     { month: "Sep", stone: "Sapphire", colors: ["#163f99"] },
//     { month: "Oct", stone: "Opal", colors: ["#d7f2f1"] },
//     { month: "Nov", stone: "Citrine", colors: ["#f1b31c"] },
//     { month: "Dec", stone: "Blue Topaz", colors: ["#2ea7ff"] },
//   ], []);

//   const selectedBirthstone = birthstones.find(b => b.month === month);

//   return (
//     <div className="earring-page">

//       {/* STEP 1 — TYPE */}
//       {step === 1 && (
//         <section>
//           <h2>Choose Earring Type</h2>
//           <div className="grid">
//             <Card img={BirthstoneImg} title="Birthstone" onClick={() => {
//               setType("birthstone");
//               setStep(2);
//             }} />
//             <Card img={HoopRoundImg} title="Charm" onClick={() => {
//               setType("charm");
//               setStep(2);
//             }} />
//           </div>
//         </section>
//       )}

//       {/* STEP 2 — BIRTHSTONE FLOW */}
//       {step === 2 && type === "birthstone" && (
//         <section>
//           <h2>Choose Month</h2>
//           <div className="month-grid">
//             {birthstones.map(b => (
//               <button key={b.month} onClick={() => setMonth(b.month)}>
//                 {b.month}
//               </button>
//             ))}
//           </div>

//           {month && (
//             <>
//               <h3>Birthstone Color</h3>
//               <div className="color-grid">
//                 {selectedBirthstone.colors.map(c => (
//                   <button
//                     key={c}
//                     className="color-circle"
//                     style={{ backgroundColor: c }}
//                     onClick={() => setColor(c)}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           <NavButtons back={() => setStep(1)} next={() => setStep(3)} />
//         </section>
//       )}

//       {/* STEP 2 — CHARM FLOW */}
//       {step === 2 && type === "charm" && (
//         <section>
//           <h2>Choose Style</h2>
//           <div className="grid">
//             <Card img={HoopRoundImg} title="Hoop Round" onClick={() => setStyle("hoop round")} />
//             <Card img={HoopSquareImg} title="Hoop Square" onClick={() => setStyle("hoop square")} />
//             <Card img={DanglingImg} title="Dangling" onClick={() => setStyle("dangling")} />
//           </div>

//           <NavButtons back={() => setStep(1)} next={() => setStep(3)} />
//         </section>
//       )}

//       {/* STEP 3 — METAL */}
//       {step === 3 && (
//         <section>
//           <h2>Choose Metal</h2>
//           <div className="metal-grid">
//             {METALS.map(m => (
//               <button key={m.name} onClick={() => setMetal(m.name)}>
//                 <span style={{ background: m.color }} />
//                 {m.name}
//               </button>
//             ))}
//           </div>

//           <NavButtons back={() => setStep(2)} next={() => setStep(4)} />
//         </section>
//       )}

//       {/* STEP 4 — SUMMARY */}
//       {step === 4 && (
//         <section className="summary">
//           <h2>Order Summary</h2>
//           <p>Type: {type}</p>
//           {type === "birthstone" && (
//             <>
//               <p>Month: {month}</p>
//               <p>Color: {color}</p>
//             </>
//           )}
//           {type === "charm" && <p>Style: {style}</p>}
//           <p>Metal: {metal}</p>
//           <p>Backing: Screw</p>

//           <NavButtons back={() => setStep(3)} next={() => alert("Continue")} />
//         </section>
//       )}

//     </div>
//   );
// }

// function Card({ img, title, onClick }) {
//   return (
//     <div className="card" onClick={onClick}>
//       <img src={img} alt={title} />
//       <h4>{title}</h4>
//     </div>
//   );
// }

// function NavButtons({ back, next }) {
//   return (
//     <div className="nav-btns">
//       <button onClick={back}>Back</button>
//       <button onClick={next}>Next</button>
//     </div>
//   );
// }
// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/earring.css";

// // ---- Birthstone Images ----
// import GarnetImg from "../assets/Gems/garnet.jpg";
// import AmethystImg from "../assets/Gems/amethyst.jpg";
// import AquamarineImg from "../assets/Gems/aquamarine.jpg";
// import DiamondImg from "../assets/Gems/diamond.jpg";
// import EmeraldImg from "../assets/Gems/emerald.jpg";
// import PearlImg from "../assets/Gems/pearl.jpg";
// import RubyImg from "../assets/Gems/ruby.jpg";
// import PeridotImg from "../assets/Gems/peridot.jpg";
// import SapphireImg from "../assets/Gems/sapphire.jpg";
// import OpalImg from "../assets/Gems/opal.jpg";
// import CitrineImg from "../assets/Gems/citrine.jpg";
// import BlueTopazImg from "../assets/Gems/bluetopaz.jpg";

// ;

// // ---- Birthstone Cuts ----
// import CutRound from "../assets/Cuts/round.jpg";
// import CutOval from "../assets/Cuts/oval.jpeg";
// import CutPear from "../assets/Cuts/pear.jpeg";
// import CutPrincess from "../assets/Cuts/princess.jpeg";

// // ---- Metals ----
// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];


// // ---- Birthstone Cuts ----
// const CUTS = [
//   { key: "Round", img: CutRound },
//   { key: "Oval", img: CutOval },
//   { key: "Pear", img: CutPear },
//   { key: "Princess", img: CutPrincess },
// ];

// export default function JewelrySelector() {
//   const navigate = useNavigate();

//   const [itemType, setItemType] = useState(null); // 'birthstone' or 'charm'

//   // Birthstone selections
//   const [month, setMonth] = useState(null);
//   const [color, setColor] = useState(null);
//   const [cut, setCut] = useState(null);
//   const [metal, setMetal] = useState(null);
//   const [backing, setBacking] = useState(null);

//   // Charm selections
//   const [charmStyle, setCharmStyle] = useState(null);
//   const [charmColor, setCharmColor] = useState(null);
//   const [charmBacking, setCharmBacking] = useState(null);

//   // ---- Birthstones ----
//   const birthstones = useMemo(() => [
//     { month: "Jan", full: "January", stone: "Garnet", colors: [{ label: "Garnet Red", hex: "#7b0f1b", img: GarnetImg }] },
//     { month: "Feb", full: "February", stone: "Amethyst", colors: [{ label: "Purple", hex: "#6d2c91", img: AmethystImg }] },
//     { month: "Mar", full: "March", stone: "Aquamarine", colors: [{ label: "Aqua", hex: "#7fd6e6", img: AquamarineImg }] },
//     { month: "Apr", full: "April", stone: "Diamond", colors: [{ label: "Clear", hex: "#e9edf2", img: DiamondImg }] },
//     { month: "May", full: "May", stone: "Emerald", colors: [{ label: "Emerald Green", hex: "#1f8a4c", img: EmeraldImg }] },
//     { month: "Jun", full: "June", stone: "Pearl", colors: [{ label: "Pearl", hex: "#f2efe8", img: PearlImg }] },
//     { month: "Jul", full: "July", stone: "Ruby", colors: [{ label: "Ruby Red", hex: "#b10f2e", img: RubyImg }] },
//     { month: "Aug", full: "August", stone: "Peridot", colors: [{ label: "Lime Green", hex: "#7fcf3a", img: PeridotImg }] },
//     { month: "Sep", full: "September", stone: "Sapphire", colors: [{ label: "Sapphire Blue", hex: "#163f99", img: SapphireImg }] },
//     { month: "Oct", full: "October", stone: "Opal", colors: [{ label: "Opal", hex: "#d7f2f1", img: OpalImg }] },
//     { month: "Nov", full: "November", stone: "Citrine", colors: [{ label: "Citrine", hex: "#f1b31c", img: CitrineImg }] },
//     { month: "Dec", full: "December", stone: "Blue Topaz", colors: [{ label: "Blue Topaz", hex: "#2ea7ff", img: BlueTopazImg }] },
//   ], []);

//   const resetSelections = () => {
//     setMonth(null); setColor(null); setCut(null); setMetal(null); setBacking(null);
//     setCharmStyle(null); setCharmColor(null); setCharmBacking(null);
//   }

//   const handleSubmit = () => {
//     if (itemType === "birthstone") {
//       if (!month || !color || !cut || !metal || !backing) {
//         alert("Please select all birthstone options.");
//         return;
//       }
//     } else if (itemType === "charm") {
//       if (!charmStyle || !charmColor || !charmBacking) {
//         alert("Please select all charm options.");
//         return;
//       }
//     }

//     // Navigate to checkout with selected options
//     navigate("/checkout", {
//       state: {
//         itemType,
//         birthstone: month && { month, stone: birthstones.find(b => b.month === month).stone, color, cut, metal, backing },
//         charm: charmStyle && { style: charmStyle, color: charmColor, backing: charmBacking },
//       },
//     });
//   };

//   return (
//     <div className="bs-page">
//       <div className="bs-container">
//         <header className="bs-header">
//           <h2>Customize Your Jewelry</h2>
//           <p className="bs-subtitle">Select Birthstone Earrings or Charms to start</p>
//         </header>

//         {/* STEP 1: Choose Item Type */}
//         {!itemType && (
//           <section className="bs-controls">
//             <button className="bs-choiceBtn" onClick={() => { setItemType("birthstone"); resetSelections(); }}>Birthstone Earrings</button>
//             <button className="bs-choiceBtn" onClick={() => { setItemType("charm"); resetSelections(); }}>Charms</button>
//           </section>
//         )}

//         {/* BIRTHSTONE FLOW */}
//         {itemType === "birthstone" && (
//           <>
//             {/* Month */}
//             {!month && (
//               <section className="bs-controls">
//                 <label>Select Month</label>
//                 <div className="bs-monthGrid">
//                   {birthstones.map(b => (
//                     <button key={b.month} className={month === b.month ? "isActive" : ""} onClick={() => { setMonth(b.month); setColor(null); }}>
//                       {b.month}
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Color */}
//             {month && !color && (
//               <section className="bs-controls">
//                 <label>Select Gem Color</label>
//                 <div className="bs-colorGrid">
//                   {birthstones.find(b => b.month === month).colors.map(c => (
//                     <button key={c.label} className={color === c ? "isActive" : ""} onClick={() => setColor(c)}>
//                       <img src={c.img} alt={c.label} className="bs-gemImg" />
//                       <span>{c.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Cut */}
//             {color && !cut && (
//               <section className="bs-controls">
//                 <label>Select Cut</label>
//                 <div className="bs-cutGrid">
//                   {CUTS.map(c => (
//                     <button key={c.key} className={cut === c.key ? "isActive" : ""} onClick={() => setCut(c.key)}>
//                       <img src={c.img} alt={c.key} />
//                       <span>{c.key}</span>
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Metal */}
//             {cut && !metal && (
//               <section className="bs-controls">
//                 <label>Select Metal</label>
//                 <div className="bs-metals">
//                   {METALS.map(m => (
//                     <button key={m.name} className={metal === m.color ? "isActive" : ""} onClick={() => setMetal(m.color)}>
//                       <span className="bs-metalDot" style={{ backgroundColor: m.color }} />
//                       <span>{m.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Backing */}
//             {metal && !backing && (
//               <section className="bs-controls">
//                 <label>Select Backing</label>
//                 <div className="bs-backingGrid">
//                   {["Push", "Screw"].map(b => (
//                     <button key={b} className={backing === b ? "isActive" : ""} onClick={() => setBacking(b)}>
//                       {b}
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </>
//         )}

//         {/* CHARM FLOW */}
//         {itemType === "charm" && (
//           <>
//             {/* Style */}
//             {!charmStyle && (
//               <section className="bs-controls">
//                 <label>Select Charm Style</label>
//                 <div className="bs-styleGrid">
//                   {CHARMS.map(c => (
//                     <button key={c.name} className={charmStyle === c.name ? "isActive" : ""} onClick={() => setCharmStyle(c.name)}>
//                       <img src={c.img} alt={c.name} />
//                       <span>{c.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Color */}
//             {charmStyle && !charmColor && (
//               <section className="bs-controls">
//                 <label>Choose Color</label>
//                 <div className="bs-colorGrid">
//                   {["Silver", "Gold", "Rose Gold"].map(c => (
//                     <button key={c} className={charmColor === c ? "isActive" : ""} onClick={() => setCharmColor(c)}>
//                       <span className="bs-metalDot" style={{ backgroundColor: c === "Silver" ? "#C0C0C0" : c === "Gold" ? "#FFD700" : "#B76E79" }} />
//                       <span>{c}</span>
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Backing */}
//             {charmStyle && charmColor && !charmBacking && (
//               <section className="bs-controls">
//                 <label>Select Backing</label>
//                 <div className="bs-backingGrid">
//                   {["Push", "Screw"].map(b => (
//                     <button key={b} className={charmBacking === b ? "isActive" : ""} onClick={() => setCharmBacking(b)}>
//                       {b}
//                     </button>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </>
//         )}

//         {/* Submit Button */}
//         {(itemType === "birthstone" ? (month && color && cut && metal && backing) 
//                                    : (charmStyle && charmColor && charmBacking)) && (
//           <button className="bs-next" onClick={handleSubmit}>
//             Proceed to Checkout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/earring.css";

// ---- IMAGES ----
import birthstoneEarringImg from "../assets/Earring/birthstoneearing.jpg";
import danglingImg from "../assets/Earring/dangling1.jpg";
import danglingCharmImg from "../assets/Earring/danglingwithcharm.jpeg";
import hoopRoundImg from "../assets/Earring/hoopround.jpg";
import hoopRoundGemImg from "../assets/Earring/hooproundwithgem.jpeg";
import hoopSquareImg from "../assets/Earring/hoopsquare.png";
import hoopSquareGemImg from "../assets/Earring/hoopsquarewithgem.png";
import hoopCharmImg from "../assets/Earring/hoopwithcharm.jpeg";
import birthstoneImg from "../assets/gems/birthstone.jpeg";
// Cuts
import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
];

const BACKINGS = [
  { name: "Push Back", value: "push" },
  { name: "Screw Back", value: "screw" },
 
];

const CUTS = [
  { key: "Round", img: CutRound },
  { key: "Oval", img: CutOval },
  { key: "Pear", img: CutPear },
  { key: "Princess", img: CutPrincess },
];

const CHARM_STYLES = [
  { name: "Hoop Round", img: hoopRoundImg },
  { name: "Hoop Square", img: hoopSquareImg },
  { name: "Dangling", img: danglingImg },
  { name: "Hoop with Charm", img: hoopCharmImg },
  { name: "Dangling with Charm", img: danglingCharmImg },
];

export default function EarringsPage() {
  const navigate = useNavigate();
  
  const [type, setType] = useState(null); // "birthstone" | "charm"
  const [backing, setBacking] = useState(null);
  const [metal, setMetal] = useState("");
  
  // Birthstone specific
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCut, setSelectedCut] = useState(null);
  
  // Charm specific
  const [charmStyle, setCharmStyle] = useState(null);
  const [earringColor, setEarringColor] = useState("");
  const [charmColor, setCharmColor] = useState("");

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

  const onPickMonth = (m) => {
    setSelectedMonth(m);
    setSelectedColor(null);
  };

  const canProceedBirthstone = !!selectedMonth && !!selectedColor && !!selectedCut && !!metal && !!backing;
  const canProceedCharm = !!charmStyle && !!earringColor && !!charmColor && !!metal && !!backing;

  const handleSubmit = () => {
    if (type === "birthstone") {
      if (!canProceedBirthstone) {
        alert("Please complete all selections for birthstone earrings");
        return;
      }
      navigate("/checkout", {
        state: {
          itemType: "birthstone_earring",
          metal,
          backing,
          birthstoneMonth: selectedMonth.month,
          birthstoneName: selectedMonth.stone,
          birthstoneColor: selectedColor,
          birthstoneCut: selectedCut,
        },
      });
    } else if (type === "charm") {
      if (!canProceedCharm) {
        alert("Please complete all selections for charm earrings");
        return;
      }
      navigate("/checkout", {
        state: {
          itemType: "charm_earring",
          metal,
          backing,
          charmStyle: charmStyle.name,
          earringColor,
          charmColor,
        },
      });
    }
  };

  // Initial type selection
  if (!type) {
    return (
      <div className="ear-page">
        <header className="ear-hero">
          <h1 className="ear-title">Design Your Earrings</h1>
          <p className="ear-subtitle">A piece made just for you</p>
        </header>

        <div className="ear-typeGrid">
          <button className="ear-typeCard" onClick={() => setType("birthstone")}>
            <div className="ear-typeImg">
              <img src={birthstoneEarringImg} alt="Birthstone Earrings" />
            </div>
            <h3>Birthstone</h3>
            <p>Personal. Meaningful. Timeless.</p>
          </button>

          <button className="ear-typeCard" onClick={() => setType("charm")}>
            <div className="ear-typeImg">
              <img src={hoopCharmImg} alt="Charm Earrings" />
            </div>
            <h3>Charm</h3>
            <p>Create your own story</p>
          </button>
        </div>
      </div>
    );
  }

  // Birthstone Flow
  if (type === "birthstone") {
    return (
      <div className="ear-page">
        <div className="ear-container">
          <header className="ear-header">
            <h2>Birthstone Earrings</h2>
            <p className="ear-headerSub">Select month, color, cut, metal and backing.</p>
          </header>

          <div className="ear-customizer">
            {/* LEFT PREVIEW */}
            <section className="ear-preview">
              <div className="ear-previewCard">
                <div className="ear-previewTop">
                  <span className="ear-badge">Live Preview</span>
                  <span className="ear-chip">
                    {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
                  </span>
                </div>

                <div className="ear-previewGrid">
                  <div className="ear-imageWrap">
                    <img src={birthstoneEarringImg} alt="Earring preview" className="ear-mainImg" />
                    <div className="ear-floatTag">Earring</div>
                  </div>

                  <div className="ear-imageWrap ear-imageWrapSoft">
                    <img src={birthstoneImg} alt="Gem color preview" className="ear-mainImg" />
                    <div className="ear-floatTag">Gem Color</div>

                    <div className="ear-colorBadge">
                      <span
                        className={`ear-colorDot ${selectedColor ? "on" : ""}`}
                        style={{ backgroundColor: selectedColor?.hex || "#ece7ef" }}
                      />
                      <span className="ear-colorBadgeText">
                        {selectedColor ? selectedColor.label : "Pick a color"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ear-meta">
                  <div className="ear-row"><span>Month</span><strong>{selectedMonth ? selectedMonth.full : "—"}</strong></div>
                  <div className="ear-row"><span>Stone</span><strong>{selectedMonth ? selectedMonth.stone : "—"}</strong></div>
                  <div className="ear-row"><span>Cut</span><strong>{selectedCut || "—"}</strong></div>
                  <div className="ear-row"><span>Backing</span><strong>{backing ? BACKINGS.find(b => b.value === backing)?.name : "—"}</strong></div>
                </div>
              </div>
            </section>

            {/* RIGHT CONTROLS */}
            <section className="ear-controls">
              <div className="ear-section">
                <label className="ear-label">Month</label>
                <div className="ear-monthGrid">
                  {birthstones.map((b) => (
                    <button
                      key={b.month}
                      type="button"
                      className={`ear-monthBtn ${selectedMonth?.month === b.month ? "isActive" : ""}`}
                      onClick={() => onPickMonth(b)}
                    >
                      {b.month}
                    </button>
                  ))}
                </div>
                <p className="ear-help">Choosing a month unlocks its gem colors.</p>
              </div>

              <div className="ear-section">
                <label className="ear-label">Gem Color</label>
                {!selectedMonth ? (
                  <div className="ear-lockCard">Select a month first.</div>
                ) : (
                  <div className="ear-colorGrid">
                    {selectedMonth.colors.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        className={`ear-colorBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
                        onClick={() => setSelectedColor(c)}
                      >
                        <span className="ear-colorSwatch" style={{ backgroundColor: c.hex }} />
                        <span className="ear-colorText">{c.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="ear-section">
                <label className="ear-label">Cut</label>
                <div className="ear-cutGrid">
                  {CUTS.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      className={`ear-cutCard ${selectedCut === c.key ? "isActive" : ""}`}
                      onClick={() => setSelectedCut(c.key)}
                    >
                      <img className="ear-cutImg" src={c.img} alt={c.key} />
                      <div className="ear-cutName">{c.key}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ear-section">
                <label className="ear-label">Metal</label>
                <div className="ear-metals">
                  {METALS.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`ear-metalBtn ${metal === m.color ? "isActive" : ""}`}
                      onClick={() => setMetal(m.color)}
                    >
                      <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
                      <span className="ear-metalName">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ear-section">
                <label className="ear-label">Backing Type</label>
                <div className="ear-backingGrid">
                  {BACKINGS.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      className={`ear-backingBtn ${backing === b.value ? "isActive" : ""}`}
                      onClick={() => setBacking(b.value)}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <button className="ear-next" type="button" onClick={handleSubmit} disabled={!canProceedBirthstone}>
                Order Summary
              </button>

              {!canProceedBirthstone && (
                <p className="ear-error">Required: Month, Color, Cut, Metal, Backing.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Charm Flow
  if (type === "charm") {
    return (
      <div className="ear-page">
        <div className="ear-container">
          <header className="ear-header">
            <h2>Charm Earrings</h2>
            <p className="ear-headerSub">Select style, colors, metal and backing.</p>
          </header>

          <div className="ear-customizer">
            {/* LEFT PREVIEW */}
            <section className="ear-preview">
              <div className="ear-previewCard">
                <div className="ear-previewTop">
                  <span className="ear-badge">Live Preview</span>
                  <span className="ear-chip">
                    {metal ? METALS.find((m) => m.color === metal)?.name : "Choose Metal"}
                  </span>
                </div>

                <div className="ear-previewSingle">
                  <img 
                    src={charmStyle ? charmStyle.img : hoopCharmImg} 
                    alt="Charm earring preview" 
                    className="ear-mainImg" 
                  />
                </div>

                <div className="ear-meta">
                  <div className="ear-row"><span>Style</span><strong>{charmStyle ? charmStyle.name : "—"}</strong></div>
                  <div className="ear-row"><span>Earring Color</span><strong>{earringColor ? METALS.find(m => m.color === earringColor)?.name : "—"}</strong></div>
                  <div className="ear-row"><span>Charm Color</span><strong>{charmColor || "—"}</strong></div>
                  <div className="ear-row"><span>Backing</span><strong>{backing ? BACKINGS.find(b => b.value === backing)?.name : "—"}</strong></div>
                </div>
              </div>
            </section>

            {/* RIGHT CONTROLS */}
            <section className="ear-controls">
              <div className="ear-section">
                <label className="ear-label">Style</label>
                <div className="ear-styleGrid">
                  {CHARM_STYLES.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      className={`ear-styleCard ${charmStyle?.name === s.name ? "isActive" : ""}`}
                      onClick={() => setCharmStyle(s)}
                    >
                      <img src={s.img} alt={s.name} className="ear-styleImg" />
                      <div className="ear-styleName">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ear-section">
                <label className="ear-label">Earring Color</label>
                <div className="ear-metals">
                  {METALS.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`ear-metalBtn ${earringColor === m.color ? "isActive" : ""}`}
                      onClick={() => setEarringColor(m.color)}
                    >
                      <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
                      <span className="ear-metalName">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ear-section">
                <label className="ear-label">Charm Color</label>
                <p className="ear-help">Images will be added later</p>
                <input 
                  type="text" 
                  className="ear-textInput"
                  placeholder="Enter charm color (e.g., Pink, Blue)"
                  value={charmColor}
                  onChange={(e) => setCharmColor(e.target.value)}
                />
              </div>

              <div className="ear-section">
                <label className="ear-label">Metal</label>
                <div className="ear-metals">
                  {METALS.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`ear-metalBtn ${metal === m.color ? "isActive" : ""}`}
                      onClick={() => setMetal(m.color)}
                    >
                      <span className="ear-metalDot" style={{ backgroundColor: m.color }} />
                      <span className="ear-metalName">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ear-section">
                <label className="ear-label">Backing Type</label>
                <div className="ear-backingGrid">
                  {BACKINGS.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      className={`ear-backingBtn ${backing === b.value ? "isActive" : ""}`}
                      onClick={() => setBacking(b.value)}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <button className="ear-next" type="button" onClick={handleSubmit} disabled={!canProceedCharm}>
                Order Summary
              </button>

              {!canProceedCharm && (
                <p className="ear-error">Required: Style, Earring Color, Charm Color, Metal, Backing.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return null;
}