import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bracelet.css";

// ===== Name style images (ONLY THESE) =====
import BubbleImg from "../assets/Bracelet/braceletstyle/bubble.jpg";
import CursiveImg from "../assets/Bracelet/braceletstyle/cursive.jpg";
import LetterSparkImg from "../assets/Bracelet/braceletstyle/letterspark.jpg";

// ===== Other images =====
import LengthImg from "../assets/Bracelet/length.jpg";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
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

const LENGTHS = [6, 7, 8, 9];

export default function BraceletsPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [activePanel, setActivePanel] = useState(null);

  const [selectedNameStyle, setSelectedNameStyle] = useState({
    ...NAME_STYLES[0],
    fixed: false,
  });
  const [hoverIndex, setHoverIndex] = useState(0);

  const [nameText, setNameText] = useState("");
  const [metal, setMetal] = useState(METALS[0].color);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(7);

  useEffect(() => {
    if (selectedNameStyle.fixed) return;
    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % NAME_STYLES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [selectedNameStyle.fixed]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  const handleSubmit = () => {
    setCurrentStep(2);
    navigate("/checkout", {
      state: {
        itemType: "bracelet",
        selectedNameStyle,
        chainType: selectedChain,
        selectedLength,
        nameText,
        metal,
      },
    });
  };

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Bracelet</h2>
          <p className="nk-subtitle">
            Choose a style, chain, and finish then make it yours.
          </p>
        </header>

        <div className="nk-customizer">
          {/* LEFT PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">
                  {METALS.find((m) => m.color === metal)?.name || "Metal"}
                </span>
              </div>

              <div className="nk-imageWrap">
                <img
                  src={
                    selectedNameStyle.fixed
                      ? selectedNameStyle.img
                      : NAME_STYLES[hoverIndex].img
                  }
                  alt="Bracelet Preview"
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
                onChange={(e) => setNameText(e.target.value)}
              />
              <p className="nk-help">
                Tip: shorter names look more balanced.
              </p>
            </div>

            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`nk-metalBtn ${
                      metal === m.color ? "isActive" : ""
                    }`}
                    onClick={() => setMetal(m.color)}
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
              className="nk-rowBtn"
              onClick={() => togglePanel("nameStyle")}
            >
              <div className="nk-rowLeft">
                <span className="nk-rowTitle">Name Style</span>
                <span className="nk-rowValue">
                  {selectedNameStyle.name}
                </span>
              </div>
            </button>

            <button
              className="nk-rowBtn"
              onClick={() => togglePanel("chainLength")}
            >
              <div className="nk-rowLeft">
                <span className="nk-rowTitle">Chain & Length</span>
                <span className="nk-rowValue">
                  {selectedChain.name} · {selectedLength}"
                </span>
              </div>
            </button>

            <button className="nk-next" onClick={handleSubmit}>
              Next to Designer
            </button>
          </section>

          {/* PANEL */}
          {activePanel && (
            <>
              <aside className="nk-panel open">
                <div className="nk-panelHeader">
                  <h3>
                    {activePanel === "nameStyle"
                      ? "Select Name Style"
                      : "Chain & Length"}
                  </h3>
                  <button className="nk-close" onClick={closePanel}>
                    Close
                  </button>
                </div>

                <div className="nk-panelBody">
                  {activePanel === "nameStyle" &&
                    NAME_STYLES.map((style) => (
                      <button
                        key={style.name}
                        className="nk-cardPick"
                        onClick={() =>
                          setSelectedNameStyle({
                            ...style,
                            fixed: true,
                          })
                        }
                      >
                        <img src={style.img} alt={style.name} />
                        <strong>{style.name}</strong>
                      </button>
                    ))}

                  {activePanel === "chainLength" && (
                    <>
                      <div className="nk-chainGrid">
                        {CHAINS.map((c) => (
                          <button
                            key={c.name}
                            className="nk-chainCard"
                            onClick={() => setSelectedChain(c)}
                          >
                            <img src={c.img} alt={c.name} />
                            <strong>{c.name}</strong>
                          </button>
                        ))}
                      </div>

                      <div className="nk-lengths">
                        {LENGTHS.map((len) => (
                          <button
                            key={len}
                            className="nk-lengthBtn"
                            onClick={() => setSelectedLength(len)}
                          >
                            {len}"
                          </button>
                        ))}
                      </div>

                      <img
                        src={LengthImg}
                        alt="Length Guide"
                        className="nk-lengthImg"
                      />
                    </>
                  )}
                </div>
              </aside>

              <div className="nk-overlay" onClick={closePanel} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
