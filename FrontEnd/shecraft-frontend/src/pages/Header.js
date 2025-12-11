// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

import logoImg from "../assets/logo.png";
import addToCartImg from "../assets/addtocart.png";
import personImg from "../assets/person.png";

const Header = ({ openLogin, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <header className="sc-header">
      {/* LEFT SIDE: Logo + Icons */}
      <div className="sc-left">

        {/* LOGO */}
        <button
          type="button"
          className="logo-button"
          onClick={() => navigate("/")}
          aria-label="SheCraft Home"
        >
          <img src={logoImg} alt="SheCraft logo" className="logo-img" />
        </button>

        {/* CART ICON */}
        <button
          type="button"
          className="icon-button"
          aria-label="Cart"
          onClick={() => {
            if (!isLoggedIn) openLogin();
            else navigate("/cart");
          }}
        >
          <img src={addToCartImg} alt="Cart" className="icon-img" />
        </button>

        {/* ACCOUNT ICON */}
        <button
          type="button"
          className="icon-button"
          aria-label="Account"
          onClick={() => {
            if (!isLoggedIn) openLogin();
            else navigate("/account");  // FIXED ROUTE
          }}
        >
          <img src={personImg} alt="Account" className="icon-img" />
        </button>
      </div>

      {/* RIGHT SIDE: NAVIGATION LINKS */}
      <nav className="sc-nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>

        {/* LOGIN opens the modal instead of navigating */}
        <span
          className="login-header-link"
          onClick={openLogin}
          style={{ cursor: "pointer" }}
        >
          Login
        </span>
      </nav>
    </header>
  );
};

export default Header;
