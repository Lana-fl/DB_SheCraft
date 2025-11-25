
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";
import bannerImg from "../assets/welcomeBanner.png";

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
      <section
        className="hero"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        
      </section>

      {/* ---------- CATEGORY SECTION ---------- */}
      <section className="category-section">
        <h2 className="section-title">Discover Our Creations</h2>
        <p className="section-subtitle">
          Choose a category to explore our best sellers.
        </p>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(cat.route)}
            >
              <div className="category-image-wrapper">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-image"
                />
              </div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-about">
          <h3>About SheCraft</h3>
          <p>
            SheCraft specializes in bespoke necklaces, rings, bracelets and
            earrings, crafted to reflect your story, style, and legacy.
          </p>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>
            Phone: <a href="tel:+96171234567">+961 71 234 567</a>
          </p>
          <p>
            Email: <a href="mailto:info@shecraft.com">info@shecraft.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
