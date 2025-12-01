import React from "react";
import { Link } from "react-router-dom";
import "../styles/AboutPage.css";
import Footer from './Footer';
// use your own images here
import aboutStoryImg from "../assets/ourstory.png";
import aboutCraftImg from "../assets/craftmanship.png";
import aboutValuesImg from "../assets/ourvalues.png";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ---------- NAVBAR (same style as WelcomePage) ---------- */}
      <header className="navbar">
        <div className="logo">SheCraft</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="about-main">
        {/* ---------- TOP TITLE ---------- */}
        <section className="about-hero">
          <h1>About SheCraft</h1>
          <p>Handcrafted jewelry designed to tell your story.</p>
        </section>

        {/* ---------- SECTION 1 ---------- */}
        <section className="about-section">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              SheCraft began as a small passion project, born from the desire
              to create jewelry that feels personal, intentional, and timeless.
              What started with a single handcrafted necklace has grown into a
              collection of bespoke pieces made to celebrate life’s special
              moments.
            </p>
            <p>
              Every design is sketched, refined, and brought to life with
              attention to detail, so each piece feels uniquely yours.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img
              src={aboutStoryImg}
              alt="SheCraft studio"
              className="about-image"
            />
          </div>
        </section>

        {/* ---------- SECTION 2 (reversed) ---------- */}
        <section className="about-section reverse">
          <div className="about-text">
            <h2>Craftsmanship</h2>
            <p>
              From selecting metals and stones to the final polish, our process
              is rooted in craftsmanship. We blend traditional techniques with a
              modern aesthetic, ensuring each necklace, ring, bracelet, and pair
              of earrings is made to last.
            </p>
            <p>
              Custom orders are at the heart of what we do—whether it is
              engraving, stone choice, or a fully original design, we work with
              you to bring your vision to life.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img
              src={aboutCraftImg}
              alt="Jewelry crafting"
              className="about-image"
            />
          </div>
        </section>

        {/* ---------- SECTION 3 ---------- */}
        <section className="about-section">
          <div className="about-text">
            <h2>Our Values</h2>
            <p>
              We believe jewelry should feel meaningful, not mass produced.
              SheCraft focuses on small-batch collections, responsible material
              choices where possible, and transparent communication with every
              client.
            </p>
            <p>
              Our goal is simple: to create pieces that make you feel confident,
              seen, and connected—whether you are gifting them or wearing them
              yourself.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img
              src={aboutValuesImg}
              alt="Jewelry display"
              className="about-image"
            />
          </div>
        </section>
      </main>

     
  
       <Footer />
    </div>
  );
}
