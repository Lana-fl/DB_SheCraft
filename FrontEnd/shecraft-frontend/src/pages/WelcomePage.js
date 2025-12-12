// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/WelcomePage.css";
// import bannerImg from "../assets/welcomeBanner.png";
// import Footer from './Footer';


// import necklacesImg from "../assets/necklaces.jpg";
// import ringsImg from "../assets/rings.jpg";
// import braceletsImg from "../assets/bracelets.jpg";
// import earringsImg from "../assets/earrings.jpg";

// export default function WelcomePage() {
//   const navigate = useNavigate();

  
//   const categories = [
//     { name: "Necklaces", route: "/necklaces", image: necklacesImg },
//     { name: "Rings", route: "/rings", image: ringsImg },
//     { name: "Bracelets", route: "/bracelets", image: braceletsImg },
//     { name: "Earrings", route: "/earrings", image: earringsImg },
//   ];

//    return (
//     <div className="welcome-page">
//       {/* ---------- NAVBAR ---------- */}
//       <header className="navbar">
//         <div className="logo">SheCraft</div>
//         <nav className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/about">About Us</Link>
//           <Link to="/login">Login</Link>
//         </nav>
//       </header>

//       {/* ---------- HERO BANNER ---------- */}
//       <section className="hero" style={{ backgroundImage: `url(${bannerImg})` }}>
//       </section>

//       {/* ---------- CATEGORY SECTION ---------- */}
//       <section className="category-section">
//         <h2 className="section-title">Discover Our Creations</h2>
//         <p className="section-subtitle">Choose a category to explore our best sellers.</p>

//         <div className="category-grid">
//           {categories.map((cat) => (
//             <div
//               key={cat.name}
//               className="category-card"
//               onClick={() => navigate(cat.route)}
//             >
//               <div className="category-image-wrapper">
//                 <img src={cat.image} alt={cat.name} className="category-image" />
//               </div>
//               <h3>{cat.name}</h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ---------- FOOTER ---------- */}
//       <Footer />
//     </div>
//   );
// }

//old one
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/WelcomePage.css";
// import bannerImg from "../assets/welcomeBanner.png";
// import Header from "./Header";
// import Footer from "./Footer";

// import necklacesImg from "../assets/necklaces.jpg";
// import ringsImg from "../assets/rings.jpg";
// import braceletsImg from "../assets/bracelets.jpg";
// import earringsImg from "../assets/earrings.jpg";

// export default function WelcomePage() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Necklaces", route: "/necklaces", image: necklacesImg },
//     { name: "Rings", route: "/rings", image: ringsImg },
//     { name: "Bracelets", route: "/bracelets", image: braceletsImg },
//     { name: "Earrings", route: "/earrings", image: earringsImg },
//   ];

//   return (
//     <div className="page-container">
//       <Header />

//       <main className="main-content">
//         <div className="welcome-page">
//           {/* HERO */}
//           <section
//             className="hero"
//             style={{ backgroundImage: `url(${bannerImg})` }}
//           >
//             {/* optional hero text here if you want */}
//           </section>

//           {/* CATEGORIES */}
//           <section className="category-section">
//             <h2 className="section-title">Discover Our Creations</h2>
//             <p className="section-subtitle">
//               Choose a category to explore our best sellers.
//             </p>

//             <div className="category-grid">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.name}
//                   className="category-card"
//                   onClick={() => navigate(cat.route)}
//                 >
//                   <div className="category-image-wrapper">
//                     <img
//                       src={cat.image}
//                       alt={cat.name}
//                       className="category-image"
//                     />
//                   </div>
//                   <h3>{cat.name}</h3>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// src/pages/WelcomePage.jsx (adjust path if needed)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

import bannerImg from "../assets/welcomeBanner.png";
import necklacesImg from "../assets/necklaces.jpg";
import ringsImg from "../assets/rings.jpg";
import braceletsImg from "../assets/bracelets.jpg";
import earringsImg from "../assets/earrings.jpg";
import LoginPage from "./LoginPage"; 

export default function WelcomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const categories = [
    { name: "Rings", route: "/rings", image: ringsImg },
    { name: "Necklaces", route: "/necklaces", image: necklacesImg },
    { name: "Bracelets", route: "/bracelets", image: braceletsImg },
    { name: "Earrings", route: "/earrings", image: earringsImg },
  ];

 return (
    <div className="page-container">
      <main className="main-content">
        <div className="welcome-page">
          {/* ---------- QUOTE SECTION ---------- */}
          <section className="quote-section">
  <p className="quote-text">
    “Jewelry is how you whisper your story without saying a word.”
  </p>
  <p className="quote-sub">
    Log in to start crafting pieces that are as unique as you are.
  </p>
</section>

          {/* ---------- HERO BANNER ---------- */}
          <section
            className="hero"
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <div className="hero-overlay">
              <h1 className="hero-title">SheCraft Studio</h1>
              <p className="hero-subtitle">
                Customize. Layer. Make every detail yours.
              </p>
            </div>
          </section>

          {/* ---------- COLLECTION ROWS  ---------- */}
          <section className="collections-section">
            <h2 className="section-title">Explore Our Collections</h2>
            <p className="section-subtitle">
              Choose a category to discover handcrafted favorites and best sellers.
            </p>

            {categories.map((cat, index) => (
              <div
                key={cat.name}
                className={`collection-row ${index % 2 === 1 ? "reverse" : ""}`}
              >
                <div
                  className="collection-image-wrapper"
                  onClick={() => navigate(cat.route)}
                >
                  <img src={cat.image} alt={cat.name} className="collection-image" />
                </div>

                <div className="collection-info">
                  <h3 className="collection-name">{cat.name}</h3>
                  <p className="collection-text">
                    Discover {cat.name.toLowerCase()} designed to stack, mix,
                    and match with every mood.
                  </p>
                  <button className="collection-cta" onClick={() => navigate(cat.route)}>
                    Explore {cat.name}
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}