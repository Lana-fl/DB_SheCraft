import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

import LengthImg from "../assets/necklace/length.png";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";
import "../styles/charmNecklace.css";
import "../styles/necklace.css";
import { useCart } from "../context/CartContext";




const API_BASE = "http://localhost:5000";

// Change if your route name is different
const ORDER_PAGE_ROUTE = "/orderpage";

// DB constraints
const CHAIN_DB_MAP = { Cable: "cable", Rope: "rope", Box: "box", Thin: "thin" };
const NECKLACE_DB_STYLE = "free charm"; // allowed: 'name','free charm','birthstone'

const METALS = [
  { name: "silver", color: "#C0C0C0", api: "silver" },
  { name: "gold", color: "#FFD700", api: "gold" },
  { name: "rose gold", color: "#B76E79", api: "rose gold" },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [14, 16, 18, 20];
const CHARM_COLORS = ["Multicolor", "Silver", "Gold", "RoseGold"];

function safeNum(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}


function addToLocalCartOnce(cartItem) {
  if (!cartItem?.accessoryID) return;

  const raw = localStorage.getItem("cart");
  const cart = raw ? JSON.parse(raw) : [];

  if (!cart.some((it) => it.accessoryID === cartItem.accessoryID)) {
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export default function CharmNecklacePage() {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [activePanel, setActivePanel] = useState(null);

  const [metal, setMetal] = useState(METALS[0]);
  const [charmColor, setCharmColor] = useState("Silver");

  const [letterCharms, setLetterCharms] = useState([]);
  const [shapeCharms, setShapeCharms] = useState([]);

 
  const [selectedLetterStyle, setSelectedLetterStyle] = useState(null);
  const [letterText, setLetterText] = useState("");


  const [selectedShapes, setSelectedShapes] = useState([]);

  const [confirmedCharms, setConfirmedCharms] = useState([]);

  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);


  const [isCheckoutView, setIsCheckoutView] = useState(false);

  const [uiError, setUiError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  /* FETCH CHARMS */
  useEffect(() => {
    async function fetchCharms() {
      try {
        const [lettersRes, shapesRes] = await Promise.all([
          fetch(`${API_BASE}/api/charms/letters?color=${charmColor}`),
          fetch(`${API_BASE}/api/charms/shapes?color=${charmColor}`),
        ]);

        if (!lettersRes.ok) throw new Error(`Letters API failed: ${lettersRes.status}`);
        if (!shapesRes.ok) throw new Error(`Shapes API failed: ${shapesRes.status}`);

        const lettersData = await lettersRes.json();
        const shapesData = await shapesRes.json();

        setLetterCharms(Array.isArray(lettersData) ? lettersData : []);
        setShapeCharms(Array.isArray(shapesData) ? shapesData : []);
      } catch (err) {
        console.error("Failed to fetch charms", err);
        setLetterCharms([]);
        setShapeCharms([]);
      }
    }

    fetchCharms();
  }, [charmColor]);

  /* HELPERS  */

  const toggleShape = (charm) => {
    setUiError("");
    setSelectedShapes((prev) =>
      prev.some((c) => c.charmID === charm.charmID)
        ? prev.filter((c) => c.charmID !== charm.charmID)
        : [...prev, charm]
    );
  };

  const selectLetterStyleFn = (styleObj) => {
    setUiError("");
    if (selectedLetterStyle?.charmID === styleObj.charmID) {
      setSelectedLetterStyle(null);
      setLetterText("");
      return;
    }
    setSelectedLetterStyle(styleObj);
  };

  const letterInConfirmed = useMemo(
    () => confirmedCharms.find((c) => c.type === "letter-custom") || null,
    [confirmedCharms]
  );

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name] || null,
    [selectedChain]
  );

  
  const confirmSelection = () => {
    setUiError("");

    const trimmed = letterText.trim().slice(0, 10);

    // constraint: cannot confirm letter style without text
    if (selectedLetterStyle && !trimmed) {
      setUiError("Enter the letters/word (max 10) before confirming a letter charm.");
      return;
    }

    const letterCustom = selectedLetterStyle
      ? [
          {
            charmID: selectedLetterStyle.charmID, // REAL charmID from DB
            type: "letter-custom",
            design: selectedLetterStyle.design,
            color: charmColor,
            text: trimmed,
            photoURL: selectedLetterStyle.photoURL,
            price: selectedLetterStyle.price,
          },
        ]
      : [];

    setConfirmedCharms([...selectedShapes, ...letterCustom]);
    setActivePanel(null);
    setIsCheckoutView(false);
  };

  
  const goToCheckoutView = () => {
    setUiError("");

    if (confirmedCharms.length === 0) {
      setUiError("Please confirm your charms selection first.");
      return;
    }

  
    if (letterInConfirmed && !letterInConfirmed.text?.trim()) {
      setUiError("Letter charm requires text (max 10).");
      return;
    }

    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    setIsCheckoutView(true);
  };

  
  const editDesign = () => {
    setUiError("");
    setIsCheckoutView(false);
    setActivePanel("charms");
  };

  
  const estimatedTotal = useMemo(() => {
    const charmsSum = confirmedCharms.reduce((sum, c) => sum + safeNum(c.price), 0);
  
    const metalBase = 0;
    return charmsSum + metalBase;
  }, [confirmedCharms]);

  const charmSummaryList = useMemo(() => {
    return confirmedCharms.map((c) => {
      const id = c.charmID;
      const design = c.design || "Charm";
      const color = c.color || charmColor || "—";
      const extra = c.type === "letter-custom" ? ` (Text: ${c.text || ""})` : "";
      return {
        key: `${id}-${c.type || "shape"}`,
        id,
        label: `${design}${extra}`,
        color,
      };
    });
  }, [confirmedCharms, charmColor]);

  
  const confirmAndPay = async () => {
    setUiError("");

    if (!isCheckoutView) {
      setUiError("Click 'Go to Checkout' first to review your order summary.");
      return;
    }

    if (!confirmedCharms.length) {
      setUiError("No charms confirmed.");
      return;
    }

    if (!chainDbValue) {
      setUiError("Invalid chain selected.");
      return;
    }

    if (letterInConfirmed && !letterInConfirmed.text?.trim()) {
      setUiError("Letter charm requires text (max 10).");
      return;
    }
 

    
    setIsPaying(true);

    try {
      
      const payload = {
        type: "necklace",
        metal: metal.api, // controller resolves materialID
        nbOfCharms: confirmedCharms.length,
        nbOfStones: 0,
        product: {
          chain: chainDbValue, // cable/thin/rope/box
          style: NECKLACE_DB_STYLE, // 'free charm'
          length: selectedLength,
        },
        charms: confirmedCharms.map((c) => ({
          charmID: c.charmID,
          quantity: 1,
         
          text: c.type === "letter-custom" ? c.text : null,
        })),
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
        const details = data?.sqlMessage || data?.error || data?.message || `Failed (${res.status})`;
        throw new Error(details);
      }

      const accessoryID = data?.accessoryID;
      const computedPrice = data?.computedPrice;

      if (!accessoryID) {
        throw new Error("Backend did not return accessoryID.");
      }

      addToCart({
  accessoryID,
  type: "necklace",
  metal: metal.name,
  price: computedPrice ?? estimatedTotal,


  summary: {
    chain: selectedChain.name,
    length: selectedLength,
    charmColor,
    charms: confirmedCharms.map((c) => ({
      charmID: c.charmID,
      quantity: 1,
      name: c.design,
      color: c.color || charmColor,
      text: c.type === "letter-custom" ? c.text : null,
    })),
  },
});

      
      navigate(ORDER_PAGE_ROUTE);
    } catch (err) {
      console.error("confirmAndPay error:", err);
      setUiError(err.message || "Confirm & Pay failed.");
    } finally {
      setIsPaying(false);
    }
  };

  /*  UI  */

  return (
    <div className="nk-page nk-charmPage">

      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Charm Necklace</h2>
          <p className="nk-subtitle">Build your design, then review summary, then Confirm & Pay.</p>
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
          {/* LEFT: SUMMARY / PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">
                  {isCheckoutView ? "Checkout Summary" : "Order Summary"}
                </span>
              </div>

            
              <div className="nk-imageWrap nk-charmPreview">
                {confirmedCharms.length === 0 ? (
                  <p className="nk-placeholder">No charms confirmed yet.</p>
                ) : (
                  confirmedCharms.map((c) => (
                    <img
                      key={`${c.charmID}-${c.type || "shape"}`}
                      src={`${API_BASE}${c.photoURL}`}
                      alt={c.design || "charm"}
                      className="nk-charmImg"
                    />
                  ))
                )}
              </div>

             
              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Metal</span>
                  <strong>{metal?.name || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Chain</span>
                  <strong>{selectedChain?.name || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Length</span>
                  <strong>{selectedLength}"</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Charm Color</span>
                  <strong>{charmColor}</strong>
                </div>

                
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Charms</div>
                  {charmSummaryList.length === 0 ? (
                    <div style={{ opacity: 0.8 }}>—</div>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {charmSummaryList.map((x) => (
                        <li key={x.key} style={{ marginBottom: 4 }}>
                          <strong>{x.id}</strong> — {x.label} — <em>{x.color}</em>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="nk-metaRow" style={{ marginTop: 10 }}>
                  <span>Total (estimated)</span>
                  <strong>${estimatedTotal.toFixed(2)}</strong>
                </div>
              </div>

              
              {isCheckoutView && (
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <button
                    className="nk-next"
                    type="button"
                    onClick={confirmAndPay}
                    disabled={isPaying}
                    style={{ flex: 1 }}
                  >
                    {isPaying ? "Processing..." : "Confirm and Pay"}
                  </button>

                  <button
                    type="button"
                    onClick={editDesign}
                    style={{
                      flex: 0,
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid #999",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Edit Design
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="nk-controls">
            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    className={`nk-metalBtn ${metal.name === m.name ? "isActive" : ""}`}
                    onClick={() => {
                      setUiError("");
                      setMetal(m);
                      setIsCheckoutView(false);
                    }}
                    type="button"
                  >
                    <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="nk-section">
              <label className="nk-label">Charm Color</label>
              <select
                className="nk-input"
                value={charmColor}
                onChange={(e) => {
                  setUiError("");
                  setCharmColor(e.target.value);
                  setIsCheckoutView(false);
                }}
              >
                {CHARM_COLORS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              className="nk-rowBtn"
              onClick={() => {
                setUiError("");
                setActivePanel("charms");
                setIsCheckoutView(false);
              }}
              type="button"
            >
              <span>Charms</span>
              <span>{confirmedCharms.length || "Select"}</span>
            </button>

            <button
              className="nk-rowBtn"
              onClick={() => {
                setUiError("");
                setActivePanel("chain");
                setIsCheckoutView(false);
              }}
              type="button"
            >
              <span>Chain & Length</span>
              <span>
                {selectedChain.name} · {selectedLength}"
              </span>
            </button>

           
            <button className="nk-next" onClick={goToCheckoutView} type="button">
              Go to Checkout
            </button>
          </section>

          
          <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
            <div className="nk-panelHeader">
              <h3>{activePanel === "charms" ? "Select Your Charms" : "Chain & Length"}</h3>
              <button onClick={() => setActivePanel(null)} type="button">
                Close
              </button>
            </div>

            <div className="nk-panelBody">
              {activePanel === "charms" && (
                <>
                  <h4>Letter Charm Style (choose 1)</h4>
                  <div className="nk-grid">
                    {letterCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${selectedLetterStyle?.charmID === c.charmID ? "isActive" : ""}`}
                        onClick={() => selectLetterStyleFn(c)}
                        type="button"
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                        <small>{(c.design || "").replace("letter ", "")}</small>
                      </button>
                    ))}
                  </div>

                  {selectedLetterStyle && (
                    <div style={{ marginTop: 12 }}>
                      <label style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
                        Enter your word (required, max 10)
                      </label>
                      <input
                        className="nk-input"
                        value={letterText}
                        onChange={(e) => {
                          setUiError("");
                          setLetterText(e.target.value.slice(0, 10));
                        }}
                        maxLength={10}
                        placeholder="e.g. NICOLE"
                      />
                    </div>
                  )}

                  <h4 style={{ marginTop: 18 }}>Shape Charms</h4>
                  <div className="nk-grid">
                    {shapeCharms.map((c) => (
                      <button
                        key={c.charmID}
                        className={`nk-cardPick ${selectedShapes.some((x) => x.charmID === c.charmID) ? "isActive" : ""}`}
                        onClick={() => toggleShape(c)}
                        type="button"
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activePanel === "chain" && (
                <>
                  <h4>Chain Type</h4>
                  <div className="nk-chainGrid">
                    {CHAINS.map((c) => (
                      <button
                        key={c.name}
                        className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedChain(c);
                          setIsCheckoutView(false);
                        }}
                        type="button"
                      >
                        <img src={c.img} alt={c.name} />
                        <strong>{c.name}</strong>
                      </button>
                    ))}
                  </div>

                  <h4>Length</h4>
                  <div className="nk-lengths">
                    {LENGTHS.map((len) => (
                      <button
                        key={len}
                        className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedLength(len);
                          setIsCheckoutView(false);
                        }}
                        type="button"
                      >
                        {len}"
                      </button>
                    ))}
                  </div>

                  <img src={LengthImg} alt="Length guide" />
                </>
              )}
            </div>

            {activePanel === "charms" && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" onClick={confirmSelection} type="button">
                  Confirm Selection
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={() => setActivePanel(null)} />}
        </div>
      </div>
    </div>
  );
}