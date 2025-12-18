import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bracelet.css";

/* ===== Name style images ===== */
import BubbleImg from "../assets/Bracelet/braceletstyle/bubble.jpg";
import CursiveImg from "../assets/Bracelet/braceletstyle/cursive.jpg";
import LetterSparkImg from "../assets/Bracelet/braceletstyle/letterspark.jpg";

/* ===== Other images ===== */
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

const LENGTHS = [6, 6.5, 7, 7.5];

export default function BraceletsPage() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(0);

  const [selectedNameStyle, setSelectedNameStyle] = useState({
    ...NAME_STYLES[0],
    fixed: false,
  });

  const [nameText, setNameText] = useState("");
  const [metal, setMetal] = useState(METALS[0].color);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(7);

  /* slower auto-preview */
  useEffect(() => {
    if (selectedNameStyle.fixed) return;
    const interval = setInterval(() => {
      setHoverIndex((i) => (i + 1) % NAME_STYLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [selectedNameStyle.fixed]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (p) => setActivePanel((prev) => (prev === p ? null : p));

  const handleSubmit = () => {
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
          {/* PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">
                  {METALS.find((m) => m.color === metal)?.name}
                </span>
              </div>

              <div className="nk-imageWrap">
                <img
                  className="nk-mainImg"
                  src={
                    selectedNameStyle.fixed
                      ? selectedNameStyle.img
                      : NAME_STYLES[hoverIndex].img
                  }
                  alt="Bracelet preview"
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

          {/* CONTROLS */}
          <section className="nk-controls">
            <div className="nk-section">
              <label className="nk-label">Engraved Name</label>
              <input
                className="nk-input"
                maxLength={12}
                placeholder="Enter name (max 12)"
                value={nameText}
                onChange={(e) => setNameText(e.target.value)}
              />
              <p className="nk-help">Tip: shorter names look more balanced.</p>
            </div>

            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    className={`nk-metalBtn ${
                      metal === m.color ? "isActive" : ""
                    }`}
                    onClick={() => setMetal(m.color)}
                  >
                    <span
                      className="nk-metalDot"
                      style={{ background: m.color }}
                    />
                    <span className="nk-metalName">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="nk-rowBtn" onClick={() => togglePanel("nameStyle")}>
              <div className="nk-rowLeft">
                <span className="nk-rowTitle">Name Style</span>
                <span className="nk-rowValue">{selectedNameStyle.name}</span>
              </div>
              <span className="nk-chevron" />
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
              <span className="nk-chevron" />
            </button>

            <button className="nk-next" onClick={handleSubmit}>
              Next to Designer
            </button>
          </section>

          {/* SLIDE PANEL */}
          {activePanel && (
            <>
              <aside className="nk-panel open">
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
                  <button className="nk-close" onClick={closePanel}>
                    Close
                  </button>
                </div>

                <div className="nk-panelBody">
                  {activePanel === "nameStyle" && (
                    <div className="nk-grid">
                      {NAME_STYLES.map((style) => (
                        <button
                          key={style.name}
                          className={`nk-cardPick ${
                            selectedNameStyle.name === style.name
                              ? "isActive"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedNameStyle({ ...style, fixed: true })
                          }
                        >
                          <img
                            src={style.img}
                            alt={style.name}
                            className="nk-cardImg"
                          />
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
                      <div className="nk-chainGrid">
                        {CHAINS.map((c) => (
                          <button
                            key={c.name}
                            className={`nk-chainCard ${
                              selectedChain.name === c.name ? "isActive" : ""
                            }`}
                            onClick={() => setSelectedChain(c)}
                          >
                            <div className="nk-chainImgWrapper">
                              <img
                                src={c.img}
                                alt={c.name}
                                className="nk-chainImg"
                              />
                            </div>
                            <strong>{c.name}</strong>
                          </button>
                        ))}
                      </div>

                      <div className="nk-lengths">
                        {LENGTHS.map((len) => (
                          <button
                            key={len}
                            className={`nk-lengthBtn ${
                              selectedLength === len ? "isActive" : ""
                            }`}
                            onClick={() => setSelectedLength(len)}
                          >
                            {len}"
                          </button>
                        ))}
                      </div>

                      <div className="nk-lengthPreview">
                        <img
                          src={LengthImg}
                          alt="Bracelet length guide"
                          className="nk-lengthImg"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="nk-panelFooter">
                  <button className="nk-confirm" onClick={closePanel}>
                    Confirm Style
                  </button>
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
