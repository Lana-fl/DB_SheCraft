import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";
import "../styles/charmNecklace.css";
import { useCart } from "../context/CartContext";

/* ================= ASSETS ================= */
import HoopRound from "../assets/Earring/hoopwithcharm.jpeg";
import HoopSquare from "../assets/Earring/hoopsquarewithgem.png";
import Dangling from "../assets/Earring/danglingwithcharm.jpeg";

/* ================= API ================= */
const API_BASE = "http://localhost:5000";
const ORDER_PAGE_ROUTE = "/orderpage";

/* ================= DATA ================= */
const EARRING_STYLES = [
  { name: "Hoop Round", img: HoopRound },
  { name: "Hoop Square", img: HoopSquare },
  { name: "Dangling", img: Dangling },
];

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "RoseGold" },
];

const CHARM_COLORS = ["Multicolor", "Silver", "Gold", "RoseGold"];

const NECKLACE_DB_STYLE = "free charm"; // you can rename for earrings if needed

function safeNum(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

export default function EarringCharmPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activePanel, setActivePanel] = useState(null);
  const [metal, setMetal] = useState(METALS[0]);
  const [charmColor, setCharmColor] = useState("Gold");
  const [letterCharms, setLetterCharms] = useState([]);
  const [shapeCharms, setShapeCharms] = useState([]);
  const [selectedLetterStyle, setSelectedLetterStyle] = useState(null);
  const [letterText, setLetterText] = useState("");
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [confirmedCharms, setConfirmedCharms] = useState([]);
  const [selectedEarringStyle, setSelectedEarringStyle] = useState(EARRING_STYLES[0]);
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [uiError, setUiError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  /* ---------------- FETCH CHARMS ---------------- */
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

  /* ---------------- HELPERS ---------------- */
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

  const confirmSelection = () => {
    setUiError("");
    const trimmed = letterText.trim().slice(0, 10);

    if (selectedLetterStyle && !trimmed) {
      setUiError("Enter the letters/word (max 10) before confirming a letter charm.");
      return;
    }

    const letterCustom = selectedLetterStyle
      ? [
          {
            charmID: selectedLetterStyle.charmID,
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
    setIsCheckoutView(true);
  };

  const editDesign = () => {
    setUiError("");
    setIsCheckoutView(false);
    setActivePanel("charms");
  };

  const estimatedTotal = useMemo(() => {
    return confirmedCharms.reduce((sum, c) => sum + safeNum(c.price), 0);
  }, [confirmedCharms]);

  const charmSummaryList = useMemo(() => {
    return confirmedCharms.map((c) => {
      const extra = c.type === "letter-custom" ? ` (Text: ${c.text || ""})` : "";
      return {
        key: `${c.charmID}-${c.type || "shape"}`,
        id: c.charmID,
        label: `${c.design}${extra}`,
        color: c.color || charmColor,
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
    if (letterInConfirmed && !letterInConfirmed.text?.trim()) {
      setUiError("Letter charm requires text (max 10).");
      return;
    }

    setIsPaying(true);
    try {
      const payload = {
        type: "earring",
        metal: metal.api,
        nbOfCharms: confirmedCharms.length,
        nbOfStones: 0,
        product: {
          style: selectedEarringStyle.name,
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
      if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);

      addToCart({
        accessoryID: data.accessoryID,
        type: "earring",
        metal: metal.name,
        price: data.computedPrice ?? estimatedTotal,
        summary: {
          style: selectedEarringStyle.name,
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
      console.error(err);
      setUiError(err.message || "Confirm & Pay failed.");
    } finally {
      setIsPaying(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="nk-page nk-charmPage">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Customize Your Charm Earrings</h2>
          <p className="nk-subtitle">Pick style first, then build your design, then review and Confirm & Pay.</p>
        </header>

        {uiError && <div className="nk-error">{uiError}</div>}

        <div className="nk-customizer" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
          {/* LEFT: PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <span className="nk-badge">{isCheckoutView ? "Checkout Summary" : "Order Summary"}</span>
              <div className="nk-imageWrap nk-charmPreview">
                <img src={selectedEarringStyle.img} alt={selectedEarringStyle.name} className="nk-chainImg" />
                {confirmedCharms.map((c) => (
                  <img key={c.key} src={`${API_BASE}${c.photoURL}`} alt={c.design} className="nk-charmImg" />
                ))}
                {confirmedCharms.length === 0 && <p className="nk-placeholder">No charms confirmed yet.</p>}
              </div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow"><span>Style</span><strong>{selectedEarringStyle.name}</strong></div>
                <div className="nk-metaRow"><span>Metal</span><strong>{metal?.name || "—"}</strong></div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Charms</div>
                  {charmSummaryList.length === 0 ? <div style={{ opacity: 0.8 }}>—</div> :
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {charmSummaryList.map((x) => <li key={x.key}><strong>{x.id}</strong> — {x.label} — <em>{x.color}</em></li>)}
                    </ul>}
                </div>

                <div className="nk-metaRow" style={{ marginTop: 10 }}>
                  <span>Total (estimated)</span>
                  <strong>${estimatedTotal.toFixed(2)}</strong>
                </div>
                

                {isCheckoutView && (
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <button className="nk-next" type="button" onClick={confirmAndPay} disabled={isPaying} style={{ flex: 1 }}>
                      {isPaying ? "Processing..." : "Confirm and Pay"}
                      onClick={() => navigate("/orderpage")}
                    </button>
                    <button type="button" onClick={editDesign} className="nk-editBtn">Edit Design</button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT: CONTROLS */}
          <section className="nk-controls">
            <div className="nk-section nk-styleSelection">
              <label className="nk-label">Earring Style</label>
              <div className="nk-styleRow">
                {EARRING_STYLES.map((s) => (
                  <button key={s.name} className={`nk-cardPick ${selectedEarringStyle.name === s.name ? "isActive" : ""}`} onClick={() => { setUiError(""); setSelectedEarringStyle(s); setIsCheckoutView(false); }} type="button">
                    <img src={s.img} alt={s.name} />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button key={m.name} className={`nk-metalBtn ${metal.name === m.name ? "isActive" : ""}`} onClick={() => { setUiError(""); setMetal(m); setIsCheckoutView(false); }} type="button">
                    <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="nk-section">
              <label className="nk-label">Charm Color</label>
              <select className="nk-input" value={charmColor} onChange={(e) => { setUiError(""); setCharmColor(e.target.value); setIsCheckoutView(false); }}>
                {CHARM_COLORS.map((c) => (<option key={c}>{c}</option>))}
              </select>
            </div>

            <button className="nk-rowBtn" onClick={() => { setUiError(""); setActivePanel("charms"); setIsCheckoutView(false); }} type="button">
              <span>Charms</span>
              <span>{confirmedCharms.length || "Select"}</span>
            </button>

            <button className="nk-next" onClick={goToCheckoutView} type="button">Go to Checkout</button>
          </section>

          {/* SIDE PANEL */}
          <aside className={`nk-panel ${activePanel ? "open" : ""}`}>
            <div className="nk-panelHeader">
              <h3>{activePanel === "charms" ? "Select Your Charms" : ""}</h3>
              <button onClick={() => setActivePanel(null)} type="button">Close</button>
            </div>
            <div className="nk-panelBody">
              {activePanel === "charms" && (
                <>
                  <h4>Letter Charm Style (choose 1)</h4>
                  <div className="nk-grid">
                    {letterCharms.map((c) => (
                      <button key={c.charmID} className={`nk-cardPick ${selectedLetterStyle?.charmID === c.charmID ? "isActive" : ""}`} onClick={() => selectLetterStyleFn(c)} type="button">
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                        <small>{(c.design || "").replace("letter ", "")}</small>
                      </button>
                    ))}
                  </div>

                  {selectedLetterStyle && (
                    <div style={{ marginTop: 12 }}>
                      <label style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>Enter your word (max 10)</label>
                      <input className="nk-input" value={letterText} onChange={(e) => { setUiError(""); setLetterText(e.target.value.slice(0, 10)); }} maxLength={10} placeholder="e.g. NICOLE" />
                    </div>
                  )}

                  <h4 style={{ marginTop: 18 }}>Shape Charms</h4>
                  <div className="nk-grid">
                    {shapeCharms.map((c) => (
                      <button key={c.charmID} className={`nk-cardPick ${selectedShapes.some((x) => x.charmID === c.charmID) ? "isActive" : ""}`} onClick={() => toggleShape(c)} type="button">
                        <img src={`${API_BASE}${c.photoURL}`} alt={c.design} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {activePanel === "charms" && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" onClick={confirmSelection} type="button">Confirm Selection</button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={() => setActivePanel(null)} />}
        </div>
      </div>
    </div>
  );
}
