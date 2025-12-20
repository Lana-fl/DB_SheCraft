

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/necklace.css";

// ===== Name style images (ONLY THESE) =====
import BubbleImg from "../assets/necklace/necklacestyle/bubble.jpg";
import CursiveImg from "../assets/necklace/necklacestyle/cursive.jpg";
import LetterSparkImg from "../assets/necklace/necklacestyle/letterspark.jpg";

// ===== Other images =====
import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

/* ---------------- CONSTANTS ---------------- */
const API_BASE = "http://localhost:5000";
const ORDER_PAGE_ROUTE = "/orderpage";
const BASE_PRICE_NAME_NECKLACE = 40;
const NAME_NECKLACE_DB_STYLE = "name";

const CHAIN_DB_MAP = { Cable: "cable", Rope: "rope", Box: "box", Thin: "thin" };

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "Rose Gold" },
];

const NAME_STYLES = [
  { name: "Bubble", img: BubbleImg },
  { name: "Cursive", img: CursiveImg },
  { name: "Letter Spark", img: LetterSparkImg },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [14, 16, 18, 20];

export default function NecklacesPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activePanel, setActivePanel] = useState(null); 

  const [selectedNameStyle, setSelectedNameStyle] = useState({
    ...NAME_STYLES[0],
    fixed: false,
  });
  const [hoverIndex, setHoverIndex] = useState(0);

  const [nameText, setNameText] = useState("");
  const [metal, setMetal] = useState(METALS[0]);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

  const [uiError, setUiError] = useState("");
  const [isAdding, setIsAdding] = useState(false);


  const [addedMsg, setAddedMsg] = useState("");
  const [addedAccessoryID, setAddedAccessoryID] = useState(null);

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name] || null,
    [selectedChain]
  );


  useEffect(() => {
    if (selectedNameStyle.fixed) return;
    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [selectedNameStyle.fixed]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) => {
    setUiError("");
    setAddedMsg("");
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

 
  const addToCartNow = async () => {
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);

    const trimmedName = String(nameText || "").trim();
    if (!trimmedName) {
      setUiError("Please enter the engraved name.");
      return;
    }
    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    setIsAdding(true);
    try {
      const payload = {
        type: "necklace",
        metal: metal.api, 
        nbOfCharms: 0,
        nbOfStones: 0,
        product: {
          chain: chainDbValue,
          style: NAME_NECKLACE_DB_STYLE, 
          length: selectedLength,

          
          nameText: trimmedName,
          nameStyle: selectedNameStyle.name,
        },
        charms: [],
        stones: [],
      };

      const res = await fetch(`${API_BASE}/api/accessory-instance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          data?.sqlMessage ||
          data?.error ||
          data?.message ||
          `Failed (${res.status})`;
        throw new Error(msg);
      }

      const accessoryID = data?.accessoryID;
      const computedPrice = data?.computedPrice;

      if (!accessoryID) throw new Error("Backend did not return accessoryID.");

      
      addToCart({
        accessoryID,
        type: "necklace",
        style: NAME_NECKLACE_DB_STYLE,
        metal: metal.name,
        chain: selectedChain.name,
        chainDb: chainDbValue,
        length: selectedLength,
        nameText: trimmedName,
        nameStyle: selectedNameStyle.name,
        previewImg: selectedNameStyle.img,
        price: computedPrice ?? BASE_PRICE_NAME_NECKLACE,
      });

      setAddedAccessoryID(accessoryID);
      setAddedMsg("Added to cart!");
    } catch (err) {
      console.error(err);
      setUiError(err.message || "Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Necklace</h2>
          <p className="nk-subtitle">
            Choose a style, chain, and finish then make it yours.
          </p>
        </header>

        {uiError ? (
          <div
            style={{
              marginBottom: 12,
              padding: 10,
              borderRadius: 10,
              background: "#ffe7e7",
              fontWeight: 700,
            }}
          >
            {uiError}
          </div>
        ) : null}

        <div className="nk-customizer">
          {/* LEFT PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">{metal.name}</span>
              </div>

              <div className="nk-imageWrap">
                <img
                  src={
                    selectedNameStyle.fixed
                      ? selectedNameStyle.img
                      : NAME_STYLES[hoverIndex].img
                  }
                  alt="Necklace Preview"
                  className="nk-mainImg"
                />

                {nameText && (
                  <div className="nk-nameOverlay">
                    <span className="nk-nameText">{nameText}</span>
                  </div>
                )}
              </div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Style</span>
                  <strong>{selectedNameStyle.name}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Chain</span>
                  <strong>{selectedChain.name}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Length</span>
                  <strong>{selectedLength}"</strong>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT CONTROLS */}
          <section className="nk-controls">
            <div className="nk-section">
              <label className="nk-label">Engraved Name</label>
              <input
                className="nk-input"
                type="text"
                maxLength={12}
                placeholder="Enter name (max 12)"
                value={nameText}
                onChange={(e) => {
                  setUiError("");
                  setAddedMsg("");
                  setNameText(e.target.value);
                }}
              />
              <p className="nk-help">Tip: shorter names look more balanced.</p>
            </div>

            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`nk-metalBtn ${
                      metal.name === m.name ? "isActive" : ""
                    }`}
                    onClick={() => {
                      setUiError("");
                      setAddedMsg("");
                      setMetal(m);
                    }}
                  >
                    <span
                      className="nk-metalDot"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="nk-metalName">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`nk-rowBtn ${
                activePanel === "nameStyle" ? "open" : ""
              }`}
              onClick={() => togglePanel("nameStyle")}
            >
              <div className="nk-rowLeft">
                <span className="nk-rowTitle">Name Style</span>
                <span className="nk-rowValue">{selectedNameStyle.name}</span>
              </div>
              <span className="nk-chevron" aria-hidden="true" />
            </button>

            <button
              type="button"
              className={`nk-rowBtn ${
                activePanel === "chainLength" ? "open" : ""
              }`}
              onClick={() => togglePanel("chainLength")}
            >
              <div className="nk-rowLeft">
                <span className="nk-rowTitle">Chain & Length</span>
                <span className="nk-rowValue">
                  {selectedChain.name} · {selectedLength}"
                </span>
              </div>
              <span className="nk-chevron" aria-hidden="true" />
            </button>

            {/* Removed the second Add button here (only bottom bar remains) */}
          </section>

          {/* RIGHT SLIDE PANEL */}
          <aside
            className={`nk-panel ${activePanel ? "open" : ""}`}
            aria-hidden={!activePanel}
          >
            <div className="nk-panelHeader">
              <div>
                <h3 className="nk-panelTitle">
                  {activePanel === "nameStyle"
                    ? "Select Name Style"
                    : "Chain & Length"}
                </h3>
                <p className="nk-panelSub">
                  {activePanel === "nameStyle"
                    ? "Pick the font look that matches your vibe."
                    : "Choose the chain type and length."}
                </p>
              </div>

              <button type="button" className="nk-close" onClick={closePanel}>
                Close
              </button>
            </div>

            <div className="nk-panelBody">
              {activePanel === "nameStyle" && (
                <div className="nk-grid">
                  {NAME_STYLES.map((style) => (
                    <button
                      key={style.name}
                      type="button"
                      className={`nk-cardPick ${
                        selectedNameStyle.name === style.name ? "isActive" : ""
                      }`}
                      onClick={() => {
                        setUiError("");
                        setAddedMsg("");
                        setSelectedNameStyle({ ...style, fixed: true });
                      }}
                    >
                      <img src={style.img} alt={style.name} className="nk-cardImg" />
                      <div className="nk-cardText">
                        <strong>{style.name}</strong>
                        <span>Tap to select</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activePanel === "chainLength" && (
                <>
                  <h4 className="nk-panelSectionTitle">Chain Type</h4>
                  <div className="nk-chainGrid">
                    {CHAINS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`nk-chainCard ${
                          selectedChain.name === c.name ? "isActive" : ""
                        }`}
                        onClick={() => {
                          setUiError("");
                          setAddedMsg("");
                          setSelectedChain(c);
                        }}
                      >
                        <img src={c.img} alt={c.name} className="nk-chainImg" />
                        <strong>{c.name}</strong>
                      </button>
                    ))}
                  </div>

                  <h4 className="nk-panelSectionTitle">Length</h4>
                  <div className="nk-lengths">
                    {LENGTHS.map((len) => (
                      <button
                        key={len}
                        type="button"
                        className={`nk-lengthBtn ${
                          selectedLength === len ? "isActive" : ""
                        }`}
                        onClick={() => {
                          setUiError("");
                          setAddedMsg("");
                          setSelectedLength(len);
                        }}
                      >
                        {len}"
                      </button>
                    ))}
                  </div>

                  <div className="nk-lengthPreview">
                    <img src={LengthImg} alt="Length Guide" className="nk-lengthImg" />
                  </div>
                </>
              )}
            </div>

            {activePanel && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" type="button" onClick={closePanel}>
                  {activePanel === "nameStyle" ? "Confirm Style" : "Confirm Selection"}
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={closePanel} />}
        </div>
      </div>

      {/* BOTTOM BAR: show base price, single Add to Cart button */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          marginTop: 16,
          padding: "12px 16px",
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 900, fontSize: 16 }}>
            ${BASE_PRICE_NAME_NECKLACE.toFixed(2)}
          </span>
          <span style={{ fontSize: 12, opacity: 0.75 }}>
            Base price for Name Necklace
            {addedAccessoryID ? ` • ID: ${addedAccessoryID}` : ""}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {addedMsg ? (
            <span style={{ fontWeight: 800, color: "#1a7f37" }}>{addedMsg}</span>
          ) : null}

          <button
            type="button"
            onClick={() => navigate(ORDER_PAGE_ROUTE)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            View Cart
          </button>

          <button
            type="button"
            onClick={addToCartNow}
            disabled={isAdding}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 900,
              opacity: isAdding ? 0.7 : 1,
            }}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
