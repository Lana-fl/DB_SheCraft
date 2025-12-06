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
import React, { useState } from "react"; // ✅ import useState here
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../styles/necklace.css";


// Images
import NecklaceImg from "../assets/necklace/length.png";
import Name1Img from "../assets/necklace/name1.png";
import Name2Img from "../assets/necklace/name2.png";
import Name3Img from "../assets/necklace/name3.png";
import Name4Img from "../assets/necklace/name4.png";
import Necklace from "../assets/necklace/name.png";

const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
];

const LENGTHS = [14, 15, 16, 18, 20];

const FONT_TYPES = ["Bold", "Italic", "Regular", "Bubble"];

const IMAGES = [
  { name: "Name1", img: Name1Img },
  { name: "Name2", img: Name2Img },
  { name: "Name3", img: Name3Img },
  { name: "Name4", img: Name4Img },
  { name: "Length", img: NecklaceImg },
];

export default function NecklacesPage() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [metal, setMetal] = useState(METALS[0].color);
  const [necklaceLength, setNecklaceLength] = useState(16);
  const [chainType, setChainType] = useState("Link");
  const [fontType, setFontType] = useState(FONT_TYPES[0]);
  const [currentStep, setCurrentStep] = useState(1);


  const handleImageClick = () => {
  const img = document.querySelector(".main-necklace-img");
  img.classList.add("fade-out");
  setTimeout(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    img.classList.remove("fade-out");
  }, 250); // half of the CSS transition duration
};

const handleSubmit = () => {
  navigate("/designer", {
    state: {
      itemType: "necklace",              // tells DesignerPage it’s a necklace
      image: Necklace,   // currently selected image
      nameText: IMAGES[currentIndex].name,
      metal,
      necklaceLength,
      chainType,
      fontType,
    },
  });
};

  return (
    <div className="page-wrapper">
      <div className="necklace-page">
        <h2>Customize Your Necklace</h2>

        {/* Horizontal Steps */}
        <div className="steps-horizontal">
          {["Customize Your Necklace", "Choose Your Designer", "Checkout"].map(
            (label, index) => (
              <div
                key={index}
                className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
                onClick={() => setCurrentStep(index + 1)}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-labels">{label}</div>
              </div>
            )
          )}
        </div>

        <div className="necklace-customizer ring-style-layout">
          {/* Main Image Viewer (Left Side) */}
          <div className="viewer-left" onClick={handleImageClick}>
            <img
              src={IMAGES[currentIndex].img}
              alt={IMAGES[currentIndex].name}
              className="main-necklace-img"
            />
            <p className="click-hint">Click image to see next option</p>
          </div>

          {/* Sidebar Controls (Right Side) */}
          <div className="tabs-sidebar">
            {/* Font Type */}
            <div className="tab-section">
              <label>Font Type</label>
              <select value={fontType} onChange={(e) => setFontType(e.target.value)}>
                {FONT_TYPES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Metal */}
            <div className="tab-section">
              <label>Metal</label>
              <div className="options-grid">
                {METALS.map((m) => (
                  <div
                    key={m.name}
                    className={`option-card ${metal === m.color ? "selected" : ""}`}
                    onClick={() => setMetal(m.color)}
                  >
                    <div className="color-swatch" style={{ backgroundColor: m.color }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="tab-section">
              <label>Length</label>
              <select
                value={necklaceLength}
                onChange={(e) => setNecklaceLength(Number(e.target.value))}
              >
                {LENGTHS.map((len) => (
                  <option key={len} value={len}>
                    {len}"
                  </option>
                ))}
              </select>
            </div>

            {/* Chain Type */}
            <div className="tab-section">
              <label>Chain Type</label>
              <select value={chainType} onChange={(e) => setChainType(e.target.value)}>
                <option>Link</option>
                <option>Rope</option>
                <option>Box</option>
                <option>Cable</option>
              </select>
            </div>

            <button className="next-btn" onClick={handleSubmit}>
              Next to Designer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
