// src/components/Header.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";



import logoImg from "../assets/logo.png";
import addToCartImg from "../assets/addtocart.png";
import personImg from "../assets/person.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isWelcomePage = location.pathname === "/";

  const handleCartClick = () => {
    if (isWelcomePage) {
      navigate("/login");
    } else {
      navigate("/cart"); // change if your cart route is different
    }
  };

  const handlePersonClick = () => {
    if (isWelcomePage) {
      navigate("/login");
    } else {
      navigate("/profile"); // change if your profile route is different
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="sc-header">
      {/* LEFT SIDE: logo + icons (all IMAGES) */}
      <div className="sc-left">
        <button
          type="button"
          className="logo-button"
          onClick={handleLogoClick}
          aria-label="SheCraft Home"
        >
          <img src={logoImg} alt="SheCraft logo" className="logo-img" />
        </button>

        <button
          type="button"
          className="icon-button"
          onClick={handleCartClick}
          aria-label="Cart"
        >
          <img src={addToCartImg} alt="Cart" className="icon-img" />
        </button>

        <button
          type="button"
          className="icon-button"
          onClick={handlePersonClick}
          aria-label="Account"
        >
          <img src={personImg} alt="Account" className="icon-img" />
        </button>
      </div>

      {/* RIGHT SIDE: navigation text links */}
      <nav className="sc-nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;