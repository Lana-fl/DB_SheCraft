import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/earring.css";

// Images
import birthstoneEarringImg from "../assets/Earring/birthstoneearing.jpg";
import hoopCharmImg from "../assets/Earring/hoopwithcharm.jpeg";

export default function EarringsPage() {
  const navigate = useNavigate();

  return (
    <div className="ear-page">
      <header className="ear-hero">
        <h1 className="ear-title">Design Your Earrings</h1>
        <p className="ear-subtitle">Choose your style to begin</p>
      </header>

      <div className="ear-typeGrid">
        {/* BIRTHSTONE */}
        <button
          className="ear-typeCard"
          onClick={() => navigate("/earrings/birthstone")}
        >
          <div className="ear-typeImg">
            <img src={birthstoneEarringImg} alt="Birthstone Earrings" />
          </div>
          <h3>Birthstone Earrings</h3>
          <p>Personal, meaningful, and timeless</p>
        </button>

        {/* CHARM */}
        <button
          className="ear-typeCard"
          onClick={() => navigate("/earrings/charm")}
        >
          <div className="ear-typeImg">
            <img src={hoopCharmImg} alt="Charm Earrings" />
          </div>
          <h3>Charm Earrings</h3>
          <p>Create your own story</p>
        </button>
      </div>
    </div>
  );
}
