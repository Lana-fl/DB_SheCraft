import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- STYLES ---------------- */
import "../styles/bracelet.css";
import "../styles/charmBracelet.css";

/* ---------------- ASSETS ---------------- */
import LengthImg from "../assets/Bracelet/length.jpg";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";

/* ---------------- CONSTANTS ---------------- */
const API_BASE = "http://localhost:5000";
const ORDER_PAGE_ROUTE = "/orderpage";

const CHAIN_DB_MAP = {
  Cable: "cable",
  Rope: "rope",
  Box: "box",
  Thin: "thin",
};

// ✅ bracelet.style constraint must match DB (you said style IN ('name','free charm','birthstone'))
const BRACELET_DB_STYLE = "free charm";

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "RoseGold" },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [6, 6.5, 7, 7.5, 8];
const CHARM_COLORS = ["Multicolor", "Silver", "Gold", "RoseGold"];

/* ---------------- HELPERS ---------------- */
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

function normalizeArray(x) {
  return Array.isArray(x) ? x : [];
}

/* ================== COMPONENT ================== */
export default function CharmBraceletPage() {
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null); // "charms" | "chain" | null
  const [metal, setMetal] = useState(METALS[0]);
  const [charmColor, setCharmColor] = useState("Silver");

  const [letterCharms, setLetterCharms] = useState([]);
  const [shapeCharms, setShapeCharms] = useState([]);

  // ✅ one letter style + word
  const [selectedLetterStyle, setSelectedLetterStyle] = useState(null);
  const [letterText, setLetterText] = useState("");

  // ✅ shapes multi-select
  const [selectedShapes, setSelectedShapes] = useState([]);

  // ✅ confirmed selection drives summary
  const [confirmedCharms, setConfirmedCharms] = useState([]);

  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(7);

  // ✅ checkout mode (still same page)
  const [isCheckoutView, setIsCheckoutView] = useState(false);

  const [uiError, setUiError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  // show backend response details after pay
  const [reservedAccessoryID, setReservedAccessoryID] = useState(null);
  const [reservedComputedPrice, setReservedComputedPrice] = useState(null);

  /* ---------------- FETCH CHARMS ---------------- */
  useEffect(() => {
    let mounted = true;

    async function fetchCharms() {
      try {
        const [lettersRes, shapesRes] = await Promise.all([
          fetch(`${API_BASE}/api/charms/letters?color=${charmColor}`),
          fetch(`${API_BASE}/api/charms/shapes?color=${charmColor}`),
        ]);

        if (!lettersRes.ok) throw new Error(`Letters fetch failed (${lettersRes.status})`);
        if (!shapesRes.ok) throw new Error(`Shapes fetch failed (${shapesRes.status})`);

        const lettersData = await lettersRes.json();
        const shapesData = await shapesRes.json();

        if (!mounted) return;
        setLetterCharms(normalizeArray(lettersData));
        setShapeCharms(normalizeArray(shapesData));
      } catch (e) {
        if (!mounted) return;
        console.error("Charm fetch error:", e);
        setLetterCharms([]);
        setShapeCharms([]);
      }
    }

    fetchCharms();
    return () => {
      mounted = false;
    };
  }, [charmColor]);

  /* ---------------- MEMOS ---------------- */
  const chainDbValue = useMemo(() => CHAIN_DB_MAP[selectedChain?.name] || null, [selectedChain]);

  const confirmedLetter = useMemo(
    () => confirmedCharms.find((c) => c.type === "letter-custom") || null,
    [confirmedCharms]
  );

  // estimated total from confirmed charms (DB prices from charm table)
  const estimatedTotal = useMemo(
    () => confirmedCharms.reduce((s, c) => s + safeNum(c.price), 0),
    [confirmedCharms]
  );

  // list to render in summary
  const charmSummaryList = useMemo(() => {
    return confirmedCharms.map((c) => {
      const isLetter = c.type === "letter-custom";
      return {
        key: `${c.charmID}-${c.type || "shape"}`,
        id: c.charmID,
        name: isLetter ? "Letter Charm" : (c.design || "Charm"),
        color: c.color || charmColor,
        text: isLetter ? (c.text || "") : "",
        price: safeNum(c.price),
      };
    });
  }, [confirmedCharms, charmColor]);

  /* ---------------- ACTIONS ---------------- */

  const openCharmsPanel = () => {
    setUiError("");
    setActivePanel("charms");
    setIsCheckoutView(false);
  };

  const openChainPanel = () => {
    setUiError("");
    setActivePanel("chain");
    setIsCheckoutView(false);
  };

  const toggleShape = (charm) => {
    setUiError("");
    setSelectedShapes((prev) =>
      prev.some((c) => c.charmID === charm.charmID)
        ? prev.filter((c) => c.charmID !== charm.charmID)
        : [...prev, charm]
    );
  };

  const selectLetterStyle = (styleObj) => {
    setUiError("");
    // click again to unselect
    if (selectedLetterStyle?.charmID === styleObj.charmID) {
      setSelectedLetterStyle(null);
      setLetterText("");
      return;
    }
    setSelectedLetterStyle(styleObj);
  };

  // ✅ Confirm Selection updates confirmedCharms (summary source of truth)
  const confirmSelection = () => {
    setUiError("");
    setReservedAccessoryID(null);
    setReservedComputedPrice(null);

    const trimmed = letterText.trim().slice(0, 10);

    // must type if letter style selected
    if (selectedLetterStyle && !trimmed) {
      setUiError("If you choose a letter charm style, you must enter text (max 10) before confirming.");
      return;
    }

    const letterCustom = selectedLetterStyle
      ? [
          {
            charmID: selectedLetterStyle.charmID,
            type: "letter-custom",
            design: selectedLetterStyle.design || "letter",
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

  const goToCheckout = () => {
    setUiError("");
    setReservedAccessoryID(null);
    setReservedComputedPrice(null);

    if (confirmedCharms.length === 0) {
      setUiError("Confirm your charms first (open Charms → Confirm Selection).");
      return;
    }

    // if confirmed has letter, must have text
    if (confirmedLetter && !String(confirmedLetter.text || "").trim()) {
      setUiError("Letter charm is confirmed but text is missing. Please edit and enter text (max 10).");
      return;
    }

    setIsCheckoutView(true);
  };

  // Edit design just brings you back to editing (no API called yet, so no cancel needed)
  const editDesign = () => {
    setUiError("");
    setIsCheckoutView(false);
    setActivePanel("charms");
  };

  // ✅ ONLY here we call POST /api/accessory-instance
  const confirmAndPay = async () => {
    setUiError("");

    if (!isCheckoutView) {
      setUiError("Click “Go to Checkout” first.");
      return;
    }

    if (!chainDbValue) {
      setUiError("Invalid chain selected (must be cable/thin/rope/box).");
      return;
    }

    if (confirmedCharms.length === 0) {
      setUiError("No confirmed charms.");
      return;
    }

    if (confirmedLetter && !String(confirmedLetter.text || "").trim()) {
      setUiError("Letter charm selected but text is empty. Please edit design.");
      return;
    }

    setIsPaying(true);

    try {
      // IMPORTANT: backend model expects charms as [{charmID, quantity}]
      // Also reserveAndDecrementCharms expects charmID and optional quantity.
      const charmsPayload = confirmedCharms.map((c) => ({
        charmID: c.charmID,
        quantity: 1,
        // NOTE: backend currently ignores text unless you store it somewhere else.
        // Keeping it here is harmless for future use.
        text: c.type === "letter-custom" ? (c.text || null) : null,
      }));

      const payload = {
        type: "bracelet",
        metal: metal.api, // controller resolves materialID from metal
        nbOfCharms: confirmedCharms.length,
        nbOfStones: 0,
        product: {
          chain: chainDbValue,          // ✅ required by DB constraint
          style: BRACELET_DB_STYLE,     // ✅ required by DB constraint
          length: selectedLength,
          // extra info (safe)
          charmColor,
          letterText: confirmedLetter?.text || null,
          letterStyleCharmID: confirmedLetter?.charmID || null,
        },
        charms: charmsPayload, // ✅ MUST be objects (not array of ids)
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
        const msg = data?.sqlMessage || data?.error || data?.message || `Failed (${res.status})`;
        throw new Error(msg);
      }

      const accessoryID = data?.accessoryID || null;
      const computedPrice = data?.computedPrice ?? null;

      setReservedAccessoryID(accessoryID);
      setReservedComputedPrice(computedPrice);

      // add to cart ONCE
      addToLocalCartOnce({
        accessoryID,
        type: "bracelet",
        style: BRACELET_DB_STYLE,
        metal: metal.name,
        metalApi: metal.api,
        chain: selectedChain.name,
        chainDb: chainDbValue,
        length: selectedLength,
        charmColor,
        charms: confirmedCharms,
        // prefer backend computed price (material + charms)
        price: computedPrice ?? estimatedTotal,
      });

      // navigate after adding to cart
      navigate(ORDER_PAGE_ROUTE);
    } catch (e) {
      console.error(e);
      setUiError(e.message || "Confirm & Pay failed.");
    } finally {
      setIsPaying(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="nk-page nk-charmPage">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Charm Bracelet</h2>
          <p className="nk-subtitle">Design → Go to Checkout (no API) → Confirm & Pay (API + cart).</p>
        </header>

        {uiError && (
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
        )}

        <div className="nk-customizer">
          {/* LEFT SUMMARY */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">{isCheckoutView ? "Checkout Summary" : "Order Summary"}</span>
              </div>

              {/* Preview images */}
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
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  ))
                )}
              </div>

              {/* Summary meta */}
              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Metal</span>
                  <strong>{metal.name}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Charm Color</span>
                  <strong>{charmColor}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Chain</span>
                  <strong>{selectedChain.name}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Length</span>
                  <strong>{selectedLength}"</strong>
                </div>

                <div className="nk-metaRow">
                  <span>Charms</span>
                  <strong>{confirmedCharms.length}</strong>
                </div>

                {/* Charm list */}
                {confirmedCharms.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontWeight: 800, marginBottom: 6 }}>Charm List</div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {charmSummaryList.map((it) => (
                        <div
                          key={it.key}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: 12,
                            background: "rgba(0,0,0,0.05)",
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: 800 }}>{it.name}</span>
                            <span style={{ fontSize: 12, opacity: 0.8 }}>
                              ID: {it.id} • Color: {it.color}
                              {it.text ? ` • Text: ${it.text}` : ""}
                            </span>
                          </div>
                          <div style={{ fontWeight: 900 }}>${safeNum(it.price).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="nk-metaRow" style={{ marginTop: 10 }}>
                  <span>Total (estimated)</span>
                  <strong>${estimatedTotal.toFixed(2)}</strong>
                </div>

                {reservedAccessoryID && (
                  <div className="nk-metaRow">
                    <span>Accessory ID</span>
                    <strong>{reservedAccessoryID}</strong>
                  </div>
                )}
                {reservedComputedPrice != null && (
                  <div className="nk-metaRow">
                    <span>Computed Price</span>
                    <strong>${safeNum(reservedComputedPrice).toFixed(2)}</strong>
                  </div>
                )}
              </div>

              {/* Checkout actions (same page) */}
              {isCheckoutView ? (
                <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                  <button className="nk-rowBtn" type="button" onClick={editDesign}>
                    Edit Design
                  </button>
                  <button
                    className="nk-next"
                    type="button"
                    onClick={confirmAndPay}
                    disabled={isPaying}
                  >
                    {isPaying ? "Processing..." : "Confirm & Pay"}
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          {/* RIGHT CONTROLS */}
          <section className="nk-controls">
            {/* Metal */}
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

            {/* Charm color */}
            <div className="nk-section">
              <label className="nk-label">Charm Color</label>
              <select
                className="nk-input"
                value={charmColor}
                onChange={(e) => {
                  setUiError("");
                  setCharmColor(e.target.value);
                  setIsCheckoutView(false);
                  // NOTE: we do NOT reset your selections automatically here
                  // If you want: uncomment next lines
                  // setSelectedLetterStyle(null); setLetterText("");
                  // setSelectedShapes([]); setConfirmedCharms([]);
                }}
              >
                {CHARM_COLORS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button className="nk-rowBtn" type="button" onClick={openCharmsPanel}>
              Charms
            </button>

            <button className="nk-rowBtn" type="button" onClick={openChainPanel}>
              Chain & Length
            </button>

            <button className="nk-next" type="button" onClick={goToCheckout}>
              Go to Checkout
            </button>
          </section>

          {/* PANEL + OVERLAY */}
          {activePanel && <div className="nk-overlay" onClick={() => setActivePanel(null)} />}

          <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
            <div className="nk-panelHeader">
              <h3>{activePanel === "charms" ? "Select Charms" : "Chain & Length"}</h3>
              <button type="button" onClick={() => setActivePanel(null)}>
                Close
              </button>
            </div>

            <div className="nk-panelBody">
              {activePanel === "charms" && (
                <>
                  {/* LETTERS */}
                  <h4>Letter Charm Style (choose 1)</h4>
                  <div className="nk-grid">
                    {letterCharms.map((c) => (
                      <button
                        key={c.charmID}
                        type="button"
                        className={`nk-cardPick ${
                          selectedLetterStyle?.charmID === c.charmID ? "isActive" : ""
                        }`}
                        onClick={() => selectLetterStyle(c)}
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design || "letter"} />
                        <small>{String(c.design || "").replace("letter ", "")}</small>
                      </button>
                    ))}
                  </div>

                  {/* text required if letter selected */}
                  {selectedLetterStyle && (
                    <div style={{ marginTop: 12 }}>
                      <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>
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

                  {/* SHAPES */}
                  <h4 style={{ marginTop: 18 }}>Shape Charms</h4>
                  <div className="nk-grid">
                    {shapeCharms.map((c) => (
                      <button
                        key={c.charmID}
                        type="button"
                        className={`nk-cardPick ${
                          selectedShapes.some((x) => x.charmID === c.charmID) ? "isActive" : ""
                        }`}
                        onClick={() => toggleShape(c)}
                      >
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design || "shape"} />
                      </button>
                    ))}
                  </div>

                  {/* Confirm selection */}
                  <div style={{ marginTop: 14 }}>
                    <button className="nk-confirm" type="button" onClick={confirmSelection}>
                      Confirm Selection
                    </button>
                  </div>
                </>
              )}

              {activePanel === "chain" && (
                <>
                  <h4>Chain</h4>
                  <div className="nk-chainGrid">
                    {CHAINS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedChain(c);
                        }}
                      >
                        <img src={c.img} alt={c.name} />
                        <strong>{c.name}</strong>
                      </button>
                    ))}
                  </div>

                  <h4>Length</h4>
                  <div className="nk-lengths">
                    {LENGTHS.map((l) => (
                      <button
                        key={l}
                        type="button"
                        className={`nk-lengthBtn ${selectedLength === l ? "isActive" : ""}`}
                        onClick={() => {
                          setUiError("");
                          setSelectedLength(l);
                        }}
                      >
                        {l}"
                      </button>
                    ))}
                  </div>

                  <img src={LengthImg} alt="Length guide" />
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
