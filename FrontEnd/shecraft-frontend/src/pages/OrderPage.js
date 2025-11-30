// src/pages/OrderPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderPage.css";
import Footer from "./Footer";

import ringsImg from "../assets/rings2.png";
import necklacesImg from "../assets/necklaces2.png";
import braceletsImg from "../assets/bracelets2.png";
import earringsImg from "../assets/earrings2.png";

export default function OrderPage() {
  const navigate = useNavigate();

  const categories = [
    { name: "Rings",        route: "/rings",        image: ringsImg },
    { name: "Necklaces",    route: "/necklaces",    image: necklacesImg },
    { name: "Bracelets",    route: "/bracelets",    image: braceletsImg },
    { name: "Earrings",     route: "/earrings",     image: earringsImg },
  ];

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>Design Your Jewelry</h1>
        <p>Select a category to start customizing your jewelry.</p>
      </div>

      <div className="order-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="order-card"
            onClick={() => navigate(cat.route)}
          >
            <div className="order-image-wrapper">
              <img src={cat.image} alt={cat.name} className="order-image" />
            </div>
            <div className="order-card-footer">
              <h2>{cat.name}</h2>
              {/* optional subtitle text */}
              {/* <span>Engagement, wedding &amp; more</span> */}
            </div>
          </div>
          
        ))}
      </div>
      <Footer />
    </div>
  );
}
