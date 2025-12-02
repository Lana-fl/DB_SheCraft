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
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import "../styles/ring.css";
import Footer from "./Footer";

import ringGLB from "../assets/ring/ring.glb"; // ensure path is correct

// --- Realistic base metals ---
const BASE_OPTIONS = [
  { name: "Silver", color: "#C0C0C0", roughness: 0.3, metalness: 1 },
  { name: "Gold", color: "#FFD700", roughness: 0.25, metalness: 1 },
  { name: "Rose Gold", color: "#B76E79", roughness: 0.25, metalness: 1 },
];

// --- Diamond mesh names ---
const DIAMOND_MESHES = [
  { name: "Middle Diamond", meshName: "ThinRing_ThinRing_0", defaultColor: "#FFFFFF" },
  { name: "Side Diamond 1", meshName: "ThinRing1_ThinRing1_0", defaultColor: "#FFFFFF" },
  { name: "Side Diamond 2", meshName: "ThinRing2_ThinRing2_0", defaultColor: "#FFFFFF" },
];

// Ring base and prongs
const BASE_MESHES = ["ThinRing3_ThinRing3_0", "Prongs_Prongs_0"];

function RingModel({ baseColor, diamondColors }) {
  const gltf = useGLTF(ringGLB);
  const sceneRef = useRef();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState([0, 0, 0]);

  // Clone scene and auto-fit
  useEffect(() => {
    const scene = gltf.scene.clone();
    sceneRef.current = scene;

    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 2 / maxDim;
    setScale(scaleFactor);

    const center = bbox.getCenter(new THREE.Vector3());
    setPosition([-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor]);
  }, [gltf]);

  // Update base and prongs material
  useEffect(() => {
    if (!sceneRef.current) return;

    const baseMat = BASE_OPTIONS.find(b => b.color === baseColor);

    sceneRef.current.traverse(mesh => {
      if (mesh.isMesh && BASE_MESHES.includes(mesh.name)) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: baseColor,
          roughness: baseMat?.roughness || 0.3,
          metalness: baseMat?.metalness || 1,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          reflectivity: 0.9,
        });
      }
    });
  }, [baseColor, sceneRef.current]);

  // Update diamonds individually
  useEffect(() => {
    if (!sceneRef.current) return;

    DIAMOND_MESHES.forEach((d, i) => {
      const mesh = sceneRef.current.getObjectByName(d.meshName);
      if (mesh) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: diamondColors[i]?.color || d.defaultColor,
          roughness: 0,
          metalness: 0,
          transparent: true,
          opacity: 1,
          transmission: 1,
          ior: 2.4,
          reflectivity: 0.9,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
        });
      }
    });
  }, [diamondColors, sceneRef.current]);

  if (!sceneRef.current) return null;

  return (
    <primitive
      object={sceneRef.current}
      scale={[scale, scale, scale]}
      position={position}
    />
  );
}

export default function RingsPage() {
  const [baseColor, setBaseColor] = useState(BASE_OPTIONS[0].color);
  const [diamondColors, setDiamondColors] = useState(
    DIAMOND_MESHES.map(d => ({ color: d.defaultColor }))
  );

  const handleDiamondColorChange = (index, color) => {
    setDiamondColors(prev =>
      prev.map((d, i) => (i === index ? { ...d, color } : d))
    );
  };

  return (
    <div className="ring-page">
      <h1 className="title">Customize Your 3D Ring</h1>

      <div className="customizer-container">
        {/* 3D Preview */}
        <div className="preview-section" style={{ height: 450 }}>
          <Canvas
            shadows
            gl={{ physicallyCorrectLights: true }}
            camera={{ position: [0, 2, 5], fov: 50 }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />

            <Suspense fallback={null}>
              <RingModel baseColor={baseColor} diamondColors={diamondColors} />
              <Environment preset="sunset" background={false} />
              <color attach="background" args={["#f0f0f0"]} />
            </Suspense>

            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        </div>

        {/* Options */}
        <div className="options-section">
          <h3>Choose Base</h3>
          <div className="options-grid">
            {BASE_OPTIONS.map(option => (
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

          <h3>Customize Diamonds</h3>
          <div className="options-grid">
            {DIAMOND_MESHES.map((d, i) => (
              <div key={i} className="option-card">
                <input
                  type="color"
                  value={diamondColors[i]?.color || d.defaultColor}
                  onChange={e => handleDiamondColorChange(i, e.target.value)}
                />
                <p>{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


