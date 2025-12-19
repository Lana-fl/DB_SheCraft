// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import "../styles/necklace.css";

// export default function NecklacePage() {
//   const navigate = useNavigate();

//   // Step states
//   const [currentStep, setCurrentStep] = useState(1);

//   // Necklace customization states
//   const [necklaceLength, setNecklaceLength] = useState(16); // inches
//   const [necklaceType, setNecklaceType] = useState("chain"); // chain or font
//   const [fontStyle, setFontStyle] = useState("Italic"); // if type is font
//   const [isArabic, setIsArabic] = useState(false);
//   const [bubbleOption, setBubbleOption] = useState(false);
//   const [nameText, setNameText] = useState("");

//   const handleNext = () => setCurrentStep(prev => prev + 1);
//   const handlePrev = () => setCurrentStep(prev => prev - 1);

//   const handleSubmit = () => {
//     // Pass all info to DesignerPage
//     navigate("/designer", {
//       state: { necklaceLength, necklaceType, fontStyle, isArabic, bubbleOption, nameText }
//     });
//   };

//   return (
//     <div className="necklace-page page-wrapper">
//       <h2>Customize Your Necklace</h2>

//       <div className="necklace-steps">
//         {currentStep === 1 && (
//           <div className="step-content">
//             <label>Necklace Length (inches):</label>
//             <input
//               type="number"
//               min={12}
//               max={24}
//               value={necklaceLength}
//               onChange={(e) => setNecklaceLength(e.target.value)}
//             />
//             <button onClick={handleNext}>Next</button>
//           </div>
//         )}

//         {currentStep === 2 && (
//           <div className="step-content">
//             <label>Necklace Type:</label>
//             <select value={necklaceType} onChange={(e) => setNecklaceType(e.target.value)}>
//               <option value="chain">Chain</option>
//               <option value="font">Font</option>
//             </select>

//             {necklaceType === "font" && (
//               <div className="font-options">
//                 <label>Font Style:</label>
//                 <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
//                   <option>Italic</option>
//                   <option>Bold</option>
//                   <option>Regular</option>
//                 </select>

//                 <label>
//                   <input type="checkbox" checked={isArabic} onChange={(e) => setIsArabic(e.target.checked)} />
//                   Arabic
//                 </label>

//                 <label>
//                   <input type="checkbox" checked={bubbleOption} onChange={(e) => setBubbleOption(e.target.checked)} />
//                   Bubble Style
//                 </label>
//               </div>
//             )}

//             <button onClick={handlePrev}>Back</button>
//             <button onClick={handleNext}>Next</button>
//           </div>
//         )}

//         {currentStep === 3 && (
//           <div className="step-content">
//             <label>Enter Name:</label>
//             <input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)} />
//             <button onClick={handlePrev}>Back</button>
//             <button onClick={handleSubmit}>Next to Designer</button>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import "../styles/necklace.css";

// // Images
// import NecklaceImg from "../assets/necklace/length.png";
// import Name1Img from "../assets/necklace/name1.png";
// import Name2Img from "../assets/necklace/name2.png";
// import Name3Img from "../assets/necklace/name3.png";
// import Name4Img from "../assets/necklace/name4.png";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const LENGTHS = [14, 15, 16, 18, 20];

// const FONT_TYPES = ["Bold", "Italic", "Regular", "Bubble"];

// // Carousel images
// const IMAGES = [
//   { name: "Name1", img: Name1Img },
//   { name: "Name2", img: Name2Img },
//   { name: "Name3", img: Name3Img },
//   { name: "Name4", img: Name4Img },
//   { name: "Length", img: NecklaceImg },
// ];

// export default function NecklacesPage() {
//   const navigate = useNavigate();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [metal, setMetal] = useState(METALS[0].color);
//   const [necklaceLength, setNecklaceLength] = useState(16);
//   const [chainType, setChainType] = useState("Link");
//   const [fontType, setFontType] = useState(FONT_TYPES[0]);
//   const [currentStep, setCurrentStep] = useState(1);

//   // Shuffle main image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = () => {
//     navigate("/designer", {
//       state: {
//         nameText: IMAGES[currentIndex].name,
//         metal,
//         necklaceLength,
//         chainType,
//         fontType,
//       },
//     });
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="necklace-page">
//         <h2>Customize Your Necklace</h2>

//         {/* Horizontal Steps */}
//         <div className="steps-horizontal">
//           {["Customize Your Necklace", "Choose Your Designer", "Checkout"].map((label, index) => (
//             <div
//               key={index}
//               className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//               onClick={() => setCurrentStep(index + 1)}
//             >
//               <div className="step-number">{index + 1}</div>
//               <div className="step-labels">{label}</div>
//             </div>
//           ))}
//         </div>

//         <div className="necklace-customizer">
//           {/* Main Preview */}
//           <div className="preview">
//             <img
//               src={IMAGES[currentIndex].img}
//               alt={IMAGES[currentIndex].name}
//               className="main-necklace-img"
//             />

//             <p>{IMAGES[currentIndex].name}</p>
//             {IMAGES[currentIndex].name === "Length" && (
//               <p>Length: {necklaceLength}"</p>
//             )}

//             {/* Thumbnails */}
//             <div className="thumbnails">
//               {IMAGES.map((item, idx) => (
//                 <img
//                   key={item.name}
//                   src={item.img}
//                   alt={item.name}
//                   className={`thumbnail-img ${currentIndex === idx ? "selected" : ""}`}
//                   onClick={() => setCurrentIndex(idx)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Options Sidebar */}
//           <div className="options-sidebar">
//             <h3>Customize your necklace</h3>

//             {/* Font Type */}
//             <div className="tab-section">
//               <label>Type of Name</label>
//               <select value={fontType} onChange={(e) => setFontType(e.target.value)}>
//                 {FONT_TYPES.map((f) => (
//                   <option key={f} value={f}>{f}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Metal */}
//             <div className="tab-section">
//               <label>Metal</label>
//               <div className="options-grid">
//                 {METALS.map((m) => (
//                   <div
//                     key={m.name}
//                     className={`option-card ${metal === m.color ? "selected" : ""}`}
//                     onClick={() => setMetal(m.color)}
//                   >
//                     <div className="color-swatch" style={{ backgroundColor: m.color }} />
//                     <p>{m.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Length */}
//             <div className="tab-section">
//               <label>Length</label>
//               <select
//                 value={necklaceLength}
//                 onChange={(e) => setNecklaceLength(Number(e.target.value))}
//               >
//                 {LENGTHS.map((len) => (
//                   <option key={len} value={len}>{len}"</option>
//                 ))}
//               </select>
//             </div>

//             {/* Chain Type */}
//             <div className="tab-section">
//               <label>Chain Type</label>
//               <select value={chainType} onChange={(e) => setChainType(e.target.value)}>
//                 <option>Link</option>
//                 <option>Rope</option>
//                 <option>Box</option>
//                 <option>Cable</option>
//               </select>
//             </div>

//             <button className="next-btn" onClick={handleSubmit}>Next to Designer</button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { useState } from "react";
// import React, { useState } from "react"; // ✅ import useState here
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import "../styles/necklace.css";


// // Images
// import NecklaceImg from "../assets/necklace/length.png";
// import Name1Img from "../assets/necklace/name1.png";
// import Name2Img from "../assets/necklace/name2.png";
// import Name3Img from "../assets/necklace/name3.png";
// import Name4Img from "../assets/necklace/name4.png";
// import Necklace from "../assets/necklace/name.png";

// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";



// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const LENGTHS = [14, 15, 16, 18, 20];

// const FONT_TYPES = ["Bold", "Italic", "Regular", "Bubble"];

// const IMAGES = [
//   { name: "Name1", img: Name1Img },
//   { name: "Name2", img: Name2Img },
//   { name: "Name3", img: Name3Img },
//   { name: "Name4", img: Name4Img },
//   { name: "Length", img: NecklaceImg },
// ];
// const CHAINS = [
//   { name: "Cable", img: cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin }
// ];

// export default function NecklacesPage() {
//   const navigate = useNavigate();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [metal, setMetal] = useState(METALS[0].color);
//   const [necklaceLength, setNecklaceLength] = useState(16);
//   const [chainType, setChainType] = useState("Link");
//   const [fontType, setFontType] = useState(FONT_TYPES[0]);
//   const [currentStep, setCurrentStep] = useState(1);


//   const handleImageClick = () => {
//   const img = document.querySelector(".main-necklace-img");
//   img.classList.add("fade-out");
//   setTimeout(() => {
//     setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
//     img.classList.remove("fade-out");
//   }, 250); // half of the CSS transition duration
// };

// const handleSubmit = () => {
//   navigate("/designer", {
//     state: {
//       itemType: "necklace",              // tells DesignerPage it’s a necklace
//       image: Necklace,   // currently selected image
//       nameText: IMAGES[currentIndex].name,
//       metal,
//       necklaceLength,
//       chainType,
//       fontType,
//     },
//   });
// };

//   return (
//     <div className="page-wrapper">
//       <div className="necklace-page">
//         <h2>Customize Your Necklace</h2>

//         {/* Horizontal Steps */}
//         <div className="steps-horizontal">
//           {["Customize Your Necklace", "Choose Your Designer", "Checkout"].map(
//             (label, index) => (
//               <div
//                 key={index}
//                 className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//                 onClick={() => setCurrentStep(index + 1)}
//               >
//                 <div className="step-number">{index + 1}</div>
//                 <div className="step-labels">{label}</div>
//               </div>
//             )
//           )}
//         </div>

//         <div className="necklace-customizer ring-style-layout">
//           {/* Main Image Viewer (Left Side) */}
//           <div className="viewer-left" onClick={handleImageClick}>
//             <img
//               src={IMAGES[currentIndex].img}
//               alt={IMAGES[currentIndex].name}
//               className="main-necklace-img"
//             />
//             <p className="click-hint">Click image to see next option</p>
//           </div>

//           {/* Sidebar Controls (Right Side) */}
//           <div className="tabs-sidebar">
//             {/* Font Type */}
//             <div className="tab-section">
//               <label>Font Type</label>
//               <select value={fontType} onChange={(e) => setFontType(e.target.value)}>
//                 {FONT_TYPES.map((f) => (
//                   <option key={f} value={f}>
//                     {f}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Metal */}
//             <div className="tab-section">
//               <label>Metal</label>
//               <div className="options-grid">
//                 {METALS.map((m) => (
//                   <div
//                     key={m.name}
//                     className={`option-card ${metal === m.color ? "selected" : ""}`}
//                     onClick={() => setMetal(m.color)}
//                   >
//                     <div className="color-swatch" style={{ backgroundColor: m.color }} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Length */}
//             <div className="tab-section">
//               <label>Length</label>
//               <select
//                 value={necklaceLength}
//                 onChange={(e) => setNecklaceLength(Number(e.target.value))}
//               >
//                 {LENGTHS.map((len) => (
//                   <option key={len} value={len}>
//                     {len}"
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Chain Type */}
//             <div className="tab-section">
//               <label>Chain Type</label>
//               <select value={chainType} onChange={(e) => setChainType(e.target.value)}>
//                 <option>Link</option>
//                 <option>Rope</option>
//                 <option>Box</option>
//                 <option>Cable</option>
//               </select>
//             </div>

//             <button className="next-btn" onClick={handleSubmit}>
//               Next to Designer
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

//WORKING

// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import "../styles/necklace.css";

// // Images
// import Name1Img from "../assets/necklace/name1.png";
// import Name2Img from "../assets/necklace/name2.png";
// import Name3Img from "../assets/necklace/name3.png";
// import Name4Img from "../assets/necklace/name4.png";
// import LengthImg from "../assets/necklace/length.png"; // your single length image
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const NAME_STYLES = [
//   { name: "Style 1", img: Name1Img },
//   { name: "Style 2", img: Name2Img },
//   { name: "Style 3", img: Name3Img },
//   { name: "Style 4", img: Name4Img },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];
// const LENGTHS = [14, 15, 16, 18, 20];



// export default function NecklacesPage() {
//   const [activePanel, setActivePanel] = useState(null);
//   const [selectedNameStyle, setSelectedNameStyle] = useState(NAME_STYLES[0]);
//   const [hoverIndex, setHoverIndex] = useState(0);
//   const [nameText, setNameText] = useState("");
//   const [metal, setMetal] = useState(METALS[0].color);
//   const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
//   const [selectedLength, setSelectedLength] = useState(16);

//   // Cycle through name styles dynamically until one is fixed
//   useEffect(() => {
//     if (selectedNameStyle.fixed) return;
//     const interval = setInterval(() => {
//       setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [selectedNameStyle]);

//   const handleSelectStyle = (style) => {
//     setSelectedNameStyle({ ...style, fixed: true });
//     setActivePanel(null);
//   };
// const navigate = useNavigate();
// const handleSubmit = () => {
//   navigate("/designer", {
//     state: {
//       itemType: "necklace",
//       selectedNameStyle,
//       chainType: selectedChain,
//       selectedLength,
//       nameText,
//       metal,
//     },
//   });
// };


//   return (
//   <div className="page-wrapper">
//     <div className="necklace-page">
//       <h2>Customize Your Necklace</h2>

//       <div className="necklace-customizer">
//         {/* LEFT PREVIEW */}
//         <div className="preview-left">
//           <div className="preview-box">
//             <img
//               src={selectedNameStyle.fixed ? selectedNameStyle.img : NAME_STYLES[hoverIndex].img}
//               alt="necklace"
//               className="main-necklace-img"
//             />
//             {nameText && <p className="name-preview">{nameText}</p>}
//           </div>
//         </div>

//         {/* RIGHT FORM */}
//         <div className="form-left">
//           {/* Name Input */}
//           <div className="tab-section">
//             <label>Engraved Name</label>
//             <input
//               type="text"
//               maxLength="12"
//               placeholder="Enter name"
//               value={nameText}
//               onChange={(e) => setNameText(e.target.value)}
//             />
//           </div>

//           {/* Metal */}
//           <div className="tab-section">
//             <label>Metal</label>
//             <div className="options-grid">
//               {METALS.map((m) => (
//                 <div
//                   key={m.name}
//                   className={`option-card ${metal === m.color ? "selected" : ""}`}
//                   onClick={() => setMetal(m.color)}
//                 >
//                   <div className="color-swatch" style={{ backgroundColor: m.color }} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Name Style */}
//           <div
//             className="tab-section hover-arrow"
//             onClick={() => setActivePanel(activePanel === "nameStyle" ? null : "nameStyle")}
//           >
//             <label>Name Style</label>
//             <span className="arrow">▶</span>
//           </div>

//           {/* Chain Type & Length */}
//           <div
//             className="tab-section hover-arrow"
//             onClick={() => setActivePanel(activePanel === "chainLength" ? null : "chainLength")}
//           >
//             <label>Chain Type & Length</label>
//             <span className="arrow">▶</span>
//             <p>
//               {selectedChain.name} - {selectedLength}"
//             </p>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className={`right-panel ${activePanel ? "open" : ""}`}>
//           {/* Name Style Selection */}
//           {activePanel === "nameStyle" && (
//             <>
//               <h3>Select Name Style</h3>
//               <div className="chains-grid">
//                 {NAME_STYLES.map((style) => (
//                   <img
//                     key={style.name}
//                     src={style.img}
//                     alt={style.name}
//                     className={`panel-img ${selectedNameStyle.name === style.name ? "selected" : ""}`}
//                     onClick={() => {
//                       setSelectedNameStyle({ ...style, fixed: true });
//                       setActivePanel(null);
//                     }}
//                   />
//                 ))}
//               </div>
//               <button className="confirm-btn" onClick={() => setActivePanel(null)}>
//                 Confirm Style
//               </button>
//             </>
//           )}

//           {/* Chain + Length Selection */}
//           {activePanel === "chainLength" && (
//             <div className="chain-length-selection">
//               <h3>Select Chain Type</h3>
//               <div className="chains-grid">
//                 {CHAINS.map((c) => (
//                   <div
//                     key={c.name}
//                     className={`chain-option ${selectedChain.name === c.name ? "selected" : ""}`}
//                     onClick={() => setSelectedChain(c)}
//                   >
//                     <img src={c.img} alt={c.name} />
//                     <p>{c.name}</p>
//                   </div>
//                 ))}
//               </div>

//               <h3>Select Length</h3>
//               <div className="length-options">
//                 {LENGTHS.map((len) => (
//                   <div
//                     key={len}
//                     className={`panel-option ${selectedLength === len ? "selected" : ""}`}
//                     onClick={() => setSelectedLength(len)}
//                   >
//                     {len}"
//                   </div>
//                 ))}
//               </div>

//               {/* Length Image */}
//               <div className="length-preview">
//                 <img
//                   src={LengthImg}
//                   alt={`Length ${selectedLength}"`}
//                   className="length-img"
//                 />
//               </div>

//               <button className="confirm-btn" onClick={() => setActivePanel(null)}>
//                 Confirm Selection
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//     {/* Overlay Blur */}
//     {activePanel && <div className="overlay-blur" onClick={() => setActivePanel(null)} />}
//           <button className="next-btn" onClick={handleSubmit}>
//                Next to Designer
//              </button>
    
//   </div>
// );
// }


//working
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import "../styles/necklace.css";

// // ===== Name style images (ONLY THESE) =====
// import BubbleImg from "../assets/necklace/necklacestyle/bubble.jpg";
// import CursiveImg from "../assets/necklace/necklacestyle/cursive.jpg";
// import LetterSparkImg from "../assets/necklace/necklacestyle/letterspark.jpg";

// // ===== Other images =====
// import LengthImg from "../assets/necklace/length.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const NAME_STYLES = [
//   { name: "Bubble", img: BubbleImg },
//   { name: "Cursive", img: CursiveImg },
//   { name: "Letter Spark", img: LetterSparkImg },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];

// const LENGTHS = [14, 16, 18, 20];

// export default function NecklacesPage() {
//   const navigate = useNavigate();

//   const [activePanel, setActivePanel] = useState(null); // "nameStyle" | "chainLength" | null
//   const [selectedNameStyle, setSelectedNameStyle] = useState({ ...NAME_STYLES[0], fixed: false });
//   const [hoverIndex, setHoverIndex] = useState(0);

//   const [nameText, setNameText] = useState("");
//   const [metal, setMetal] = useState(METALS[0].color);
//   const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
//   const [selectedLength, setSelectedLength] = useState(16);

//   // Cycle preview styles until user "fixes" a style
//   useEffect(() => {
//     if (selectedNameStyle.fixed) return;
//     const interval = setInterval(() => {
//       setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
//     }, 1100);
//     return () => clearInterval(interval);
//   }, [selectedNameStyle]);

//   const handleSubmit = () => {
//     navigate("/designer", {
//       state: {
//         itemType: "necklace",
//         selectedNameStyle,
//         chainType: selectedChain,
//         selectedLength,
//         nameText,
//         metal,
//       },
//     });
//   };

//   const closePanel = () => setActivePanel(null);
//   const togglePanel = (panel) => {
//   setActivePanel((prev) => (prev === panel ? null : panel));
// };



//   return (
//   <div className="nk-page">
//     <div className="nk-container">
//       <header className="nk-header">
//         <h2>Customize Your Necklace</h2>
//         <p className="nk-subtitle">Choose a style, chain, and finish then make it yours.</p>
//       </header>
      
//       <div className="nk-customizer">
//         {/* LEFT PREVIEW */}
//         <section className="nk-preview">
//           <div className="nk-previewCard">
//             <div className="nk-previewTop">
//               <span className="nk-badge">Live Preview</span>
//               <span className="nk-chip">
//                 {METALS.find((m) => m.color === metal)?.name || "Metal"}
//               </span>
//             </div>

//             <div className="nk-imageWrap">
//               <img
//                 src={selectedNameStyle.fixed ? selectedNameStyle.img : NAME_STYLES[hoverIndex].img}
//                 alt="Necklace Preview"
//                 className="nk-mainImg"
//               />

//               {nameText && (
//                 <div className="nk-nameOverlay">
//                   <span className="nk-nameText">{nameText}</span>
//                 </div>
//               )}
//             </div>

//             <div className="nk-previewMeta">
//               <div className="nk-metaRow">
//                 <span>Style</span>
//                 <strong>{selectedNameStyle.name}</strong>
//               </div>
//               <div className="nk-metaRow">
//                 <span>Chain</span>
//                 <strong>{selectedChain.name}</strong>
//               </div>
//               <div className="nk-metaRow">
//                 <span>Length</span>
//                 <strong>{selectedLength}"</strong>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* RIGHT CONTROLS */}
//         <section className="nk-controls">
//           <div className="nk-section">
//             <label className="nk-label">Engraved Name</label>
//             <input
//               className="nk-input"
//               type="text"
//               maxLength={12}
//               placeholder="Enter name (max 12)"
//               value={nameText}
//               onChange={(e) => setNameText(e.target.value)}
//             />
//             <p className="nk-help">Tip: shorter names look more balanced.</p>
//           </div>

//           <div className="nk-section">
//             <label className="nk-label">Metal</label>
//             <div className="nk-metals">
//               {METALS.map((m) => (
//                 <button
//                   key={m.name}
//                   type="button"
//                   className={`nk-metalBtn ${metal === m.color ? "isActive" : ""}`}
//                   onClick={() => setMetal(m.color)}
//                 >
//                   <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
//                   <span className="nk-metalName">{m.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Panel openers */}
//           <button
//             type="button"
//             className={`nk-rowBtn ${activePanel === "nameStyle" ? "open" : ""}`}
//             onClick={() => togglePanel("nameStyle")}
//           >
//             <div className="nk-rowLeft">
//               <span className="nk-rowTitle">Name Style</span>
//               <span className="nk-rowValue">{selectedNameStyle.name}</span>
//             </div>
//             <span className="nk-chevron" aria-hidden="true" />
//           </button>

//           <button
//             type="button"
//             className={`nk-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
//             onClick={() => togglePanel("chainLength")}
//           >
//             <div className="nk-rowLeft">
//               <span className="nk-rowTitle">Chain & Length</span>
//               <span className="nk-rowValue">
//                 {selectedChain.name} · {selectedLength}"
//               </span>
//             </div>
//             <span className="nk-chevron" aria-hidden="true" />
//           </button>

//           <button className="nk-next" type="button" onClick={handleSubmit}>
//             Next to Designer
//           </button>
//         </section>

//         {/* RIGHT SLIDE PANEL */}
//         <aside className={`nk-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
//           <div className="nk-panelHeader">
//             <div>
//               <h3 className="nk-panelTitle">
//                 {activePanel === "nameStyle" ? "Select Name Style" : "Chain & Length"}
//               </h3>
//               <p className="nk-panelSub">
//                 {activePanel === "nameStyle"
//                   ? "Pick the font look that matches your vibe."
//                   : "Choose the chain type and length."}
//               </p>
//             </div>

//             <button type="button" className="nk-close" onClick={closePanel}>
//               Close
//             </button>
//           </div>

//           {/* SCROLLABLE CONTENT */}
//           <div className="nk-panelBody">
//             {activePanel === "nameStyle" && (
//               <div className="nk-grid">
//                 {NAME_STYLES.map((style) => (
//                   <button
//                     key={style.name}
//                     type="button"
//                     className={`nk-cardPick ${
//                       selectedNameStyle.name === style.name ? "isActive" : ""
//                     }`}
//                     onClick={() => setSelectedNameStyle({ ...style, fixed: true })}
//                   >
//                     <img src={style.img} alt={style.name} className="nk-cardImg" />
//                     <div className="nk-cardText">
//                       <strong>{style.name}</strong>
//                       <span>Tap to select</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activePanel === "chainLength" && (
//               <>
//                 <h4 className="nk-panelSectionTitle">Chain Type</h4>
//                 <div className="nk-chainGrid">
//                   {CHAINS.map((c) => (
//                     <button
//                       key={c.name}
//                       type="button"
//                       className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
//                       onClick={() => setSelectedChain(c)}
//                     >
//                       <img src={c.img} alt={c.name} className="nk-chainImg" />
//                       <strong>{c.name}</strong>
//                     </button>
//                   ))}
//                 </div>

//                 <h4 className="nk-panelSectionTitle">Length</h4>
//                 <div className="nk-lengths">
//                   {LENGTHS.map((len) => (
//                     <button
//                       key={len}
//                       type="button"
//                       className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
//                       onClick={() => setSelectedLength(len)}
//                     >
//                       {len}"
//                     </button>
//                   ))}
//                 </div>

//                 <div className="nk-lengthPreview">
//                   <img src={LengthImg} alt="Length Guide" className="nk-lengthImg" />
//                 </div>
//               </>
//             )}
//           </div>

//           {/* FIXED FOOTER (ALWAYS BOTTOM OF PANEL) */}
//           {activePanel && (
//             <div className="nk-panelFooter">
//               <button className="nk-confirm" type="button" onClick={closePanel}>
//                 {activePanel === "nameStyle" ? "Confirm Style" : "Confirm Selection"}
//               </button>
//             </div>
//           )}
//         </aside>

//         {/* OVERLAY */}
//         {activePanel && <div className="nk-overlay" onClick={closePanel} />}
//       </div>
//     </div>
//   </div>
// );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/necklace.css";

// // ===== Name style images (ONLY THESE) =====
// import BubbleImg from "../assets/necklace/necklacestyle/bubble.jpg";
// import CursiveImg from "../assets/necklace/necklacestyle/cursive.jpg";
// import LetterSparkImg from "../assets/necklace/necklacestyle/letterspark.jpg";

// // ===== Other images =====
// import LengthImg from "../assets/necklace/length.png";
// import Cable from "../assets/chains/cable.png";
// import Rope from "../assets/chains/rope.jpg";
// import Box from "../assets/chains/box.jpg";
// import Thin from "../assets/chains/thin.png";

// const METALS = [
//   { name: "Silver", color: "#C0C0C0" },
//   { name: "Gold", color: "#FFD700" },
//   { name: "Rose Gold", color: "#B76E79" },
// ];

// const NAME_STYLES = [
//   { name: "Bubble", img: BubbleImg },
//   { name: "Cursive", img: CursiveImg },
//   { name: "Letter Spark", img: LetterSparkImg },
// ];

// const CHAINS = [
//   { name: "Cable", img: Cable },
//   { name: "Rope", img: Rope },
//   { name: "Box", img: Box },
//   { name: "Thin", img: Thin },
// ];

// const LENGTHS = [14, 16, 18, 20];

// export default function NecklacesPage() {
//   const navigate = useNavigate();

//   // Steps (for the horizontal tabs)
//   const [currentStep, setCurrentStep] = useState(1);

//   // Panels
//   const [activePanel, setActivePanel] = useState(null); // "nameStyle" | "chainLength" | null

//   // Selection state
//   const [selectedNameStyle, setSelectedNameStyle] = useState({
//     ...NAME_STYLES[0],
//     fixed: false,
//   });
//   const [hoverIndex, setHoverIndex] = useState(0);

//   const [nameText, setNameText] = useState("");
//   const [metal, setMetal] = useState(METALS[0].color);
//   const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
//   const [selectedLength, setSelectedLength] = useState(16);

//   // Auto-cycle preview until style is fixed
//   useEffect(() => {
//     if (selectedNameStyle.fixed) return;
//     const interval = setInterval(() => {
//       setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
//     }, 1100);
//     return () => clearInterval(interval);
//   }, [selectedNameStyle.fixed]);

//   const closePanel = () => setActivePanel(null);
//   const togglePanel = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

//   const handleSubmit = () => {
//     setCurrentStep(2);
//     navigate("/checkout", {
//       state: {
//         itemType: "necklace",
//         selectedNameStyle,
//         chainType: selectedChain,
//         selectedLength,
//         nameText,
//         metal,
//       },
//     });
//   };

//   const onStepClick = (step) => {
//     setCurrentStep(step);

//     // Step navigation behavior (adjust routes if needed)
//     if (step === 1) return; // already here

//     if (step === 2) {
//       handleSubmit();
//       return;
//     }

//     if (step === 3) {
//       navigate("/checkout"); // change if your route name differs
//     }
//   };

//   const steps = ["Customize Your Necklace", "Choose Your Designer", "Checkout"];

//   return (
//     <div className="nk-page">
//       <div className="nk-container">
//         <header className="nk-header">
//           <h2>Customize Your Necklace</h2>
//           <p className="nk-subtitle">Choose a style, chain, and finish then make it yours.</p>
//         </header>

       
//         {/* <div className="steps-horizontal">
//           {steps.map((label, index) => (
//             <div
//               key={label}
//               className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//               onClick={() => onStepClick(index + 1)}
//               role="button"
//               tabIndex={0}
//             >
//               <div className="step-number">{index + 1}</div>
//               <div className="step-labels">{label}</div>
//             </div>
//           ))}
//         </div> */}

//         <div className="nk-customizer">
//           {/* LEFT PREVIEW */}
//           <section className="nk-preview">
//             <div className="nk-previewCard">
//               <div className="nk-previewTop">
//                 <span className="nk-badge">Live Preview</span>
//                 <span className="nk-chip">
//                   {METALS.find((m) => m.color === metal)?.name || "Metal"}
//                 </span>
//               </div>

//               <div className="nk-imageWrap">
//                 <img
//                   src={selectedNameStyle.fixed ? selectedNameStyle.img : NAME_STYLES[hoverIndex].img}
//                   alt="Necklace Preview"
//                   className="nk-mainImg"
//                 />

//                 {nameText && (
//                   <div className="nk-nameOverlay">
//                     <span className="nk-nameText">{nameText}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="nk-previewMeta">
//                 <div className="nk-metaRow">
//                   <span>Style</span>
//                   <strong>{selectedNameStyle.name}</strong>
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

//           {/* RIGHT CONTROLS */}
//           <section className="nk-controls">
//             <div className="nk-section">
//               <label className="nk-label">Engraved Name</label>
//               <input
//                 className="nk-input"
//                 type="text"
//                 maxLength={12}
//                 placeholder="Enter name (max 12)"
//                 value={nameText}
//                 onChange={(e) => setNameText(e.target.value)}
//               />
//               <p className="nk-help">Tip: shorter names look more balanced.</p>
//             </div>

//             <div className="nk-section">
//               <label className="nk-label">Metal</label>
//               <div className="nk-metals">
//                 {METALS.map((m) => (
//                   <button
//                     key={m.name}
//                     type="button"
//                     className={`nk-metalBtn ${metal === m.color ? "isActive" : ""}`}
//                     onClick={() => setMetal(m.color)}
//                   >
//                     <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
//                     <span className="nk-metalName">{m.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Panel openers */}
//             <button
//               type="button"
//               className={`nk-rowBtn ${activePanel === "nameStyle" ? "open" : ""}`}
//               onClick={() => togglePanel("nameStyle")}
//             >
//               <div className="nk-rowLeft">
//                 <span className="nk-rowTitle">Name Style</span>
//                 <span className="nk-rowValue">{selectedNameStyle.name}</span>
//               </div>
//               <span className="nk-chevron" aria-hidden="true" />
//             </button>

//             <button
//               type="button"
//               className={`nk-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
//               onClick={() => togglePanel("chainLength")}
//             >
//               <div className="nk-rowLeft">
//                 <span className="nk-rowTitle">Chain & Length</span>
//                 <span className="nk-rowValue">
//                   {selectedChain.name} · {selectedLength}"
//                 </span>
//               </div>
//               <span className="nk-chevron" aria-hidden="true" />
//             </button>

//             <button className="nk-next" type="button" onClick={handleSubmit}>
//               Order Summary 
//             </button>
//           </section>

//           {/* RIGHT SLIDE PANEL */}
//           <aside className={`nk-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
//             <div className="nk-panelHeader">
//               <div>
//                 <h3 className="nk-panelTitle">
//                   {activePanel === "nameStyle" ? "Select Name Style" : "Chain & Length"}
//                 </h3>
//                 <p className="nk-panelSub">
//                   {activePanel === "nameStyle"
//                     ? "Pick the font look that matches your vibe."
//                     : "Choose the chain type and length."}
//                 </p>
//               </div>

//               <button type="button" className="nk-close" onClick={closePanel}>
//                 Close
//               </button>
//             </div>

//             <div className="nk-panelBody">
//               {activePanel === "nameStyle" && (
//                 <div className="nk-grid">
//                   {NAME_STYLES.map((style) => (
//                     <button
//                       key={style.name}
//                       type="button"
//                       className={`nk-cardPick ${
//                         selectedNameStyle.name === style.name ? "isActive" : ""
//                       }`}
//                       onClick={() => setSelectedNameStyle({ ...style, fixed: true })}
//                     >
//                       <img src={style.img} alt={style.name} className="nk-cardImg" />
//                       <div className="nk-cardText">
//                         <strong>{style.name}</strong>
//                         <span>Tap to select</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {activePanel === "chainLength" && (
//                 <>
//                   <h4 className="nk-panelSectionTitle">Chain Type</h4>
//                   <div className="nk-chainGrid">
//                     {CHAINS.map((c) => (
//                       <button
//                         key={c.name}
//                         type="button"
//                         className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
//                         onClick={() => setSelectedChain(c)}
//                       >
//                         <img src={c.img} alt={c.name} className="nk-chainImg" />
//                         <strong>{c.name}</strong>
//                       </button>
//                     ))}
//                   </div>

//                   <h4 className="nk-panelSectionTitle">Length</h4>
//                   <div className="nk-lengths">
//                     {LENGTHS.map((len) => (
//                       <button
//                         key={len}
//                         type="button"
//                         className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
//                         onClick={() => setSelectedLength(len)}
//                       >
//                         {len}"
//                       </button>
//                     ))}
//                   </div>

//                   <div className="nk-lengthPreview">
//                     <img src={LengthImg} alt="Length Guide" className="nk-lengthImg" />
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* FIXED FOOTER */}
//             {activePanel && (
//               <div className="nk-panelFooter">
//                 <button className="nk-confirm" type="button" onClick={closePanel}>
//                   {activePanel === "nameStyle" ? "Confirm Style" : "Confirm Selection"}
//                 </button>
//               </div>
//             )}
//           </aside>

//           {/* OVERLAY */}
//           {activePanel && <div className="nk-overlay" onClick={closePanel} />}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
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

/* ---------------- CONSTANTS ---------------- */
const API_BASE = "http://localhost:5000";
const ORDER_PAGE_ROUTE = "/orderpage";
const BASE_PRICE_NAME_NECKLACE = 40;
const NAME_NECKLACE_DB_STYLE = "name";

const CHAIN_DB_MAP = { Cable: "cable", Rope: "rope", Box: "box", Thin: "thin" };

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "Rose Gold" },
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
  const { addToCart } = useCart();

  const [activePanel, setActivePanel] = useState(null); // "nameStyle" | "chainLength" | null

  const [selectedNameStyle, setSelectedNameStyle] = useState({
    ...NAME_STYLES[0],
    fixed: false,
  });
  const [hoverIndex, setHoverIndex] = useState(0);

  const [nameText, setNameText] = useState("");
  const [metal, setMetal] = useState(METALS[0]);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

  const [uiError, setUiError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // bottom bar feedback
  const [addedMsg, setAddedMsg] = useState("");
  const [addedAccessoryID, setAddedAccessoryID] = useState(null);

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name] || null,
    [selectedChain]
  );

  // Auto-cycle preview until style is fixed
  useEffect(() => {
    if (selectedNameStyle.fixed) return;
    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [selectedNameStyle.fixed]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) => {
    setUiError("");
    setAddedMsg("");
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  // ✅ Add to cart immediately (POST DB + CartContext), no navigation
  const addToCartNow = async () => {
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);

    const trimmedName = String(nameText || "").trim();
    if (!trimmedName) {
      setUiError("Please enter the engraved name.");
      return;
    }
    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    setIsAdding(true);
    try {
      const payload = {
        type: "necklace",
        metal: metal.api, // controller should map -> materialID
        nbOfCharms: 0,
        nbOfStones: 0,
        product: {
          chain: chainDbValue,
          style: NAME_NECKLACE_DB_STYLE, // ✅ "name" => base price 40 (fixed-price rule)
          length: selectedLength,

          // optional extras for UI
          nameText: trimmedName,
          nameStyle: selectedNameStyle.name,
        },
        charms: [],
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
        const msg =
          data?.sqlMessage ||
          data?.error ||
          data?.message ||
          `Failed (${res.status})`;
        throw new Error(msg);
      }

      const accessoryID = data?.accessoryID;
      const computedPrice = data?.computedPrice;

      if (!accessoryID) throw new Error("Backend did not return accessoryID.");

      // ✅ add to CartContext (uses tala_cart_v1)
      addToCart({
        accessoryID,
        type: "necklace",
        style: NAME_NECKLACE_DB_STYLE,
        metal: metal.name,
        chain: selectedChain.name,
        chainDb: chainDbValue,
        length: selectedLength,
        nameText: trimmedName,
        nameStyle: selectedNameStyle.name,
        previewImg: selectedNameStyle.img,
        price: computedPrice ?? BASE_PRICE_NAME_NECKLACE,
      });

      setAddedAccessoryID(accessoryID);
      setAddedMsg("Added to cart!");
    } catch (err) {
      console.error(err);
      setUiError(err.message || "Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Necklace</h2>
          <p className="nk-subtitle">
            Choose a style, chain, and finish then make it yours.
          </p>
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
          {/* LEFT PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">{metal.name}</span>
              </div>

              <div className="nk-imageWrap">
                <img
                  src={
                    selectedNameStyle.fixed
                      ? selectedNameStyle.img
                      : NAME_STYLES[hoverIndex].img
                  }
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
                onChange={(e) => {
                  setUiError("");
                  setAddedMsg("");
                  setNameText(e.target.value);
                }}
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
                    className={`nk-metalBtn ${
                      metal.name === m.name ? "isActive" : ""
                    }`}
                    onClick={() => {
                      setUiError("");
                      setAddedMsg("");
                      setMetal(m);
                    }}
                  >
                    <span
                      className="nk-metalDot"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="nk-metalName">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`nk-rowBtn ${
                activePanel === "nameStyle" ? "open" : ""
              }`}
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
              className={`nk-rowBtn ${
                activePanel === "chainLength" ? "open" : ""
              }`}
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

            {/* ✅ Removed the second Add button here (only bottom bar remains) */}
          </section>

          {/* RIGHT SLIDE PANEL */}
          <aside
            className={`nk-panel ${activePanel ? "open" : ""}`}
            aria-hidden={!activePanel}
          >
            <div className="nk-panelHeader">
              <div>
                <h3 className="nk-panelTitle">
                  {activePanel === "nameStyle"
                    ? "Select Name Style"
                    : "Chain & Length"}
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
                      onClick={() => {
                        setUiError("");
                        setAddedMsg("");
                        setSelectedNameStyle({ ...style, fixed: true });
                      }}
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
                        className={`nk-chainCard ${
                          selectedChain.name === c.name ? "isActive" : ""
                        }`}
                        onClick={() => {
                          setUiError("");
                          setAddedMsg("");
                          setSelectedChain(c);
                        }}
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
                        className={`nk-lengthBtn ${
                          selectedLength === len ? "isActive" : ""
                        }`}
                        onClick={() => {
                          setUiError("");
                          setAddedMsg("");
                          setSelectedLength(len);
                        }}
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

            {activePanel && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" type="button" onClick={closePanel}>
                  {activePanel === "nameStyle" ? "Confirm Style" : "Confirm Selection"}
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={closePanel} />}
        </div>
      </div>

      {/* ✅ BOTTOM BAR: show base price, single Add to Cart button */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          marginTop: 16,
          padding: "12px 16px",
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 900, fontSize: 16 }}>
            ${BASE_PRICE_NAME_NECKLACE.toFixed(2)}
          </span>
          <span style={{ fontSize: 12, opacity: 0.75 }}>
            Base price for Name Necklace
            {addedAccessoryID ? ` • ID: ${addedAccessoryID}` : ""}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {addedMsg ? (
            <span style={{ fontWeight: 800, color: "#1a7f37" }}>{addedMsg}</span>
          ) : null}

          <button
            type="button"
            onClick={() => navigate(ORDER_PAGE_ROUTE)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            View Cart
          </button>

          <button
            type="button"
            onClick={addToCartNow}
            disabled={isAdding}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 900,
              opacity: isAdding ? 0.7 : 1,
            }}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
