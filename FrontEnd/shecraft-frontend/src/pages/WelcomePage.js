import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";
import bannerImg from "../assets/welcomeBanner.png";
import Footer from './Footer';


import necklacesImg from "../assets/necklaces.jpg";
import ringsImg from "../assets/rings.jpg";
import braceletsImg from "../assets/bracelets.jpg";
import earringsImg from "../assets/earrings.jpg";

export default function WelcomePage() {
  const navigate = useNavigate();

  
  const categories = [
    { name: "Necklaces", route: "/necklaces", image: necklacesImg },
    { name: "Rings", route: "/rings", image: ringsImg },
    { name: "Bracelets", route: "/bracelets", image: braceletsImg },
    { name: "Earrings", route: "/earrings", image: earringsImg },
  ];

   return (
    <div className="welcome-page">
      {/* ---------- NAVBAR ---------- */}
      <header className="navbar">
        <div className="logo">SheCraft</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* ---------- HERO BANNER ---------- */}
      <section className="hero" style={{ backgroundImage: `url(${bannerImg})` }}>
      </section>

      {/* ---------- CATEGORY SECTION ---------- */}
      <section className="category-section">
        <h2 className="section-title">Discover Our Creations</h2>
        <p className="section-subtitle">Choose a category to explore our best sellers.</p>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(cat.route)}
            >
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} className="category-image" />
              </div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  );
}
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer/Footer';
// import bannerImg from '../assets/welcomeBanner';
// import '../styles/WelcomePage.css';

// function WelcomePage() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: 'Jewelry', image: '/images/jewelry.jpg', route: '/jewelry' },
//     { name: 'Accessories', image: '/images/accessories.jpg', route: '/accessories' },
//   ];

//   return (
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

// export default WelcomePage;
