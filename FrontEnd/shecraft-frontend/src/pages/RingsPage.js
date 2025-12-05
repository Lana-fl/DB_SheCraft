// // import React, { useState, useEffect } from "react";
// // import "../styles/ring.css";
// // import Footer from "./Footer";

// // // Preset images
// // import baseHalo from "../assets/ring/base-halo.png";
// // import baseSolitaire from "../assets/ring/base-solitaire.png";
// // import baseThreeHalo from "../assets/ring/base-three-halo.png";
// // import round from "../assets/ring/cuts/round.png";
// // import princess from "../assets/ring/cuts/princess.png";
// // import emeraldCut from "../assets/ring/cuts/emerald.png";
// // import heart from "../assets/ring/cuts/heart.png";
// // import marquise from "../assets/ring/cuts/marquise.png";
// // import oval from "../assets/ring/cuts/oval.png";
// // import pear from "../assets/ring/cuts/pear.png";
// // import radiant from "../assets/ring/cuts/rafiant.png";
// // import asscher from "../assets/ring/cuts/asscher.png";
// // import cushion from "../assets/ring/cuts/cushion.png";
// // import emerald from "../assets/ring/emerald.png";
// // import ruby from "../assets/ring/ruby.png";
// // import sapphire from "../assets/ring/sapphire.png";

// // // Define options outside component to avoid useEffect warnings
// // const BASE_OPTIONS = [
// //   { name: "Halo", img: baseHalo },
// //   { name: "Solitaire", img: baseSolitaire },
// //   { name: "Three Halo", img: baseThreeHalo },
// // ];

// // const CUT_OPTIONS = [
// //   { name: "Round", img: round },
// //   { name: "Princess", img: princess },
// //   { name: "Oval", img: oval },
// //   { name: "Emerald", img: emeraldCut },
// //   { name: "Radiant", img: radiant },
// //   { name: "Heart", img: heart },
// //   { name: "Asscher", img: asscher },
// //   { name: "Pear", img: pear },
// //   { name: "Marquise", img: marquise },
// //   { name: "Cushion", img: cushion },
// // ];

// // const COLOR_OPTIONS = [
// //   { name: "Emerald", img: emerald },
// //   { name: "Ruby", img: ruby },
// //   { name: "Sapphire", img: sapphire },
// // ];

// // export default function RingsPage() {
// //   const [base, setBase] = useState(baseSolitaire);
// //   const [cut, setCut] = useState(round);
// //   const [color, setColor] = useState(emerald);
// //   const [activeTab, setActiveTab] = useState("base");
// //   const [generatedImage, setGeneratedImage] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Generate AI image automatically when selection changes
// //   useEffect(() => {
// //     const generateRing = async () => {
// //       setLoading(true);
// //       setGeneratedImage(null);

// //       try {
// //         const prompt = `A realistic luxury ring with a ${
// //           BASE_OPTIONS.find((b) => b.img === base).name
// //         } band, a ${
// //           CUT_OPTIONS.find((c) => c.img === cut).name
// //         } cut gemstone in ${
// //           COLOR_OPTIONS.find((col) => col.img === color).name
// //         } color, high-quality photography style, luxury jewelry lighting, cold tone colors.`;

// //         const response = await fetch("http://localhost:5000/api/generate-ring", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ prompt }),
// //         });

// //         const data = await response.json();
// //         setGeneratedImage(data.url);
// //       } catch (err) {
// //         console.error(err);
// //         alert("Failed to generate AI ring. Make sure your backend is running on port 5000.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     generateRing();
// //   }, [base, cut, color]);

// //   return (
// //     <div className="ring-page">
// //       <h1 className="title">Customize Your Ring</h1>

// //       <div className="customizer-container">
// //         {/* LEFT — Preview */}
// //         <div className="preview-section">
// //           {loading ? (
// //             <div className="placeholder">Generating AI ring...</div>
// //           ) : (
// //             <img
// //               src={generatedImage || base}
// //               alt="AI Generated Ring"
// //               className="ai-ring-preview"
// //             />
// //           )}
// //         </div>

// //         {/* RIGHT — Options */}
// //         <div className="options-section">
// //           <div className="tabs-header">
// //             {["base", "cut", "color"].map((tab) => (
// //               <button
// //                 key={tab}
// //                 className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
// //                 onClick={() => setActiveTab(tab)}
// //               >
// //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="tab-content">
// //             {activeTab === "base" &&
// //               <div className="options-grid">
// //                 {BASE_OPTIONS.map((option) => (
// //                   <div
// //                     key={option.name}
// //                     className={`option-card ${base === option.img ? "selected" : ""}`}
// //                     onClick={() => setBase(option.img)}
// //                   >
// //                     <img src={option.img} alt={option.name} />
// //                     <p>{option.name}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             }
// //             {activeTab === "cut" &&
// //               <div className="options-grid">
// //                 {CUT_OPTIONS.map((option) => (
// //                   <div
// //                     key={option.name}
// //                     className={`option-card ${cut === option.img ? "selected" : ""}`}
// //                     onClick={() => setCut(option.img)}
// //                   >
// //                     <img src={option.img} alt={option.name} />
// //                     <p>{option.name}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             }
// //             {activeTab === "color" &&
// //               <div className="options-grid">
// //                 {COLOR_OPTIONS.map((option) => (
// //                   <div
// //                     key={option.name}
// //                     className={`option-card ${color === option.img ? "selected" : ""}`}
// //                     onClick={() => setColor(option.img)}
// //                   >
// //                     <img src={option.img} alt={option.name} />
// //                     <p>{option.name}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             }
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import { Gem, Diamond, Heart, Circle, Square, Minus, Loader2, Info } from 'lucide-react';

// // // --- Configuration Data ---
// // const BASE_OPTIONS = [
// //   { id: 'halo', name: 'Halo', description: 'White Gold with Diamond Halo' },
// //   { id: 'solitaire', name: 'Solitaire', description: 'Platinum Solitaire' },
// //   { id: 'pave', name: 'Pave', description: 'Rose Gold Pave Band' },
// // ];

// // const CUT_OPTIONS = [
// //   { id: 'round', name: 'Round', icon: Circle },
// //   { id: 'princess', name: 'Princess', icon: Square },
// //   { id: 'oval', name: 'Oval', icon: Circle },
// //   { id: 'emerald', name: 'Emerald', icon: Minus },
// //   { id: 'heart', name: 'Heart', icon: Heart },
// //   { id: 'pear', name: 'Pear', icon: Gem },
// // ];

// // const COLOR_OPTIONS = [
// //   { id: 'diamond', name: 'Diamond', color: 'bg-white border-gray-400', promptName: 'clear diamond' },
// //   { id: 'ruby', name: 'Ruby', color: 'bg-red-600 border-red-800', promptName: 'vibrant red ruby' },
// //   { id: 'sapphire', name: 'Sapphire', color: 'bg-blue-600 border-blue-800', promptName: 'deep blue sapphire' },
// //   { id: 'emerald', name: 'Emerald', color: 'bg-green-600 border-green-800', promptName: 'rich green emerald' },
// // ];

// // // --- Utility: Exponential Backoff Fetch ---
// // const MAX_RETRIES = 5;
// // const API_KEY = ""; // Kept empty as per instructions

// // async function fetchWithBackoff(url, options, maxRetries = MAX_RETRIES) {
// //     for (let i = 0; i < maxRetries; i++) {
// //         try {
// //             const response = await fetch(url, options);
// //             if (response.ok) {
// //                 return await response.json();
// //             }
// //             // Handle rate limiting (e.g., status 429) or temporary server errors (e.g., status 5xx)
// //             if (response.status === 429 || response.status >= 500) {
// //                 if (i === maxRetries - 1) throw new Error(`API failed after ${maxRetries} retries: ${response.statusText}`);
// //                 const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
// //                 console.warn(`Attempt ${i + 1} failed with status ${response.status}. Retrying in ${Math.round(delay / 1000)}s...`);
// //                 await new Promise(resolve => setTimeout(resolve, delay));
// //             } else {
// //                 // For client errors (4xx other than 429), parse the error and fail immediately
// //                 const errorBody = await response.json().catch(() => response.text());
// //                 throw new Error(`API Request Failed: ${response.status} - ${JSON.stringify(errorBody)}`);
// //             }
// //         } catch (error) {
// //             if (i === maxRetries - 1) throw error;
// //             const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
// //             console.warn(`Attempt ${i + 1} failed with error. Retrying in ${Math.round(delay / 1000)}s...`, error);
// //             await new Promise(resolve => setTimeout(resolve, delay));
// //         }
// //     }
// // }

// // // --- Main Component ---
// // export default function App() {
// //   const [selectedBase, setSelectedBase] = useState(BASE_OPTIONS[0].id);
// //   const [selectedCut, setSelectedCut] = useState(CUT_OPTIONS[0].id);
// //   const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].id);
// //   const [activeTab, setActiveTab] = useState("base");
// //   const [generatedImage, setGeneratedImage] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Helper to find selected object names for the prompt
// //   const baseName = useMemo(() => BASE_OPTIONS.find(b => b.id === selectedBase)?.description || 'ring base', [selectedBase]);
// //   const cutName = useMemo(() => CUT_OPTIONS.find(c => c.id === selectedCut)?.name || 'round', [selectedCut]);
// //   const colorName = useMemo(() => COLOR_OPTIONS.find(col => col.id === selectedColor)?.promptName || 'clear diamond', [selectedColor]);
  
// //   const prompt = useMemo(() => 
// //     `A highly detailed, photorealistic, 4k image of an engagement ring. The center stone is a ${colorName} gemstone with a ${cutName} cut. The setting features a ${baseName}. Luxurious jewelry photography, focus on the ring, white background, cold tone lighting.`, 
// //     [baseName, cutName, colorName]
// //   );

// //   // Function to generate AI image
// //   const generateRing = useCallback(async () => {
// //     setLoading(true);
// //     setGeneratedImage(null);
// //     setError(null);

// //     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
    
// //     const payload = { 
// //         instances: { prompt: prompt }, 
// //         parameters: { "sampleCount": 1 } 
// //     };

// //     try {
// //       const result = await fetchWithBackoff(apiUrl, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });
      
// //       const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

// //       if (base64Data) {
// //         const imageUrl = `data:image/png;base64,${base64Data}`;
// //         setGeneratedImage(imageUrl);
// //       } else {
// //         setError("AI generation failed: Could not retrieve image data from the service.");
// //       }

// //     } catch (err) {
// //       console.error("Image Generation Error:", err);
// //       setError("Failed to generate AI ring. " + (err.message || "Please check your network and try again."));
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [prompt]);

// //   // Generate AI image automatically when selection changes
// //   useEffect(() => {
// //     generateRing();
// //   }, [generateRing]);
  
// //   const TabButton = ({ tabId, children }) => (
// //     <button
// //       className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200 ${
// //         activeTab === tabId
// //           ? 'bg-white text-gray-900 border-b-2 border-indigo-600'
// //           : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
// //       }`}
// //       onClick={() => setActiveTab(tabId)}
// //     >
// //       {children}
// //     </button>
// //   );

// //   const OptionCard = ({ name, description, isSelected, onClick, children }) => (
// //     <div
// //       className={`p-4 flex flex-col items-center justify-center text-center rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-[1.03] ${
// //         isSelected
// //           ? 'ring-4 ring-indigo-500 bg-indigo-50 text-indigo-700'
// //           : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
// //       }`}
// //       onClick={onClick}
// //       aria-label={`Select ${name}`}
// //     >
// //       {children}
// //       <p className="mt-2 text-sm font-medium">{name}</p>
// //       {description && <p className="text-xs text-gray-500">{description}</p>}
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">
// //           AI Jewelry Customizer
// //         </h1>

// //         <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-2xl">
// //           {/* LEFT — Preview Section */}
// //           <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-inner min-h-[400px] relative">
// //             <div className="absolute top-4 left-4 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
// //                 {baseName} | {cutName} | {colorName}
// //             </div>
            
// //             {loading ? (
// //               <div className="flex flex-col items-center justify-center h-full w-full">
// //                 <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
// //                 <p className="mt-4 text-indigo-600 font-semibold text-lg">Generating Realistic Ring...</p>
// //                 <p className="text-sm text-gray-500 mt-1">This may take up to 30 seconds.</p>
// //               </div>
// //             ) : error ? (
// //                 <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg max-w-sm text-center">
// //                     <div className="flex items-center justify-center mb-2">
// //                         <Info className="w-5 h-5 mr-2" />
// //                         <p className="font-bold">Generation Error</p>
// //                     </div>
// //                     <p className="text-sm">{error}</p>
// //                 </div>
// //             ) : generatedImage ? (
// //               <img
// //                 src={generatedImage}
// //                 alt="AI Generated Ring"
// //                 className="w-full max-w-md h-auto object-contain transition-opacity duration-500 rounded-lg"
// //                 onError={() => setError("Image failed to load. Try changing a selection.")}
// //               />
// //             ) : (
// //                 <div className="p-6 text-center text-gray-500">
// //                     <Diamond className="w-12 h-12 mx-auto mb-3 text-gray-400" />
// //                     <p>Select your configuration to generate the perfect ring image.</p>
// //                 </div>
// //             )}
// //           </div>

// //           {/* RIGHT — Options Section */}
// //           <div className="lg:w-1/2">
// //             <div className="flex border-b border-gray-200 mb-6">
// //               <TabButton tabId="base">Base</TabButton>
// //               <TabButton tabId="cut">Cut</TabButton>
// //               <TabButton tabId="color">Color</TabButton>
// //             </div>

// //             <div className="tab-content">
// //               <div className="options-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
// //                 {activeTab === "base" &&
// //                   BASE_OPTIONS.map((option) => (
// //                     <OptionCard
// //                       key={option.id}
// //                       name={option.name}
// //                       description={option.description}
// //                       isSelected={selectedBase === option.id}
// //                       onClick={() => setSelectedBase(option.id)}
// //                     >
// //                       <Diamond className="w-8 h-8" />
// //                     </OptionCard>
// //                   ))}

// //                 {activeTab === "cut" &&
// //                   CUT_OPTIONS.map((option) => (
// //                     <OptionCard
// //                       key={option.id}
// //                       name={option.name}
// //                       isSelected={selectedCut === option.id}
// //                       onClick={() => setSelectedCut(option.id)}
// //                     >
// //                       <option.icon className="w-8 h-8" />
// //                     </OptionCard>
// //                   ))}

// //                 {activeTab === "color" &&
// //                   COLOR_OPTIONS.map((option) => (
// //                     <OptionCard
// //                       key={option.id}
// //                       name={option.name}
// //                       isSelected={selectedColor === option.id}
// //                       onClick={() => setSelectedColor(option.id)}
// //                     >
// //                       <div className={`w-8 h-8 rounded-full border-2 ${option.color} shadow-lg`} />
// //                     </OptionCard>
// //                   ))}
// //               </div>
              
// //               <div className="mt-8 p-4 bg-indigo-50 text-indigo-800 rounded-lg text-sm">
// //                 <p className="font-bold">Current Prompt:</p>
// //                 <p className="mt-1 font-mono text-xs overflow-auto whitespace-normal break-words">{prompt}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Simple Footer Component */}
// //         <div className="mt-12 text-center text-gray-400 text-xs">
// //             <p>&copy; {new Date().getFullYear()} AI Gemstone Generator. Powered by Google Imagen.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import "../styles/ring.css";
// import Footer from "./Footer";

// // --- Preset images ---
// import baseHalo from "../assets/ring/base-halo.png";
// import baseSolitaire from "../assets/ring/base-solitaire.png";
// import baseThreeHalo from "../assets/ring/base-three-halo.png";
// import round from "../assets/ring/cuts/round.png";
// import princess from "../assets/ring/cuts/princess.png";
// import emeraldCut from "../assets/ring/cuts/emerald.png";
// import heart from "../assets/ring/cuts/heart.png";
// import marquise from "../assets/ring/cuts/marquise.png";
// import oval from "../assets/ring/cuts/oval.png";
// import pear from "../assets/ring/cuts/pear.png";
// import radiant from "../assets/ring/cuts/rafiant.png";
// import asscher from "../assets/ring/cuts/asscher.png";
// import cushion from "../assets/ring/cuts/cushion.png";
// import emerald from "../assets/ring/emerald.png";
// import ruby from "../assets/ring/ruby.png";
// import sapphire from "../assets/ring/sapphire.png";

// export default function RingsPage() {
//   const BASE_OPTIONS = [
//     { name: "Halo", img: baseHalo },
//     { name: "Solitaire", img: baseSolitaire },
//     { name: "Three Halo", img: baseThreeHalo },
//   ];

//   const CUT_OPTIONS = [
//     { name: "Round", img: round },
//     { name: "Princess", img: princess },
//     { name: "Oval", img: oval },
//     { name: "Emerald", img: emeraldCut },
//     { name: "Radiant", img: radiant },
//     { name: "Heart", img: heart },
//     { name: "Asscher", img: asscher },
//     { name: "Pear", img: pear },
//     { name: "Marquise", img: marquise },
//     { name: "Cushion", img: cushion },
//   ];

//   const COLOR_OPTIONS = [
//     { name: "Emerald", img: emerald },
//     { name: "Ruby", img: ruby },
//     { name: "Sapphire", img: sapphire },
//   ];

//   const [base, setBase] = useState(baseSolitaire);
//   const [cut, setCut] = useState(round);
//   const [color, setColor] = useState(emerald);
//   const [activeTab, setActiveTab] = useState("base");

//   return (
//     <div className="ring-page">
//       <h1 className="title">Customize Your Ring</h1>

//       <div className="customizer-container">
//         {/* LEFT — Preview */}
//         <div
//           className="preview-section"
//           style={{ position: "relative", width: 300, height: 300 }}
//         >
//           <img
//             src={base}
//             alt="Ring Base"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "contain",
//               zIndex: 1,
//             }}
//           />
//           <img
//             src={cut}
//             alt="Ring Cut"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "contain",
//               zIndex: 2,
//             }}
//           />
//           <img
//             src={color}
//             alt="Ring Color"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "contain",
//               zIndex: 3,
//             }}
//           />
//         </div>

//         {/* RIGHT — Options */}
//         <div className="options-section">
//           <div className="tabs-header">
//             {["base", "cut", "color"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="tab-content">
//             {activeTab === "base" && (
//               <div className="options-grid">
//                 {BASE_OPTIONS.map((option) => (
//                   <div
//                     key={option.name}
//                     className={`option-card ${
//                       base === option.img ? "selected" : ""
//                     }`}
//                     onClick={() => setBase(option.img)}
//                   >
//                     <img src={option.img} alt={option.name} />
//                     <p>{option.name}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {activeTab === "cut" && (
//               <div className="options-grid">
//                 {CUT_OPTIONS.map((option) => (
//                   <div
//                     key={option.name}
//                     className={`option-card ${
//                       cut === option.img ? "selected" : ""
//                     }`}
//                     onClick={() => setCut(option.img)}
//                   >
//                     <img src={option.img} alt={option.name} />
//                     <p>{option.name}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {activeTab === "color" && (
//               <div className="options-grid">
//                 {COLOR_OPTIONS.map((option) => (
//                   <div
//                     key={option.name}
//                     className={`option-card ${
//                       color === option.img ? "selected" : ""
//                     }`}
//                     onClick={() => setColor(option.img)}
//                   >
//                     <img src={option.img} alt={option.name} />
//                     <p>{option.name}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";

// import ringGLB from "../assets/ring/ring.glb"; // make sure path is correct

// // Base options
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", metalness: 1, roughness: 0.3 },
//   { name: "Gold", color: "#FFD700", metalness: 1, roughness: 0.25 },
//   { name: "Rose Gold", color: "#B76E79", metalness: 1, roughness: 0.25 },
// ];


// // Diamond defaults
// const DIAMOND_DEFAULTS = [
//   { name: "Middle Diamond", color: "#FFFFFF" },
//   { name: "Side Diamond 1", color: "#FFFFFF" },
//   { name: "Side Diamond 2", color: "#FFFFFF" },
// ];

// function RingModel({ baseColor, diamondColors }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const meshRefs = useRef({}); // store all meshes by name
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;

//     // Automatically collect all meshes in the scene
//     scene.traverse(obj => {
//       if (obj.isMesh) {
//         meshRefs.current[obj.name] = obj;
//       }
//     });

//     // Auto-fit
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim; // adjust padding
//     setScale(scaleFactor);

//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   // Update base color dynamically (first mesh assumed as base, or name contains "Ring")
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     Object.values(meshRefs.current).forEach(mesh => {
//       if (mesh.name.toLowerCase().includes("ring")) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: 0.2,
//           metalness: 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor]);

//   // Update diamonds dynamically (any mesh with "diamond" in name)
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     diamondColors.forEach((diamond, i) => {
//       // find mesh dynamically
//       const mesh = Object.values(meshRefs.current).find(m =>
//         m.name.toLowerCase().includes(`diamond${i + 1}`) ||
//         m.name.toLowerCase().includes(`thinring${i}`) // fallback to old naming
//       );

//       if (mesh) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamond.color,
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 0.9,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors]);

//   if (!sceneRef.current) return null;

//   return (
//     <primitive
//       object={sceneRef.current}
//       scale={[scale, scale, scale]}
//       position={position}
//     />
//   );
// }

// export default function RingsPage() {
//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [diamondColors, setDiamondColors] = useState(DIAMOND_DEFAULTS);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev =>
//       prev.map((d, i) => (i === index ? { ...d, color } : d))
//     );
//   };

//   return (
//     <div className="ring-page">
//       <h1 className="title">Customize Your 3D Ring</h1>

//       <div className="customizer-container">
//         {/* 3D Preview */}
//         <div className="preview-section" style={{ height: 450 }}>
//           <Canvas
//             shadows
//             gl={{ physicallyCorrectLights: true }}
//             camera={{ position: [0, 2, 5], fov: 50 }}
//           >
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />
//             <directionalLight position={[-5, 5, -5]} intensity={0.5} />
//             <Suspense fallback={null}>
//               <RingModel baseColor={baseColor} diamondColors={diamondColors} />
//               <Suspense fallback={null}>
//   <RingModel baseColor={baseColor} diamondColors={diamondColors} />
//   <Environment preset="sunset" background={false} /> {/* reflections */}
//   <color attach="background" args={["#f0f0f0"]} /> {/* fixed background */}
// </Suspense>
//             </Suspense>
//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Options */}
//         <div className="options-section">
//           <h3>Choose Base</h3>
//           <div className="options-grid">
//             {BASE_OPTIONS.map(option => (
//               <div
//                 key={option.name}
//                 className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                 onClick={() => setBaseColor(option.color)}
//               >
//                 <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                 <p>{option.name}</p>
//               </div>
//             ))}
//           </div>

//           <h3>Customize Diamonds</h3>
//           <div className="options-grid">
//             {diamondColors.map((d, i) => (
//               <div key={i} className="option-card">
//                 <input
//                   type="color"
//                   value={d.color}
//                   onChange={e => handleDiamondColorChange(i, e.target.value)}
//                 />
//                 <p>{d.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";

// import ringGLB from "../assets/ring/ring.glb"; // ensure path is correct

// // Base metals with realistic settings
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", roughness: 0.3, metalness: 1 },
//   { name: "Gold", color: "#FFD700", roughness: 0.25, metalness: 1 },
//   { name: "Rose Gold", color: "#B76E79", roughness: 0.25, metalness: 1 },
// ];

// // Diamond default setup
// const DIAMOND_MESHES = [
//   { name: "Middle Diamond", meshName: "ThinRing", defaultColor: "#FFFFFF" },
//   { name: "Side Diamond 1", meshName: "ThinRing1", defaultColor: "#FFFFFF" },
//   { name: "Side Diamond 2", meshName: "ThinRing2.001", defaultColor: "#FFFFFF" },
// ];

// function RingModel({ baseColor, diamondColors }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const meshRefs = useRef({}); // all meshes by name
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;

//     // Collect all meshes
//     scene.traverse(obj => {
//       if (obj.isMesh) {
//         meshRefs.current[obj.name] = obj;
//       }
//     });

//     // Auto-fit
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);

//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   // Update base material
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);

//     Object.values(meshRefs.current).forEach(mesh => {
//       if (mesh.name.toLowerCase().includes("ring")) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: baseMat?.roughness || 0.3,
//           metalness: baseMat?.metalness || 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor]);

//   // Update diamond materials per mesh
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = meshRefs.current[d.meshName];
//       if (mesh) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamondColors[i]?.color || d.defaultColor,
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 0.9,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors]);

//   if (!sceneRef.current) return null;

//   return (
//     <primitive
//       object={sceneRef.current}
//       scale={[scale, scale, scale]}
//       position={position}
//     />
//   );
// }

// export default function RingsPage() {
//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [diamondColors, setDiamondColors] = useState(DIAMOND_MESHES.map(d => ({ color: d.defaultColor })));

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev =>
//       prev.map((d, i) => (i === index ? { ...d, color } : d))
//     );
//   };

//   return (
//     <div className="ring-page">
//       <h1 className="title">Customize Your 3D Ring</h1>

//       <div className="customizer-container">
//         {/* 3D Preview */}
//         <div className="preview-section" style={{ height: 450 }}>
//           <Canvas
//             shadows
//             gl={{ physicallyCorrectLights: true }}
//             camera={{ position: [0, 2, 5], fov: 50 }}
//           >
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />
//             <directionalLight position={[-5, 5, -5]} intensity={0.5} />

//             <Suspense fallback={null}>
//               <RingModel baseColor={baseColor} diamondColors={diamondColors} />
//               <Environment preset="sunset" background={false} /> {/* reflections */}
//               <color attach="background" args={["#f0f0f0"]} /> {/* fixed canvas background */}
//             </Suspense>

//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Options */}
//         <div className="options-section">
//           <h3>Choose Base</h3>
//           <div className="options-grid">
//             {BASE_OPTIONS.map(option => (
//               <div
//                 key={option.name}
//                 className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                 onClick={() => setBaseColor(option.color)}
//               >
//                 <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                 <p>{option.name}</p>
//               </div>
//             ))}
//           </div>

//           <h3>Customize Diamonds</h3>
//           <div className="options-grid">
//             {DIAMOND_MESHES.map((d, i) => (
//               <div key={i} className="option-card">
//                 <input
//                   type="color"
//                   value={diamondColors[i]?.color || d.defaultColor}
//                   onChange={e => handleDiamondColorChange(i, e.target.value)}
//                 />
//                 <p>{d.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";

// import ringGLB from "../assets/ring/ring.glb"; // ensure path is correct

// // --- Realistic base metals ---
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", roughness: 0.3, metalness: 1 },
//   { name: "Gold", color: "#FFD700", roughness: 0.25, metalness: 1 },
//   { name: "Rose Gold", color: "#190f10ff", roughness: 0.25, metalness: 1 },
// ];

// // --- Diamond mesh names ---
// const DIAMOND_MESHES = [
//   { name: "Middle Diamond", meshName: "ThinRing_ThinRing_0", defaultColor: "#FFFFFF" },
//   { name: "Side Diamond 1", meshName: "ThinRing1_ThinRing1_0", defaultColor: "#FFFFFF" },
//   { name: "Side Diamond 2", meshName: "ThinRing2_ThinRing2_0", defaultColor: "#FFFFFF" },
// ];

// // Ring base and prongs
// const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

// function RingModel({ baseColor, diamondColors }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   // Clone scene and auto-fit
//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;

//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);

//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   // Update base and prongs material
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);

//     sceneRef.current.traverse(mesh => {
//       if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: baseMat?.roughness || 0.3,
//           metalness: baseMat?.metalness || 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor, sceneRef.current]);

//   // Update diamonds individually
//   useEffect(() => {
//     if (!sceneRef.current) return;

//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = sceneRef.current.getObjectByName(d.meshName);
//       if (mesh) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamondColors[i]?.color || d.defaultColor,
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 0.9,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors, sceneRef.current]);

//   if (!sceneRef.current) return null;

//   return (
//     <primitive
//       object={sceneRef.current}
//       scale={[scale, scale, scale]}
//       position={position}
//     />
//   );
// }

// export default function RingsPage() {
//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [diamondColors, setDiamondColors] = useState(
//     DIAMOND_MESHES.map(d => ({ color: d.defaultColor }))
//   );

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev =>
//       prev.map((d, i) => (i === index ? { ...d, color } : d))
//     );
//   };

//   return (
//     <div className="ring-page">
//       <h1 className="title">Customize Your 3D Ring</h1>

//       <div className="customizer-container">
//         {/* 3D Preview */}
//         <div className="preview-section" style={{ height: 450 }}>
//           <Canvas
//             shadows
//             gl={{ physicallyCorrectLights: true }}
//             camera={{ position: [0, 2, 5], fov: 50 }}
//           >
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />
//             <directionalLight position={[-5, 5, -5]} intensity={0.5} />

//             <Suspense fallback={null}>
//               <RingModel baseColor={baseColor} diamondColors={diamondColors} />
//               <Environment preset="sunset" background={false} />
//               <color attach="background" args={["#f0f0f0"]} />
//             </Suspense>

//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Options */}
//         <div className="options-section">
//           <h3>Choose Base</h3>
//           <div className="options-grid">
//             {BASE_OPTIONS.map(option => (
//               <div
//                 key={option.name}
//                 className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                 onClick={() => setBaseColor(option.color)}
//               >
//                 <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                 <p>{option.name}</p>
//               </div>
//             ))}
//           </div>

//           <h3>Customize Diamonds</h3>
//           <div className="options-grid">
//             {DIAMOND_MESHES.map((d, i) => (
//               <div key={i} className="option-card">
//                 <input
//                   type="color"
//                   value={diamondColors[i]?.color || d.defaultColor}
//                   onChange={e => handleDiamondColorChange(i, e.target.value)}
//                 />
//                 <p>{d.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



// pages/RingsPage.jsx
// import React, { useState } from "react";
// import Viewer from "./RingViewer";
// import { useNavigate } from "react-router-dom";

// export default function RingsPage() {
//   const navigate = useNavigate();

//   // === STATE ===
//   const [baseColor, setBaseColor] = useState("#FFD700"); // default gold
//   const [thickness, setThickness] = useState(5);
//   const [purity, setPurity] = useState("natural");
//   const [diamondCount, setDiamondCount] = useState(1);
//   const [diamondColors, setDiamondColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
//   const [weight, setWeight] = useState(2);
//   const [engraving, setEngraving] = useState("");

//   const [activeTab, setActiveTab] = useState(0);

//   const goCheckout = () => {
//     navigate("/checkout", {
//       state: {
//         baseColor,
//         thickness,
//         purity,
//         diamondCount,
//         diamondColors: diamondColors.slice(0, diamondCount),
//         weight,
//         engraving,
//       },
//     });
//   };

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors((prev) =>
//       prev.map((c, i) => (i === index ? color : c))
//     );
//   };

//   return (
//     <div className="ring-page ring-page-main">
//       {/* LEFT: 3D Viewer */}
//       <Viewer
//         baseColor={baseColor}
//         diamondColors={diamondColors.slice(0, diamondCount)}
//         diamondCount={diamondCount}
//         engravingText={engraving}
//       />

//       {/* RIGHT: Tabbed Questions */}
//       <div className="options-section">
//         {/* Tabs */}
//         <div className="tabs">
//           {["Base & Thickness", "Diamond Options", "Engraving & Weight", "Summary"].map((t, i) => (
//             <button
//               key={i}
//               className={activeTab === i ? "tab active" : "tab"}
//               onClick={() => setActiveTab(i)}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 0 && (
//             <div className="tab-panel">
//               <h3>Base Color</h3>
//               <div className="options-grid">
//                 {[
//                   { name: "Silver", color: "#C0C0C0" },
//                   { name: "Gold", color: "#FFD700" },
//                   { name: "Rose Gold", color: "#b76e79" },
//                 ].map((opt) => (
//                   <div
//                     key={opt.name}
//                     className={`option-card ${baseColor === opt.color ? "selected" : ""}`}
//                     onClick={() => setBaseColor(opt.color)}
//                   >
//                     <div className="color-swatch" style={{ backgroundColor: opt.color }} />
//                     <p>{opt.name}</p>
//                   </div>
//                 ))}
//               </div>

//               <h3>Ring Thickness</h3>
//               <input
//                 type="range"
//                 min="1"
//                 max="10"
//                 value={thickness}
//                 onChange={(e) => setThickness(e.target.value)}
//               />
//             </div>
//           )}

//           {activeTab === 1 && (
//             <div className="tab-panel">
//               <h3>Diamond Purity</h3>
//               <select value={purity} onChange={(e) => setPurity(e.target.value)}>
//                 <option value="natural">Natural</option>
//                 <option value="lab">Lab-grown</option>
//               </select>

//               <h3>Number of Diamonds</h3>
//               <select
//                 value={diamondCount}
//                 onChange={(e) => setDiamondCount(Number(e.target.value))}
//               >
//                 <option value={1}>1 Diamond</option>
//                 <option value={2}>2 Diamonds</option>
//                 <option value={3}>3 Diamonds</option>
//               </select>

//               <h3>Diamond Colors</h3>
//               {Array.from({ length: diamondCount }).map((_, i) => (
//                 <input
//                   key={i}
//                   type="color"
//                   value={diamondColors[i]}
//                   onChange={(e) => handleDiamondColorChange(i, e.target.value)}
//                   style={{ marginBottom: "10px", marginRight: "10px" }}
//                 />
//               ))}
//             </div>
//           )}

//           {activeTab === 2 && (
//             <div className="tab-panel">
//               <h3>Engraving</h3>
//               <input
//                 type="text"
//                 value={engraving}
//                 placeholder="Type your text..."
//                 onChange={(e) => setEngraving(e.target.value)}
//               />

//               <h3>Weight (grams)</h3>
//               <input
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//               />
//             </div>
//           )}

//           {activeTab === 3 && (
//             <div className="tab-panel">
//               <h3>Summary</h3>
//               <ul>
//                 <li>Base Color: {baseColor}</li>
//                 <li>Thickness: {thickness}</li>
//                 <li>Purity: {purity}</li>
//                 <li>Diamonds: {diamondCount}</li>
//                 {diamondColors.slice(0, diamondCount).map((c, i) => (
//                   <li key={i}>Diamond {i + 1} Color: {c}</li>
//                 ))}
//                 <li>Weight: {weight} grams</li>
//                 <li>Engraving: {engraving || "None"}</li>
//               </ul>

//               <button className="checkout-btn" onClick={goCheckout}>
//                 Continue to Checkout →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import RingViewer from "./RingViewer";
// import "../styles/ring.css";

// export default function RingPage() {
//   const [step, setStep] = useState(1);

//   const [selectedMetal, setSelectedMetal] = useState("gold");
//   const [selectedThickness, setSelectedThickness] = useState(2);
//   const [diamondType, setDiamondType] = useState("natural");
//   const [diamondColor, setDiamondColor] = useState("white");

//   // --------------------------
//   // METAL OPTIONS (carousel)
//   // --------------------------
//   const metals = [
//     { id: "gold", label: "Gold", color: "#DAA520" },
//     { id: "white-gold", label: "White Gold", color: "#E5E4E2" },
//     { id: "rose-gold", label: "Rose Gold", color: "#C08081" },
//     { id: "platinum", label: "Platinum", color: "#CECECE" },
//     { id: "silver", label: "Silver", color: "#C0C0C0" },
//   ];

//   // --------------------------
//   // THICKNESS OPTIONS
//   // --------------------------
//   const thicknesses = [1, 2, 3, 4, 5];

//   // --------------------------
//   // DIAMOND COLORS
//   // --------------------------
//   const naturalDiamondColors = ["white", "champagne", "cognac"];

//   const labDiamondColors = [
//     "white", "pink", "blue", "yellow", "green", "purple"
//   ];

//   const getDiamondColors = () =>
//     diamondType === "natural" ? naturalDiamondColors : labDiamondColors;

//   // --------------------------
//   // STEP RENDERERS
//   // --------------------------
//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="selector-container">
//             <h2 className="selector-title">Choose Your Metal</h2>
//             <div className="carousel">
//               {metals.map((metal) => (
//                 <div
//                   key={metal.id}
//                   className={`carousel-item ${selectedMetal === metal.id ? "active" : ""}`}
//                   onClick={() => setSelectedMetal(metal.id)}
//                 >
//                   <div
//                     className="metal-ball"
//                     style={{ background: metal.color }}
//                   ></div>
//                   <p>{metal.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="selector-container">
//             <h2 className="selector-title">Select Thickness</h2>
//             <div className="carousel">
//               {thicknesses.map((t) => (
//                 <div
//                   key={t}
//                   className={`carousel-item ${selectedThickness === t ? "active" : ""}`}
//                   onClick={() => setSelectedThickness(t)}
//                 >
//                   <div className="thickness-bar" style={{ width: `${t * 10}px` }} />
//                   <p>{t} mm</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="selector-container">
//             <h2 className="selector-title">Diamond Options</h2>

//             <div className="diamond-type-buttons">
//               <button
//                 className={diamondType === "natural" ? "active" : ""}
//                 onClick={() => setDiamondType("natural")}
//               >
//                 Natural
//               </button>

//               <button
//                 className={diamondType === "lab" ? "active" : ""}
//                 onClick={() => setDiamondType("lab")}
//               >
//                 Lab-Grown
//               </button>
//             </div>

//             <div className="carousel">
//               {getDiamondColors().map((color) => (
//                 <div
//                   key={color}
//                   className={`carousel-item ${diamondColor === color ? "active" : ""}`}
//                   onClick={() => setDiamondColor(color)}
//                 >
//                   <div className="diamond-color" style={{ background: color }} />
//                   <p>{color}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="summary-container">
//             <h2>Summary</h2>
//             <p><strong>Metal:</strong> {selectedMetal}</p>
//             <p><strong>Thickness:</strong> {selectedThickness} mm</p>
//             <p><strong>Diamond:</strong> {diamondType} – {diamondColor}</p>

//             <button className="summary-btn">Checkout</button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="ring-page">
//       <RingViewer
//         metal={selectedMetal}
//         thickness={selectedThickness}
//         diamond={diamondColor}
//       />

//       <div className="bottom-panel">
//         {renderStepContent()}

//         <div className="step-buttons">
//           {step > 1 && (
//             <button onClick={() => setStep(step - 1)}>Back</button>
//           )}

//           {step < 4 && (
//             <button onClick={() => setStep(step + 1)}>Next</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";
// import ringGLB from "../assets/ring/ring.glb";

// // Base metals
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", roughness: 0.3, metalness: 1, price: 100 },
//   { name: "Gold", color: "#FFD700", roughness: 0.25, metalness: 1, price: 200 },
//   { name: "Rose Gold", color: "#B76E79", roughness: 0.25, metalness: 1, price: 220 },
// ];

// const DIAMOND_MESHES = [
//   { name: "Middle Diamond", meshName: "ThinRing_ThinRing_0", defaultColor: "#FFFFFF", price: 300 },
//   { name: "Side Diamond 1", meshName: "ThinRing1_ThinRing1_0", defaultColor: "#FFFFFF", price: 250 },
//   { name: "Side Diamond 2", meshName: "ThinRing2_ThinRing2_0", defaultColor: "#FFFFFF", price: 250 },
// ];

// const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

// function RingModel({ baseColor, diamondColors }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;

//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);

//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);

//     sceneRef.current.traverse(mesh => {
//       if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: baseMat?.roughness || 0.3,
//           metalness: baseMat?.metalness || 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor, sceneRef.current]);

//   useEffect(() => {
//     if (!sceneRef.current) return;

//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = sceneRef.current.getObjectByName(d.meshName);
//       if (mesh) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamondColors[i]?.color || d.defaultColor,
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 0.9,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors, sceneRef.current]);

//   if (!sceneRef.current) return null;

//   return <primitive object={sceneRef.current} scale={[scale, scale, scale]} position={position} />;
// }

// export default function RingsPage() {
//   const [step, setStep] = useState(1);

//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [baseThickness, setBaseThickness] = useState(1); // multiplier for ring thickness

//   const [diamondType, setDiamondType] = useState("lab"); // "lab" or "real"
//   const [diamondCount, setDiamondCount] = useState(1); // 0-3
//   const [diamondColors, setDiamondColors] = useState(
//     DIAMOND_MESHES.map(d => ({ color: d.defaultColor }))
//   );

//   const [engraving, setEngraving] = useState("");
//   const [price, setPrice] = useState(0);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev => prev.map((d, i) => (i === index ? { ...d, color } : d)));
//   };

//   const calculatePrice = () => {
//     let total = 0;
//     const base = BASE_OPTIONS.find(b => b.color === baseColor);
//     total += base?.price || 100;

//     DIAMOND_MESHES.forEach((d, i) => {
//       if (i < diamondCount) total += d.price;
//     });

//     if (engraving) total += 50;
//     setPrice(total);
//   };

//   const nextStep = () => {
//     if (step < 4) setStep(step + 1);
//     if (step === 3) calculatePrice();
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="ring-page">
//       <h1 className="title">Customize Your 3D Ring</h1>

//       <div className="customizer-container">
//         {/* 3D Preview */}
//         <div className="preview-section" style={{ height: 450 }}>
//           <Canvas shadows gl={{ physicallyCorrectLights: true }} camera={{ position: [0, 2, 5], fov: 50 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />
//             <directionalLight position={[-5, 5, -5]} intensity={0.5} />
//             <Suspense fallback={null}>
//               <RingModel baseColor={baseColor} diamondColors={diamondColors.slice(0, diamondCount)} />
//               <Environment preset="sunset" background={false} />
//               <color attach="background" args={["#f0f0f0"]} />
//             </Suspense>
//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Step Forms */}
//         <div className="options-section">
//           {step === 1 && (
//             <>
//               <h3>Select Base</h3>
//               <div className="options-grid">
//                 {BASE_OPTIONS.map(option => (
//                   <div
//                     key={option.name}
//                     className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                     onClick={() => setBaseColor(option.color)}
//                   >
//                     <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                     <p>{option.name}</p>
//                   </div>
//                 ))}
//               </div>
//               <h4>Thickness</h4>
//               <input
//                 type="range"
//                 min={0.5}
//                 max={2}
//                 step={0.1}
//                 value={baseThickness}
//                 onChange={e => setBaseThickness(parseFloat(e.target.value))}
//               />
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <h3>Select Diamonds</h3>
//               <div>
//                 <label>
//                   Type:
//                   <select value={diamondType} onChange={e => setDiamondType(e.target.value)}>
//                     <option value="lab">Lab Grown</option>
//                     <option value="real">Real</option>
//                   </select>
//                 </label>
//               </div>
//               <div>
//                 <label>
//                   Number of Diamonds:
//                   <input
//                     type="number"
//                     min={0}
//                     max={3}
//                     value={diamondCount}
//                     onChange={e => setDiamondCount(parseInt(e.target.value))}
//                   />
//                 </label>
//               </div>

//               {Array.from({ length: diamondCount }).map((_, i) => (
//                 <div key={i}>
//                   <p>Diamond {i + 1} Color</p>
//                   <input
//                     type="color"
//                     value={diamondColors[i]?.color}
//                     onChange={e => handleDiamondColorChange(i, e.target.value)}
//                   />
//                   {diamondType === "real" && (
//                     <select
//                       onChange={e => handleDiamondColorChange(i, e.target.value)}
//                       value={diamondColors[i]?.color}
//                     >
//                       <option value="#FFFFFF">Diamond</option>
//                       <option value="#FF0000">Ruby</option>
//                       <option value="#00FF00">Emerald</option>
//                       <option value="#0000FF">Sapphire</option>
//                     </select>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <h3>Engraving</h3>
//               <input
//                 type="text"
//                 placeholder="Enter engraving text"
//                 value={engraving}
//                 onChange={e => setEngraving(e.target.value)}
//               />
//               <h4>Price: ${price}</h4>
//             </>
//           )}

//           <div className="step-buttons">
//             {step > 1 && <button onClick={prevStep}>Previous</button>}
//             <button onClick={nextStep}>{step === 3 ? "Checkout" : "Next"}</button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";
// import ringGLB from "../assets/ring/ring.glb";

// const BASE_OPTIONS = [
//   { name: "Silver", color: "#2f4f4f", roughness: 0.3, metalness: 1, price: 100 },
//   { name: "Gold", color: "#556b2f", roughness: 0.25, metalness: 1, price: 200 },
//   { name: "Rose Gold", color: "#4b3621", roughness: 0.25, metalness: 1, price: 220 },
// ];

// const DIAMOND_MESHES = [
//   { name: "Middle Diamond", meshName: "ThinRing_ThinRing_0", defaultColor: "#FFFFFF", price: 300 },
//   { name: "Side Diamond 1", meshName: "ThinRing1_ThinRing1_0", defaultColor: "#FFFFFF", price: 250 },
//   { name: "Side Diamond 2", meshName: "ThinRing2_ThinRing2_0", defaultColor: "#FFFFFF", price: 250 },
// ];

// const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

// function RingModel({ baseColor, diamondColors, showDiamonds }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);
//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);
//     sceneRef.current.traverse(mesh => {
//       if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: baseMat?.roughness || 0.3,
//           metalness: baseMat?.metalness || 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor, sceneRef.current]);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = sceneRef.current.getObjectByName(d.meshName);
//       if (mesh) {
//         mesh.visible = showDiamonds && i < diamondColors.length;
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamondColors[i]?.color || d.defaultColor,
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 0.9,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors, showDiamonds, sceneRef.current]);

//   if (!sceneRef.current) return null;
//   return <primitive object={sceneRef.current} scale={[scale, scale, scale]} position={position} />;
// }

// export default function RingsPage() {
//   const [activeTab, setActiveTab] = useState("base");

//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [baseThickness, setBaseThickness] = useState(1);

//   const [diamondType, setDiamondType] = useState("lab");
//   const [diamondCount, setDiamondCount] = useState(0); // start with no diamonds
//   const [diamondColors, setDiamondColors] = useState(
//     DIAMOND_MESHES.map(d => ({ color: d.defaultColor }))
//   );

//   const [engraving, setEngraving] = useState("");
//   const [price, setPrice] = useState(0);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev => prev.map((d, i) => (i === index ? { ...d, color } : d)));
//   };

//   const calculatePrice = () => {
//     let total = 0;
//     const base = BASE_OPTIONS.find(b => b.color === baseColor);
//     total += base?.price || 100;
//     DIAMOND_MESHES.forEach((d, i) => {
//       if (i < diamondCount) total += d.price;
//     });
//     if (engraving) total += 50;
//     setPrice(total);
//   };

//   useEffect(() => {
//     calculatePrice();
//   }, [baseColor, diamondCount, engraving, diamondColors]);

//   return (
//     <div className="ring-page full-page">
//       <div className="ring-customizer">
//         {/* 3D Viewer */}
//         <div className="viewer">
//           <Canvas shadows gl={{ physicallyCorrectLights: true }} camera={{ position: [0, 2, 5], fov: 50 }}>
//             <ambientLight intensity={0.4} />
//             <directionalLight position={[5, 5, 5]} intensity={1} />
//             <directionalLight position={[-5, 5, -5]} intensity={0.5} />
//             <Suspense fallback={null}>
//               <RingModel
//                 baseColor={baseColor}
//                 diamondColors={diamondColors.slice(0, diamondCount)}
//                 showDiamonds={diamondCount > 0}
//               />
//               <Environment preset="sunset" background={false} />
//               <color attach="background" args={["#012d1a"]} /> {/* dark green background */}
//             </Suspense>
//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Tabs */}
//         <div className="tabs">
//           <div className="tab-buttons">
//             <button className={activeTab === "base" ? "active" : ""} onClick={() => setActiveTab("base")}>Base</button>
//             <button className={activeTab === "diamonds" ? "active" : ""} onClick={() => setActiveTab("diamonds")}>Diamonds</button>
//             <button className={activeTab === "engraving" ? "active" : ""} onClick={() => setActiveTab("engraving")}>Engraving</button>
//           </div>

//           <div className="tab-content">
//             {activeTab === "base" && (
//               <>
//                 <h3>Select Base Metal</h3>
//                 <div className="options-grid">
//                   {BASE_OPTIONS.map(option => (
//                     <div
//                       key={option.name}
//                       className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                       onClick={() => setBaseColor(option.color)}
//                     >
//                       <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                       <p>{option.name}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <h4>Thickness</h4>
//                 <input type="range" min={0.5} max={2} step={0.1} value={baseThickness} onChange={e => setBaseThickness(parseFloat(e.target.value))} />
//               </>
//             )}

//             {activeTab === "diamonds" && (
//               <>
//                 <h3>Diamond Options</h3>
//                 <label>
//                   Type:
//                   <select value={diamondType} onChange={e => setDiamondType(e.target.value)}>
//                     <option value="lab">Lab Grown</option>
//                     <option value="real">Real</option>
//                   </select>
//                 </label>

//                 <label>
//                   Number of Diamonds:
//                   <input type="number" min={0} max={3} value={diamondCount} onChange={e => setDiamondCount(parseInt(e.target.value))} />
//                 </label>

//                 {Array.from({ length: diamondCount }).map((_, i) => (
//                   <div key={i} className="diamond-color-option">
//                     <p>Diamond {i + 1} Color</p>
//                     <input type="color" value={diamondColors[i]?.color} onChange={e => handleDiamondColorChange(i, e.target.value)} />
//                     {diamondType === "real" && (
//                       <select onChange={e => handleDiamondColorChange(i, e.target.value)} value={diamondColors[i]?.color}>
//                         <option value="#FFFFFF">Diamond</option>
//                         <option value="#de0d0dff">Ruby</option>
//                         <option value="#11a211ff">Emerald</option>
//                         <option value="#1111c9ff">Sapphire</option>
//                       </select>
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}

//             {activeTab === "engraving" && (
//               <>
//                 <h3>Engraving</h3>
//                 <input type="text" placeholder="Enter engraving text" value={engraving} onChange={e => setEngraving(e.target.value)} />
//                 <h4>Total Price: ${price}</h4>
//                 <button className="checkout-btn">Checkout</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import "../styles/ring.css";
// import Footer from "./Footer";
// import ringGLB from "../assets/ring/ring.glb";

// // Base metals
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", roughness: 0.3, metalness: 1, price: 100 },
//   { name: "Gold", color: "#FFD700", roughness: 0.25, metalness: 1, price: 200 },
//   { name: "Rose Gold", color: "#B76E79", roughness: 0.25, metalness: 1, price: 220 },
//   { name: "14K Gold", color: "#E6BE8A", roughness: 0.25, metalness: 1, price: 240 },
//   { name: "14K Silver", color: "#D3D3D3", roughness: 0.3, metalness: 1, price: 150 },
// ];

// // Gems
// const REAL_GEMS = [
//   { name: "Diamond", color: "#FFFFFF" },
//   { name: "Ruby", color: "#8B0000" },
//   { name: "Emerald", color: "#006400" },
//   { name: "Sapphire", color: "#00008B" },
// ];

// // Diamonds meshes
// const DIAMOND_MESHES = [
//   { name: "Middle Diamond", meshName: "ThinRing_ThinRing_0", defaultColor: "#FFFFFF", price: 300 },
//   { name: "Side Diamond 1", meshName: "ThinRing1_ThinRing1_0", defaultColor: "#FFFFFF", price: 250 },
//   { name: "Side Diamond 2", meshName: "ThinRing2_ThinRing2_0", defaultColor: "#FFFFFF", price: 250 },
// ];

// const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

// function RingModel({ baseColor, diamondColors, showDiamonds }) {
//   const gltf = useGLTF(ringGLB);
//   const sceneRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   useEffect(() => {
//     const scene = gltf.scene.clone();
//     sceneRef.current = scene;
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);
//     const center = bbox.getCenter(new THREE.Vector3());
//     setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
//   }, [gltf]);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);
//     sceneRef.current.traverse(mesh => {
//       if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           roughness: baseMat?.roughness || 0.3,
//           metalness: baseMat?.metalness || 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.1,
//           reflectivity: 0.9,
//         });
//       }
//     });
//   }, [baseColor, sceneRef.current]);

//   useEffect(() => {
//     if (!sceneRef.current) return;
//     DIAMOND_MESHES.forEach((d, i) => {
//       const mesh = sceneRef.current.getObjectByName(d.meshName);
//       if (mesh) {
//         mesh.visible = showDiamonds && i < diamondColors.length;
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: diamondColors[i]?.color || "#FFFFFF",
//           roughness: 0,
//           metalness: 0,
//           transparent: true,
//           opacity: 1,
//           transmission: 1,
//           ior: 2.4,
//           reflectivity: 1,
//           clearcoat: 1,
//           clearcoatRoughness: 0.05,
//         });
//       }
//     });
//   }, [diamondColors, showDiamonds, sceneRef.current]);

//   if (!sceneRef.current) return null;
//   return <primitive object={sceneRef.current} scale={[scale, scale, scale]} position={position} />;
// }

// export default function RingsPage() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const [activeTab, setActiveTab] = useState("base");
//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
//   const [baseThickness, setBaseThickness] = useState(1);

//   const [diamondType, setDiamondType] = useState("lab");
//   const [diamondCount, setDiamondCount] = useState(0); 
//   const [diamondColors, setDiamondColors] = useState(DIAMOND_MESHES.map(d => ({ color: d.defaultColor })));

//   const [engraving, setEngraving] = useState("");
//   const [price, setPrice] = useState(0);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev => prev.map((d, i) => (i === index ? { ...d, color } : d)));
//   };

//   const calculatePrice = () => {
//     let total = 0;
//     const base = BASE_OPTIONS.find(b => b.color === baseColor);
//     total += base?.price || 100;
//     DIAMOND_MESHES.forEach((d, i) => {
//       if (i < diamondCount) total += d.price;
//     });
//     if (engraving) total += 50;
//     setPrice(total);
//   };

//   useEffect(() => {
//     calculatePrice();
//   }, [baseColor, diamondCount, engraving, diamondColors]);

//   const toggleTab = (tab) => {
//     setActiveTab(activeTab === tab ? "" : tab);
//   };

//   return (
//     <div className="ring-page full-page">
//       {/* Horizontal Steps */}
//       <div className="steps-horizontal">
//         <div className={`step-box ${currentStep === 1 ? "active" : ""}`} onClick={() => setCurrentStep(1)}>1</div>
//         <div className={`step-box ${currentStep === 2 ? "active" : ""}`} onClick={() => setCurrentStep(2)}>2</div>
//         <div className={`step-box ${currentStep === 3 ? "active" : ""}`} onClick={() => setCurrentStep(3)}>3</div>
//       </div>
//       <div className="step-labels">
//         <span>Customize Ring</span>
//         <span>Choose Design</span>
//         <span>Checkout</span>
//       </div>

//       <div className="ring-customizer">
//         {/* 3D Viewer */}
//         <div className="viewer">
//           <Canvas shadows gl={{ physicallyCorrectLights: true }} camera={{ position: [0, 2, 5], fov: 50 }}>
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[5, 5, 5]} intensity={1.5} />
//             <directionalLight position={[-5, 5, -5]} intensity={1} />
//             <Suspense fallback={null}>
//               <RingModel
//                 baseColor={baseColor}
//                 diamondColors={diamondColors.slice(0, diamondCount)}
//                 showDiamonds={diamondCount > 0}
//               />
//               <Environment preset="city" background={false} />
//               <color attach="background" args={["#ffffff"]} />
//             </Suspense>
//             <OrbitControls enablePan enableZoom enableRotate />
//           </Canvas>
//         </div>

//         {/* Tabs Sidebar */}
//         <div className="tabs-sidebar">
//           {currentStep === 1 && (
//             <>
//               <div className="tab-section">
//                 <button className={`tab-header ${activeTab === "base" ? "active" : ""}`} onClick={() => toggleTab("base")}>
//                   Base Metal & Thickness
//                 </button>
//                 {activeTab === "base" && (
//                   <div className="tab-body">
//                     <div className="options-grid">
//                       {BASE_OPTIONS.map(option => (
//                         <div
//                           key={option.name}
//                           className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                           onClick={() => setBaseColor(option.color)}
//                         >
//                           <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                           <p>{option.name}</p>
//                         </div>
//                       ))}
//                     </div>
//                     <label>Thickness:</label>
//                     <input
//                       type="range"
//                       min={0.5}
//                       max={2}
//                       step={0.1}
//                       value={baseThickness}
//                       onChange={e => setBaseThickness(parseFloat(e.target.value))}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="tab-section">
//                 <button className={`tab-header ${activeTab === "diamonds" ? "active" : ""}`} onClick={() => toggleTab("diamonds")}>
//                   Diamonds / Gems
//                 </button>
//                 {activeTab === "diamonds" && (
//                   <div className="tab-body">
//                     <label>Type:</label>
//                     <select value={diamondType} onChange={e => setDiamondType(e.target.value)}>
//                       <option value="lab">Lab Grown</option>
//                       <option value="real">Real Gem</option>
//                     </select>

//                     <label>Number of Diamonds:</label>
//                     <input
//                       type="number"
//                       min={0}
//                       max={3}
//                       value={diamondCount}
//                       onChange={e => setDiamondCount(parseInt(e.target.value))}
//                     />

//                     {Array.from({ length: diamondCount }).map((_, i) => (
//                       <div key={i} className="diamond-color-option">
//                         <p>Diamond {i + 1} Color</p>
//                         {diamondType === "lab" ? (
//                           <input
//                             type="color"
//                             value={diamondColors[i]?.color}
//                             onChange={e => handleDiamondColorChange(i, e.target.value)}
//                           />
//                         ) : (
//                           <select value={diamondColors[i]?.color} onChange={e => handleDiamondColorChange(i, e.target.value)}>
//                             {REAL_GEMS.map(gem => (
//                               <option key={gem.name} value={gem.color}>{gem.name}</option>
//                             ))}
//                           </select>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {currentStep === 3 && (
//             <div className="tab-section">
//               <button className="tab-header active">Engraving & Checkout</button>
//               <div className="tab-body">
//                 <input
//                   type="text"
//                   placeholder="Enter engraving text"
//                   value={engraving}
//                   onChange={e => setEngraving(e.target.value)}
//                 />
//                 <h4>Total Price: ${price}</h4>
//                 <button className="checkout-btn">Checkout</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


// import React, { useState, Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import { useLocation, useNavigate } from "react-router-dom";
// import Footer from "./Footer";

// import ringGLB from "../assets/ring/ring.glb";
// import ring1GLB from "../assets/ring/ring1.glb";

// // ================= BASE METALS =================
// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", price: 100 },
//   { name: "Gold", color: "#FFD700", price: 200 },
//   { name: "Rose Gold", color: "#B76E79", price: 220 },
// ];

// // ================= DIAMOND MESHES =================
// // ring.glb
// const SIMPLE_DIAMOND = "ThinRing_ThinRing_0";

// // ring1.glb
// const MIDDLE_DIAMOND = "ThinRing_ThinRing_0";
// const SIDE_DIAMONDS = [
//   "ThinRing1_ThinRing1_0",
//   "ThinRing2_ThinRing2_0",
// ];

// const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

// // ================= MODEL =================
// function RingModel({ ringType, baseColor, simpleColor, middleColor, sideColor }) {
//   const gltf = useGLTF(ringType === "simple" ? ringGLB : ring1GLB);
//   const ref = useRef();

//   useEffect(() => {
//     ref.current = gltf.scene.clone();
//   }, [gltf]);

//   useEffect(() => {
//     if (!ref.current) return;

//     ref.current.traverse((mesh) => {
//       if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
//         mesh.material = new THREE.MeshPhysicalMaterial({
//           color: baseColor,
//           metalness: 1,
//           roughness: 0.3,
//         });
//       }
//     });

//     if (ringType === "simple") {
//       const gem = ref.current.getObjectByName(SIMPLE_DIAMOND);
//       if (gem)
//         gem.material = new THREE.MeshPhysicalMaterial({
//           color: simpleColor,
//           transmission: 1,
//           ior: 2.4,
//         });
//     }

//     if (ringType === "advanced") {
//       const middle = ref.current.getObjectByName(MIDDLE_DIAMOND);
//       SIDE_DIAMONDS.forEach((name) => {
//         const side = ref.current.getObjectByName(name);
//         if (side)
//           side.material = new THREE.MeshPhysicalMaterial({
//             color: sideColor,
//             transmission: 1,
//             ior: 2.4,
//           });
//       });

//       if (middle)
//         middle.material = new THREE.MeshPhysicalMaterial({
//           color: middleColor,
//           transmission: 1,
//           ior: 2.4,
//         });
//     }
//   }, [baseColor, simpleColor, middleColor, sideColor, ringType]);

//   return ref.current ? <primitive object={ref.current} /> : null;
// }

// // ================= PAGE =================
// export default function RingsPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const ringType = state?.ringType || "simple";

//   const [step, setStep] = useState(1);
//   const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);

//   const [simpleColor, setSimpleColor] = useState("#ffffff");
//   const [middleColor, setMiddleColor] = useState("#ffffff");
//   const [sideColor, setSideColor] = useState("#ffffff");

//   return (
//     <div className="ring-page">
//       <div className="steps-horizontal">
//         {[1, 2, 3].map((n) => (
//           <div key={n} className={`step-box ${step === n ? "active" : ""}`} onClick={() => setStep(n)}>
//             {n}
//           </div>
//         ))}
//       </div>

//       <div className="ring-customizer">
//         <div className="viewer">
//           <Canvas camera={{ position: [0, 2, 5] }}>
//             <ambientLight intensity={1} />
//             <Suspense fallback={null}>
//               <RingModel
//                 ringType={ringType}
//                 baseColor={baseColor}
//                 simpleColor={simpleColor}
//                 middleColor={middleColor}
//                 sideColor={sideColor}
//               />
//               <Environment preset="city" />
//             </Suspense>
//             <OrbitControls />
//           </Canvas>
//         </div>

//         <div className="tabs-sidebar">
//           {step === 1 && (
//             <>
//               <h3>Base Color</h3>
//               {BASE_OPTIONS.map((b) => (
//                 <button key={b.name} onClick={() => setBaseColor(b.color)}>
//                   {b.name}
//                 </button>
//               ))}
//             </>
//           )}

//           {step === 2 && (
//             <>
//               {ringType === "simple" && (
//                 <>
//                   <h3>Diamond Color</h3>
//                   <input type="color" value={simpleColor} onChange={(e) => setSimpleColor(e.target.value)} />
//                 </>
//               )}

//               {ringType === "advanced" && (
//                 <>
//                   <h3>Middle Diamond</h3>
//                   <input type="color" value={middleColor} onChange={(e) => setMiddleColor(e.target.value)} />

//                   <h3>Side Diamonds (Together)</h3>
//                   <input type="color" value={sideColor} onChange={(e) => setSideColor(e.target.value)} />
//                 </>
//               )}
//             </>
//           )}

//           {step === 3 && (
//             <button className="checkout-btn" onClick={() => navigate("/checkout")}>
//               Go To Checkout
//             </button>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import * as THREE from "three";
// import { useLocation, useNavigate } from "react-router-dom";
// import StepsBar from "./StepsBar";
// import RingModel from "./RingModel";

// import "../styles/ring.css";
// import Footer from "./Footer";

// import ringGLB from "../assets/ring/ring.glb";
// import ring1GLB from "../assets/ring/ring1.glb";

// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", price: 100 },
//   { name: "Gold", color: "#FFD700", price: 200 },
//   { name: "Rose Gold", color: "#B76E79", price: 220 },
//   { name: "14K Gold", color: "#E6BE8A", price: 240 },
//   { name: "14K Silver", color: "#D3D3D3", price: 150 },
// ];
// const REAL_GEMS = [
//   { name: "Diamond", color: "#ffffff" },
//   { name: "Ruby", color: "#E0115F" },      // Real ruby red
//   { name: "Emerald", color: "#50C878" },  // Emerald green
//   { name: "Sapphire", color: "#0F52BA" }, // Sapphire blue
// ];


// // const RING_MESHES = {
// //   ring: {
// //     base: ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"],
// //     diamonds: ["ThinRing_ThinRing_0"],     // Middle only
// //     sides: ["ThinRing1_ThinRing1_0", "ThinRing2_ThinRing2_0"],
// //   },

// //   ring1: {
// //     base: ["Object_2", "Object_3"],
// //     diamonds: ["Diamond_Round"],           // Middle only
// //     sides: [
// //       "Diamond_Round_2",
// //       "Diamond_Round_3",
// //       "Diamond_Round_4",
// //       "Diamond_Round_5",
// //       "Diamond_Round_6",
// //       "Diamond_Round_7",
// //       "Diamond_Round_8",
// //       "Diamond_Round_9",
// //     ],
// //   },
// // };
// const RING_MESHES = {
//   ring: {
//     base: ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"],
//     diamonds: ["ThinRing_ThinRing_0"], // ✅ middle
//     sides: [
//       "ThinRing1_ThinRing1_0", // ✅ left side
//       "ThinRing2_ThinRing2_0", // ✅ right side
//     ],
//   },

//   ring1: {
//     base: ["Object_2", "Object_3"],
//     diamonds: ["Diamond_Round"], // ✅ middle ONLY
//     sides: [
//       "Diamond_Round_2",
//       "Diamond_Round_3",
//       "Diamond_Round_4",
//       "Diamond_Round_5",
//       "Diamond_Round_6",
//       "Diamond_Round_7",
//       "Diamond_Round_8",
//       "Diamond_Round_9", // ✅ ALL THESE = ONE SIDE GROUP
//     ],
//   },
// };



// // function RingModel({
// //   ringType,
// //   baseColor,
// //   diamondColors,
// //   showDiamonds,
// //   thickness = 1,
// //   selectedDiamond,
// //   diamondCount,
// // }) {
// //   const { scene } = useGLTF(ringType === "ring" ? ringGLB : ring1GLB);
// //   const [scale, setScale] = useState(1);
// //   const [position, setPosition] = useState([0, 0, 0]);

// //   /* ================= PERFECT CENTERING ================= */
// //   useEffect(() => {
// //     if (!scene) return;

// //     const bbox = new THREE.Box3().setFromObject(scene);
// //     const size = bbox.getSize(new THREE.Vector3());
// //     const center = bbox.getCenter(new THREE.Vector3());
// //     const maxDim = Math.max(size.x, size.y, size.z);

// //     const scaleFactor = 2 / maxDim;
// //     setScale(scaleFactor);
// //     setPosition([
// //       -center.x * scaleFactor,
// //       -center.y * scaleFactor,
// //       -center.z * scaleFactor,
// //     ]);
// //   }, [scene]);
 

// //   /* ================= ALL MATERIAL + VISIBILITY ================= */
// //   useEffect(() => {
// //     if (!scene) return;

// //     /* ========== BASE METAL ========== */
// //     RING_MESHES[ringType].base.forEach((name) => {
// //       const mesh = scene.getObjectByName(name);
// //       if (!mesh) return;

// //       if (!mesh.material || !mesh.material.isMeshPhysicalMaterial) {
// //         mesh.material = new THREE.MeshPhysicalMaterial();
// //       }

// //       mesh.material.color.set(baseColor);
// //       mesh.material.roughness = 0.3;
// //       mesh.material.metalness = 1;
// //       mesh.material.clearcoat = 1;

// //       mesh.scale.y = thickness;
// //     });

// //     /* ========== MIDDLE DIAMOND ========== */
// //     const middleMesh =
// //       scene.getObjectByName(RING_MESHES[ringType].diamonds[0]);

// //     if (middleMesh) {
// //       middleMesh.visible = showDiamonds && diamondCount >= 1;

// //       if (
// //         !middleMesh.material ||
// //         !middleMesh.material.isMeshPhysicalMaterial
// //       ) {
// //         middleMesh.material = new THREE.MeshPhysicalMaterial();
// //       }

// //       middleMesh.material.color.set(
// //         diamondColors[0]?.color || "#ffffff"
// //       );
// //       middleMesh.material.roughness = 0;
// //       middleMesh.material.metalness = 0;
// //       middleMesh.material.transmission = 1;
// //       middleMesh.material.ior = 2.4;
// //       middleMesh.material.transparent = true;

// //       middleMesh.material.emissive.set(
// //         selectedDiamond === 0 ? "#ffff00" : "#000000"
// //       );
// //       middleMesh.material.emissiveIntensity =
// //         selectedDiamond === 0 ? 0.5 : 0;
// //     }

// //     /* ========== SIDE DIAMONDS (FINAL FIX) ========== */
// // // const sideMeshes = RING_MESHES[ringType].sides || [];

// // // if (ringType === "ring") {
// // //   // ✅ ring logic: 1 or 2 side diamonds MAX
// // //   sideMeshes.forEach((name, index) => {
// // //     const mesh = scene.getObjectByName(name);
// // //     if (!mesh) return;

// // //     let visible = false;

// // //     if (diamondCount === 2 && index === 0) visible = true; // ✅ ONLY ONE
// // //     if (diamondCount >= 3 && index < 2) visible = true;   // ✅ TWO SIDES

// // //     mesh.visible = showDiamonds && visible;

// // //     if (!mesh.material || !mesh.material.isMeshPhysicalMaterial) {
// // //       mesh.material = new THREE.MeshPhysicalMaterial();
// // //     }

// // //     mesh.material.color.set(diamondColors[1]?.color || "#ffffff");
// // //     mesh.material.roughness = 0;
// // //     mesh.material.metalness = 0;
// // //     mesh.material.transmission = 1;
// // //     mesh.material.ior = 2.4;
// // //     mesh.material.transparent = true;

// // //     mesh.material.emissive.set(
// // //       selectedDiamond === 1 ? "#ffff00" : "#000000"
// // //     );
// // //     mesh.material.emissiveIntensity = selectedDiamond === 1 ? 0.5 : 0;
// // //   });

// // // } else {
// // //   // ✅ ring1 logic: ALL side diamonds together as ONE group
// // //   sideMeshes.forEach((name) => {
// // //     const mesh = scene.getObjectByName(name);
// // //     if (!mesh) return;

// // //     mesh.visible = showDiamonds && diamondCount === 2;

// // //     if (!mesh.material || !mesh.material.isMeshPhysicalMaterial) {
// // //       mesh.material = new THREE.MeshPhysicalMaterial();
// // //     }

// // //     mesh.material.color.set(diamondColors[1]?.color || "#ffffff");
// // //     mesh.material.roughness = 0;
// // //     mesh.material.metalness = 0;
// // //     mesh.material.transmission = 1;
// // //     mesh.material.ior = 2.4;
// // //     mesh.material.transparent = true;

// // //     mesh.material.emissive.set(
// // //       selectedDiamond === 1 ? "#ffff00" : "#000000"
// // //     );
// // //     mesh.material.emissiveIntensity = selectedDiamond === 1 ? 0.5 : 0;
// // //   });
// // /* ================= SIDE DIAMONDS - FINAL FIX ================= */
// // const sideMeshes = RING_MESHES[ringType].sides || [];

// // if (ringType === "ring") {

// //   // ✅ ring = 2 independent side diamonds
// //   sideMeshes.forEach((name, index) => {
// //     const mesh = scene.getObjectByName(name);
// //     if (!mesh) return;

// //     let visible = false;
// //     if (diamondCount === 2 && index === 0) visible = true;     
// //     if (diamondCount >= 3 && index <= 1) visible = true;     

// //     mesh.visible = showDiamonds && visible;

// //     if (!mesh.material || !mesh.material.isMeshPhysicalMaterial) {
// //       mesh.material = new THREE.MeshPhysicalMaterial();
// //     }

// //     mesh.material.color.set(diamondColors[index + 1]?.color || "#ffffff");
// //     mesh.material.roughness = 0;
// //     mesh.material.metalness = 0;
// //     mesh.material.transmission = 1;
// //     mesh.material.ior = 2.4;
// //     mesh.material.transparent = true;

// //     mesh.material.emissive.set(
// //       selectedDiamond === index + 1 ? "#ffff00" : "#000000"
// //     );
// //     mesh.material.emissiveIntensity =
// //       selectedDiamond === index + 1 ? 0.5 : 0;
// //   });

// // } else {

// //   // ✅ ring1 = ALL side diamonds as ONE ENTITY
// //   sideMeshes.forEach((name) => {
// //     const mesh = scene.getObjectByName(name);
// //     if (!mesh) return;

// //     mesh.visible = showDiamonds && diamondCount === 2;

// //     if (!mesh.material || !mesh.material.isMeshPhysicalMaterial) {
// //       mesh.material = new THREE.MeshPhysicalMaterial();
// //     }

// //     mesh.material.color.set(diamondColors[1]?.color || "#ffffff");
// //     mesh.material.roughness = 0;
// //     mesh.material.metalness = 0;
// //     mesh.material.transmission = 1;
// //     mesh.material.ior = 2.4;
// //     mesh.material.transparent = true;

// //     mesh.material.emissive.set(
// //       selectedDiamond === 1 ? "#ffff00" : "#000000"
// //     );
// //     mesh.material.emissiveIntensity = selectedDiamond === 1 ? 0.5 : 0;
// //   });
// // }



// //   }, [
// //     scene,
// //     baseColor,
// //     diamondColors,
// //     showDiamonds,
// //     thickness,
// //     selectedDiamond,
// //     ringType,
// //     diamondCount,
// //   ]);

// //   useFrame(() => {
// //     if (scene) scene.rotation.y += 0.005;
// //   });

// //   if (!scene) return null;

// //   return (
// //     <primitive
// //       object={scene}
// //       scale={[scale, scale, scale]}
// //       position={position}
// //     />
// //   );
  
// // }
// // function RingModel({
// //   ringType,
// //   baseColor,
// //   diamondColors,
// //   showDiamonds,
// //   thickness = 1,
// //   selectedDiamond,
// //   diamondCount,
// // }) {
// //   const { scene } = useGLTF(ringType === "ring" ? ringGLB : ring1GLB);
// //   const [scale, setScale] = useState(1);
// //   const [position, setPosition] = useState([0, 0, 0]);

// //   /* ================= PERFECT CENTERING ================= */
// //   useEffect(() => {
// //     if (!scene) return;

// //     const bbox = new THREE.Box3().setFromObject(scene);
// //     const size = bbox.getSize(new THREE.Vector3());
// //     const center = bbox.getCenter(new THREE.Vector3());
// //     const maxDim = Math.max(size.x, size.y, size.z);

// //     const scaleFactor = 2 / maxDim;
// //     setScale(scaleFactor);
// //     setPosition([
// //       -center.x * scaleFactor,
// //       -center.y * scaleFactor,
// //       -center.z * scaleFactor,
// //     ]);
// //   }, [scene]);

// //   /* ================= ALL MATERIAL + VISIBILITY ================= */
// //   useEffect(() => {
// //     if (!scene) return;

// //     /* ========== BASE METAL (CLONED ✅) ========== */
// //     RING_MESHES[ringType].base.forEach((name) => {
// //       const mesh = scene.getObjectByName(name);
// //       if (!mesh) return;

// //       mesh.material = mesh.material.clone(); // ✅ FIX MATERIAL SHARING

// //       mesh.material.color.set(baseColor);
// //       mesh.material.roughness = 0.3;
// //       mesh.material.metalness = 1;
// //       mesh.material.clearcoat = 1;

// //       mesh.scale.y = thickness;
// //     });

// //     /* ========== MIDDLE DIAMOND (CLONED ✅) ========== */
// //     const middleMesh =
// //       scene.getObjectByName(RING_MESHES[ringType].diamonds[0]);

// //     if (middleMesh) {
// //       middleMesh.visible = showDiamonds && diamondCount >= 1;

// //       middleMesh.material = middleMesh.material.clone(); // ✅ FIX

// //       middleMesh.material.color.set(
// //         diamondColors[0]?.color || "#ffffff"
// //       );
// //       middleMesh.material.roughness = 0;
// //       middleMesh.material.metalness = 0;
// //       middleMesh.material.transmission = 1;
// //       middleMesh.material.ior = 2.4;
// //       middleMesh.material.transparent = true;

// //       middleMesh.material.emissive.set(
// //         selectedDiamond === 0 ? "#ffff00" : "#000000"
// //       );
// //       middleMesh.material.emissiveIntensity =
// //         selectedDiamond === 0 ? 0.5 : 0;
// //     }

// //     /* ================= SIDE DIAMONDS (FINAL CORRECT LOGIC ✅) ================= */
// //     const sideMeshes = RING_MESHES[ringType].sides || [];

// //     if (ringType === "ring") {
// //       // ✅ ring = 2 INDEPENDENT side diamonds
// //       sideMeshes.forEach((name, index) => {
// //         const mesh = scene.getObjectByName(name);
// //         if (!mesh) return;

// //         let visible = false;

// //         if (diamondCount === 2 && index === 0) visible = true; // first side
// //         if (diamondCount >= 3 && index <= 1) visible = true;  // both sides

// //         mesh.visible = showDiamonds && visible;

// //         mesh.material = mesh.material.clone(); // ✅ FIX MATERIAL SHARING

// //         mesh.material.color.set(
// //           diamondColors[index + 1]?.color || "#ffffff"
// //         );
// //         mesh.material.roughness = 0;
// //         mesh.material.metalness = 0;
// //         mesh.material.transmission = 1;
// //         mesh.material.ior = 2.4;
// //         mesh.material.transparent = true;

// //         mesh.material.emissive.set(
// //           selectedDiamond === index + 1 ? "#ffff00" : "#000000"
// //         );
// //         mesh.material.emissiveIntensity =
// //           selectedDiamond === index + 1 ? 0.5 : 0;
// //       });
// //     } else {
// //       // ✅ ring1 = ALL SIDE DIAMONDS AS ONE SINGLE GROUP
// //       sideMeshes.forEach((name) => {
// //         const mesh = scene.getObjectByName(name);
// //         if (!mesh) return;

// //         mesh.visible = showDiamonds && diamondCount === 2;

// //         mesh.material = mesh.material.clone(); // ✅ FIX MATERIAL SHARING

// //         mesh.material.color.set(diamondColors[1]?.color || "#ffffff");
// //         mesh.material.roughness = 0;
// //         mesh.material.metalness = 0;
// //         mesh.material.transmission = 1;
// //         mesh.material.ior = 2.4;
// //         mesh.material.transparent = true;

// //         mesh.material.emissive.set(
// //           selectedDiamond === 1 ? "#ffff00" : "#000000"
// //         );
// //         mesh.material.emissiveIntensity = selectedDiamond === 1 ? 0.5 : 0;
// //       });
// //     }
// //   }, [
// //     scene,
// //     baseColor,
// //     diamondColors,
// //     showDiamonds,
// //     thickness,
// //     selectedDiamond,
// //     ringType,
// //     diamondCount,
// //   ]);

// //   useFrame(() => {
// //     if (scene) scene.rotation.y += 0.005;
// //   });

// //   if (!scene) return null;

// //   return (
// //     <primitive
// //       object={scene}
// //       scale={[scale, scale, scale]}
// //       position={position}
// //     />
// //   );
// // }
// function RingModel({
//   ringType,
//   baseColor,
//   diamondColors,
//   showDiamonds,
//   thickness = 1,
//   selectedDiamond,
//   diamondCount,
// }) {
//   const { scene } = useGLTF(ringType === "ring" ? ringGLB : ring1GLB);

//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState([0, 0, 0]);

//   /* ================= PERFECT CENTERING ================= */
//   useEffect(() => {
//     if (!scene) return;

//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = bbox.getSize(new THREE.Vector3());
//     const center = bbox.getCenter(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);

//     const scaleFactor = 2 / maxDim;
//     setScale(scaleFactor);
//     setPosition([
//       -center.x * scaleFactor,
//       -center.y * scaleFactor,
//       -center.z * scaleFactor,
//     ]);
//   }, [scene]);

//   /* ================= ALL MATERIAL + VISIBILITY ================= */
//   useEffect(() => {
//     if (!scene) return;

//     /* ========== BASE METAL ========== */
//     RING_MESHES[ringType].base.forEach((name) => {
//       const mesh = scene.getObjectByName(name);
//       if (!mesh) return;

//       mesh.material = new THREE.MeshPhysicalMaterial();
//       mesh.material.color.set(baseColor);
//       mesh.material.roughness = 0.3;
//       mesh.material.metalness = 1;
//       mesh.material.clearcoat = 1;

//       mesh.scale.y = thickness;
//     });

//     /* ========== MIDDLE DIAMOND ========== */
//     const middleMesh =
//       scene.getObjectByName(RING_MESHES[ringType].diamonds[0]);

//     if (middleMesh) {
//       middleMesh.visible = showDiamonds && diamondCount >= 1;

//       middleMesh.material = new THREE.MeshPhysicalMaterial();
//       middleMesh.material.color.set(
//         diamondColors[0]?.color || "#ffffff"
//       );
//       middleMesh.material.roughness = 0;
//       middleMesh.material.metalness = 0;
//       middleMesh.material.transmission = 1;
//       middleMesh.material.ior = 2.4;
//       middleMesh.material.transparent = true;

//       middleMesh.material.emissive.set(
//         selectedDiamond === 0 ? "#ffff00" : "#000000"
//       );
//       middleMesh.material.emissiveIntensity =
//         selectedDiamond === 0 ? 0.5 : 0;
//     }

//     /* ================= SIDE DIAMONDS ================= */
//     const sideMeshes = RING_MESHES[ringType].sides || [];

//     /* ----------- NORMAL RING (3 SEPARATE DIAMONDS) ----------- */
//     if (ringType === "ring") {
//       sideMeshes.forEach((name, index) => {
//         const mesh = scene.getObjectByName(name);
//         if (!mesh) return;

//         let visible = false;
//         if (diamondCount === 2 && index === 0) visible = true;
//         if (diamondCount >= 3 && index <= 1) visible = true;

//         mesh.visible = showDiamonds && visible;

//         mesh.material = new THREE.MeshPhysicalMaterial();
//         mesh.material.color.set(
//           diamondColors[index + 1]?.color || "#ffffff"
//         );
//         mesh.material.roughness = 0;
//         mesh.material.metalness = 0;
//         mesh.material.transmission = 1;
//         mesh.material.ior = 2.4;
//         mesh.material.transparent = true;

//         mesh.material.emissive.set(
//           selectedDiamond === index + 1 ? "#ffff00" : "#000000"
//         );
//         mesh.material.emissiveIntensity =
//           selectedDiamond === index + 1 ? 0.5 : 0;
//       });
//     }

//     /* ----------- RING1 (ALL SIDES AS ONE GROUP) ----------- */
//     if (ringType === "ring1") {
//       sideMeshes.forEach((name) => {
//         const mesh = scene.getObjectByName(name);
//         if (!mesh) return;

//         mesh.visible = showDiamonds && diamondCount === 2;

//         mesh.material = new THREE.MeshPhysicalMaterial();
//         mesh.material.color.set(diamondColors[1]?.color || "#ffffff");
//         mesh.material.roughness = 0;
//         mesh.material.metalness = 0;
//         mesh.material.transmission = 1;
//         mesh.material.ior = 2.4;
//         mesh.material.transparent = true;

//         mesh.material.emissive.set(
//           selectedDiamond === 1 ? "#ffff00" : "#000000"
//         );
//         mesh.material.emissiveIntensity =
//           selectedDiamond === 1 ? 0.5 : 0;
//       });
//     }
//   }, [
//     scene,
//     baseColor,
//     diamondColors,
//     showDiamonds,
//     thickness,
//     selectedDiamond,
//     ringType,
//     diamondCount,
//   ]);

//   useFrame(() => {
//     if (scene) scene.rotation.y += 0.005;
//   });

//   if (!scene) return null;

//   return (
//     <primitive
//       object={scene}
//       scale={[scale, scale, scale]}
//       position={position}
//     />
//   );
// }






// // Rings Page
// export default function RingsPage() {
//   const { state } = useLocation();
//   const { ringType } = state || { ringType: "ring" };

//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);

//   const baseOptions = ringType === "ring1" ? BASE_OPTIONS.slice(0, 2) : BASE_OPTIONS;

//   const [baseColor, setBaseColor] = useState(baseOptions[0].color);
//   const [diamondCount, setDiamondCount] = useState(0);
//   // const [diamondColors, setDiamondColors] = useState(
//   //   ringType === "ring1" ? Array(2).fill({ color: "#FFFFFF" }) : Array(3).fill({ color: "#FFFFFF" })
//   // );
//   const [diamondColors, setDiamondColors] = useState(
//   ringType === "ring1"
//     ? [{ color: "#FFFFFF" }, { color: "#FFFFFF" }]   // ✅ Middle + ONE Side Group
//     : [
//         { color: "#FFFFFF" }, // Middle
//         { color: "#FFFFFF" }, // Side 1
//         { color: "#FFFFFF" }, // Side 2
//       ]
// );

// //   useEffect(() => {
// //   setDiamondColors((prev) => {
// //     const newArr = [...prev];

// //     if (diamondCount > newArr.length) {
// //       return [
// //         ...newArr,
// //         ...Array(diamondCount - newArr.length).fill({ color: "#FFFFFF" }),
// //       ];
// //     }

// //     return newArr.slice(0, diamondCount);
// //   });
// // }, [diamondCount]);
// useEffect(() => {
//   setDiamondColors((prev) => {
//     if (ringType === "ring1") {
//       return prev.slice(0, 2); // ✅ middle + one side group
//     }
//     return prev.slice(0, 3); // ✅ middle + 2 independent sides
//   });
// }, [ringType]);


//   const [diamondType, setDiamondType] = useState("lab");
//   const [selectedDiamond, setSelectedDiamond] = useState(null);
//   const [thickness, setThickness] = useState(1);
//   const [engraving, setEngraving] = useState("");
//   const [price, setPrice] = useState(0);

//   const toggleDiamond = (index) => setSelectedDiamond(index);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors((prev) => {
//       const newColors = [...prev];
//       newColors[index] = { color };
//       return newColors;
//     });
//   };

//   const calculatePrice = () => {
//     let total = baseOptions.find((b) => b.color === baseColor)?.price || 100;
//     if (diamondCount > 0) total += 300;
//     if (diamondCount > 1) total += 250;
//     if (diamondCount > 2) total += 250;
//     if (engraving) total += 50;
//     setPrice(total);
//   };

//   useEffect(() => calculatePrice(), [baseColor, diamondCount, diamondColors, engraving]);

//   return (
//     <div className="ring-page full-page">
//       <h2>{ringType === "ring1" ? "Customize Ring 1" : "Customize Ring"}</h2>
//       {/* Horizontal Steps */}
// <div className="steps-horizontal">
//   {["Customize Your Ring", "Choose Your Designer", "Checkout"].map((label, index) => (
//     <div
//       key={index}
//       className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//       onClick={() => setCurrentStep(index + 1)}
//     >
//       <div className="step-number">{index + 1}</div>
//       <div className="step-labels">{label}</div>
//     </div>
//   ))}
// </div>

//       <div className="ring-customizer">
//         {/* Viewer */}
//         <div className="viewer">
//           <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[5, 5, 5]} intensity={1.5} />
//             <directionalLight position={[-5, 5, -5]} intensity={1} />
//             <Suspense fallback={null}>
//               <RingModel
//                 ringType={ringType}
//                 baseColor={baseColor}
//                 diamondColors={diamondColors}
//                 showDiamonds={diamondCount > 0}
//                 thickness={thickness}
//                 selectedDiamond={selectedDiamond}
//                 diamondCount={diamondCount}   
//               />
//               <Environment preset="city" background={false} />
//             </Suspense>
//             <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//           </Canvas>
//         </div>

//         {/* Controls */}
//         <div className="tabs-sidebar">
//           {/* Base Metal */}
//           <div className="tab-section">
//             <label>Base Metal & Thickness</label>
//             <div className="options-grid">
//               {baseOptions.map((option) => (
//                 <div
//                   key={option.name}
//                   className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                   onClick={() => setBaseColor(option.color)}
//                 >
//                   <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                   <p>{option.name}</p>
//                 </div>
//               ))}
//             </div>
//             <label>Band Thickness:</label>
//             <input type="range" min={0.5} max={2} step={0.05} value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} />
//           </div>

//           {/* Diamonds */}
//           <div className="tab-section">
//             <label>Diamonds / Gems</label>
//             <select value={diamondType} onChange={(e) => setDiamondType(e.target.value)}>
//               <option value="lab">Lab Grown</option>
//               <option value="real">Real Gem</option>
//             </select>

//             <label>Number of Diamonds:</label>
//             <input type="number" min={0} max={ringType === "ring1" ? 2 : 3} value={diamondCount} onChange={(e) => setDiamondCount(parseInt(e.target.value))} />

//             {Array.from({ length: diamondCount }).map((_, i) => (
//               <div key={i} className="diamond-color-option">
//                 <p onClick={() => toggleDiamond(i)} style={{ cursor: "pointer" }}>
//                   {i === 0 ? "Middle Diamond" : "Side Diamond"} {selectedDiamond === i ? "(Selected)" : ""}
//                 </p>
//                 {selectedDiamond === i &&
//                   (diamondType === "lab" ? (
//                     <input type="color" value={diamondColors[i]?.color} onChange={(e) => handleDiamondColorChange(i, e.target.value)} />
//                   ) : (
//                     <select value={diamondColors[i]?.color} onChange={(e) => handleDiamondColorChange(i, e.target.value)}>
//                       {REAL_GEMS.map((gem) => (
//                         <option key={gem.name} value={gem.color}>
//                           {gem.name}
//                         </option>
//                       ))}
//                     </select>
//                   ))}
//               </div>
//             ))}
//           </div>

//           {/* Engraving */}
//           <div className="tab-section">
//             <label>Engraving</label>
//             <input type="text" placeholder="Enter engraving text" value={engraving} onChange={(e) => setEngraving(e.target.value)} />
//             <h4>Total Price: ${price}</h4>
//           </div>

//           <button
//   className="next-btn"
//   onClick={() =>
//     navigate("/designer", { state: { ringType, baseColor, diamondColors, engraving, thickness, diamondCount, selectedDiamond } })
//   }
// >
//   Next
// </button>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



// import React, { useState, useEffect, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import { useLocation, useNavigate } from "react-router-dom";

// import RingModel from "./RingModel"; 
// import Footer from "./Footer";
// import "../styles/ring.css";

// const BASE_OPTIONS = [
//   { name: "Silver", color: "#C0C0C0", price: 100 },
//   { name: "Gold", color: "#FFD700", price: 200 },
//   { name: "Rose Gold", color: "#B76E79", price: 220 },
//   { name: "14K Gold", color: "#E6BE8A", price: 240 },
//   { name: "14K Silver", color: "#D3D3D3", price: 150 },
// ];

// const REAL_GEMS = [
//   { name: "Diamond", color: "#ffffff" },
//   { name: "Ruby", color: "#E0115F" },
//   { name: "Emerald", color: "#50C878" },
//   { name: "Sapphire", color: "#0F52BA" },
// ];

// // Map thickness values to labels for the user
// const getThicknessLabel = (t) => {
//   if (t <= 0.75) return "Slim";
//   if (t <= 1.25) return "Medium";
//   return "Thick";
// };

// export default function RingsPage() {
//   const { state } = useLocation();
//   const { ringType } = state || { ringType: "ring" };
//   const navigate = useNavigate();

//   const baseOptions = ringType === "ring1" ? BASE_OPTIONS.slice(0, 2) : BASE_OPTIONS;
//   const [baseColor, setBaseColor] = useState(baseOptions[0].color);
//   const [diamondCount, setDiamondCount] = useState(0);
//   const [diamondColors, setDiamondColors] = useState(
//     ringType === "ring1"
//       ? [{ color: "#FFFFFF" }, { color: "#FFFFFF" }]
//       : [{ color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }]
//   );
//   const [diamondType, setDiamondType] = useState("lab");
//   const [selectedDiamond, setSelectedDiamond] = useState(null);
//   const [thickness, setThickness] = useState(1); // band thickness
//   const [engraving, setEngraving] = useState("");
//   const [price, setPrice] = useState(0);
//   const [currentStep, setCurrentStep] = useState(1);

//   const toggleDiamond = (index) =>
//   setSelectedDiamond(prev => prev === index ? null : index);

//   const handleDiamondColorChange = (index, color) => {
//     setDiamondColors(prev => { const newArr = [...prev]; newArr[index] = { color }; return newArr; });
//   };

//   const calculatePrice = () => {
//     let total = baseOptions.find(b => b.color === baseColor)?.price || 100;
//     if (diamondCount > 0) total += 300;
//     if (diamondCount > 1) total += 250;
//     if (diamondCount > 2) total += 250;
//     if (engraving) total += 50;
//     setPrice(total);
//   };

//   useEffect(() => calculatePrice(), [baseColor, diamondCount, diamondColors, engraving]);

//   return (
//     <div className="ring-page full-page">
//       <h2>{ringType === "ring1" ? "Customize Ring 1" : "Customize Your Ring"}</h2>

//       {/* Horizontal Steps */}
//       <div className="steps-horizontal">
//         {["Customize Your Ring", "Choose Your Designer", "Checkout"].map((label, index) => (
//           <div
//             key={index}
//             className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
//             onClick={() => setCurrentStep(index + 1)}
//           >
//             <div className="step-number">{index + 1}</div>
//             <div className="step-labels">{label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="ring-customizer">
//         {/* Viewer */}
//         <div className="viewer">
//           <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[5, 5, 5]} intensity={1.5} />
//             <directionalLight position={[-5, 5, -5]} intensity={1} />
//             <Suspense fallback={null}>
//               <RingModel
//                 ringType={ringType}
//                 baseColor={baseColor}
//                 diamondColors={diamondColors}
//                 showDiamonds={diamondCount > 0}
//                 bandThickness={thickness} 
//                 selectedDiamond={selectedDiamond}
//                 diamondCount={diamondCount}   
//               />
//               <Environment preset="city" background={false} />
//             </Suspense>
//             <OrbitControls enablePan={false} enableZoom={false} enableRotate />
//           </Canvas>
//         </div>

//         {/* Controls */}
//         <div className="tabs-sidebar">
//           {/* Base Metal & Thickness */}
//           <div className="tab-section">
//             <label>Base Metal</label>
//             <div className="options-grid">
//               {baseOptions.map((option) => (
//                 <div
//                   key={option.name}
//                   className={`option-card ${baseColor === option.color ? "selected" : ""}`}
//                   onClick={() => setBaseColor(option.color)}
//                 >
//                   <div className="color-swatch" style={{ backgroundColor: option.color }} />
//                   <p>{option.name}</p>
//                 </div>
//               ))}
//             </div>

//             <label>Band Thickness ({getThicknessLabel(thickness)})</label>
//             <input
//               type="range"
//               min={0.5}
//               max={2}
//               step={0.05}
//               value={thickness}
//               onChange={(e) => setThickness(parseFloat(e.target.value))}
//             />
//             <p style={{ fontSize: "0.9rem", color: "#555" }}>
//               Slim → Medium → Thick (affects only the band width)
//             </p>
//           </div>

//           {/* Diamonds / Gems */}
//           <div className="tab-section">
//             <label>Diamonds / Gems</label>
//             <select value={diamondType} onChange={(e) => setDiamondType(e.target.value)}>
//               <option value="lab">Lab Grown</option>
//               <option value="real">Real Gem</option>
//             </select>

//             <label>Number of Diamonds:</label>
//             <input
//               type="number"
//               min={0}
//               max={ringType === "ring1" ? 2 : 3}
//               value={diamondCount}
//               onChange={(e) => setDiamondCount(parseInt(e.target.value))}
//             />

//             {Array.from({ length: diamondCount }).map((_, i) => (
//               <div key={i} className="diamond-color-option">
//                 <p onClick={() => toggleDiamond(i)} style={{ cursor: "pointer" }}>
//                   {i === 0 ? "Middle Diamond" : "Side Diamond"} {selectedDiamond === i ? "(Selected)" : ""}
//                 </p>

//                 {selectedDiamond === i && (
//                   <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                     {/* Swatch */}
//                     <div
//                       className="color-swatch"
//                       style={{ backgroundColor: diamondColors[i]?.color, width: 24, height: 24 }}
//                     />
//                     {/* Input for lab-grown or select for real */}
//                     {diamondType === "lab" ? (
//                       <input
//                         type="color"
//                         value={diamondColors[i]?.color}
//                         onChange={(e) => handleDiamondColorChange(i, e.target.value)}
//                       />
//                     ) : (
//                       <select
//                         value={diamondColors[i]?.color}
//                         onChange={(e) => handleDiamondColorChange(i, e.target.value)}
//                         style={{ padding: "4px 8px", borderRadius: "6px" }}
//                       >
//                         {REAL_GEMS.map((gem) => (
//                           <option key={gem.name} value={gem.color}>
//                             {gem.name}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Engraving */}
//           <div className="tab-section">
//             <label>Engraving</label>
//             <input
//               type="text"
//               placeholder="Enter engraving text"
//               value={engraving}
//               onChange={(e) => setEngraving(e.target.value)}
//             />
//             <h4>Total Price: ${price}</h4>
//           </div>

//           <button
//             className="next-btn"
//             onClick={() =>
//               navigate("/designer", { state: { ringType, baseColor, diamondColors, engraving, thickness, diamondCount, selectedDiamond } })
//             }
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


// WITH RING 2
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";

import RingModel from "./RingModel";
import Footer from "./Footer";
import "../styles/ring.css";

const BASE_OPTIONS = [
  { name: "Silver", color: "#C0C0C0", price: 100 },
  { name: "Gold", color: "#FFD700", price: 200 },
  { name: "Rose Gold", color: "#B76E79", price: 220 },
  { name: "14K Gold", color: "#E6BE8A", price: 240 },
  { name: "14K Silver", color: "#D3D3D3", price: 150 },
];

const REAL_GEMS = [
  { name: "Diamond", color: "#ffffff" },
  { name: "Ruby", color: "#E0115F" },
  { name: "Emerald", color: "#50C878" },
  { name: "Sapphire", color: "#0F52BA" },
];

// Map thickness values to labels for the user
const getThicknessLabel = (t) => {
  if (t <= 0.75) return "Slim";
  if (t <= 1.25) return "Medium";
  return "Thick";
};

export default function RingsPage() {
  const { state } = useLocation();
  const { ringType } = state || { ringType: "ring" };
  const navigate = useNavigate();

  const baseOptions = ringType === "ring1" ? BASE_OPTIONS.slice(0, 2) : BASE_OPTIONS;
  const [baseColor, setBaseColor] = useState(baseOptions[0].color);
  const [diamondCount, setDiamondCount] = useState(ringType === "ring2" ? 2 : 0);
  const [diamondColors, setDiamondColors] = useState(
    ringType === "ring1"
      ? [{ color: "#FFFFFF" }, { color: "#FFFFFF" }]
      : ringType === "ring2"
      ? [{ color: "#FFFFFF" }] // only one color for all side diamonds
      : [{ color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }]
  );
  const [diamondType, setDiamondType] = useState("lab");
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [thickness, setThickness] = useState(1); // band thickness
  const [engraving, setEngraving] = useState("");
  const [price, setPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const toggleDiamond = (index) =>
    setSelectedDiamond(prev => prev === index ? null : index);

  const handleDiamondColorChange = (index, color) => {
    setDiamondColors(prev => {
      const newArr = [...prev];
      newArr[index] = { color };
      return newArr;
    });
  };

  const calculatePrice = () => {
    let total = baseOptions.find(b => b.color === baseColor)?.price || 100;
    if (diamondCount > 0) total += 300;
    if (diamondCount > 1) total += 250;
    if (diamondCount > 2) total += 250;
    if (engraving) total += 50;
    setPrice(total);
  };

  useEffect(() => calculatePrice(), [baseColor, diamondCount, diamondColors, engraving]);

  return (
    <div className="ring-page full-page">
      <h2>{ringType === "ring1" ? "Customize Ring 1" : "Customize Your Ring"}</h2>

      {/* Horizontal Steps */}
      <div className="steps-horizontal">
        {["Customize Your Ring", "Choose Your Designer", "Checkout"].map((label, index) => (
          <div
            key={index}
            className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-labels">{label}</div>
          </div>
        ))}
      </div>

      <div className="ring-customizer">
        {/* Viewer */}
        <div className="viewer">
          <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 5, -5]} intensity={1} />
            <Suspense fallback={null}>
              <RingModel
                ringType={ringType}
                baseColor={baseColor}
                diamondColors={diamondColors}
                showDiamonds={diamondCount > 0}
                thickness={thickness}
                selectedDiamond={selectedDiamond}
                diamondCount={diamondCount}
              />
              <Environment preset="city" background={false} />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={false} enableRotate />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="tabs-sidebar">
          {/* Base Metal & Thickness */}
          <div className="tab-section">
            <label>Base Metal</label>
            <div className="options-grid">
              {baseOptions.map((option) => (
                <div
                  key={option.name}
                  className={`option-card ${baseColor === option.color ? "selected" : ""}`}
                  onClick={() => setBaseColor(option.color)}
                >
                  <div className="color-swatch" style={{ backgroundColor: option.color }} />
                  <p>{option.name}</p>
                </div>
              ))}
            </div>

            <label>Band Thickness ({getThicknessLabel(thickness)})</label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.05}
              value={thickness}
              onChange={(e) => setThickness(parseFloat(e.target.value))}
            />
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              Slim → Medium → Thick (affects only the band width)
            </p>
          </div>

          {/* Diamonds / Gems */}
          <div className="tab-section">
            <label>Diamonds / Gems</label>
            <select value={diamondType} onChange={(e) => setDiamondType(e.target.value)}>
              <option value="lab">Lab Grown</option>
              <option value="real">Real Gem</option>
            </select>

            <label>Number of Diamonds:</label>
            <input
              type="number"
              min={0}
              max={ringType === "ring1" ? 2 : ringType === "ring2" ? 2 : 3}
              value={diamondCount}
              onChange={(e) => setDiamondCount(parseInt(e.target.value))}
            />

            {ringType === "ring2" ? (
              <div className="diamond-color-option">
                <p onClick={() => toggleDiamond(0)} style={{ cursor: "pointer" }}>
                  Side Diamonds {selectedDiamond === 0 ? "(Selected)" : ""}
                </p>
                {selectedDiamond === 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      className="color-swatch"
                      style={{ backgroundColor: diamondColors[0]?.color, width: 24, height: 24 }}
                    />
                    {diamondType === "lab" ? (
                      <input
                        type="color"
                        value={diamondColors[0]?.color}
                        onChange={(e) => handleDiamondColorChange(0, e.target.value)}
                      />
                    ) : (
                      <select
                        value={diamondColors[0]?.color}
                        onChange={(e) => handleDiamondColorChange(0, e.target.value)}
                        style={{ padding: "4px 8px", borderRadius: "6px" }}
                      >
                        {REAL_GEMS.map((gem) => (
                          <option key={gem.name} value={gem.color}>
                            {gem.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Original loop for ring and ring1
              Array.from({ length: diamondCount }).map((_, i) => (
                <div key={i} className="diamond-color-option">
                  <p onClick={() => toggleDiamond(i)} style={{ cursor: "pointer" }}>
                    {i === 0 ? "Middle Diamond" : "Side Diamond"} {selectedDiamond === i ? "(Selected)" : ""}
                  </p>
                  {selectedDiamond === i && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        className="color-swatch"
                        style={{ backgroundColor: diamondColors[i]?.color, width: 24, height: 24 }}
                      />
                      {diamondType === "lab" ? (
                        <input
                          type="color"
                          value={diamondColors[i]?.color}
                          onChange={(e) => handleDiamondColorChange(i, e.target.value)}
                        />
                      ) : (
                        <select
                          value={diamondColors[i]?.color}
                          onChange={(e) => handleDiamondColorChange(i, e.target.value)}
                          style={{ padding: "4px 8px", borderRadius: "6px" }}
                        >
                          {REAL_GEMS.map((gem) => (
                            <option key={gem.name} value={gem.color}>
                              {gem.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Engraving */}
          <div className="tab-section">
            <label>Engraving</label>
            <input
              type="text"
              placeholder="Enter engraving text"
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
            />
            <h4>Total Price: ${price}</h4>
          </div>

          <button
            className="next-btn"
            onClick={() =>
              navigate("/designer", { state: { ringType, baseColor, diamondColors, engraving, thickness, diamondCount, selectedDiamond } })
            }
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
