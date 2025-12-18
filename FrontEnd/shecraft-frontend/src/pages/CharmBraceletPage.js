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

/* ================== COMPONENT ================== */
export default function CharmBraceletPage() {
  const navigate = useNavigate();

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
  const [selectedLength, setSelectedLength] = useState(7);

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

        if (!lettersRes.ok || !shapesRes.ok) {
          throw new Error("Charm fetch failed");
        }

        setLetterCharms(await lettersRes.json());
        setShapeCharms(await shapesRes.json());
      } catch {
        setLetterCharms([]);
        setShapeCharms([]);
      }
    }
    fetchCharms();
  }, [charmColor]);

  /* ---------------- MEMOS ---------------- */
  const letterInConfirmed = useMemo(
    () => confirmedCharms.find((c) => c.type === "letter-custom"),
    [confirmedCharms]
  );

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name],
    [selectedChain]
  );

  const estimatedTotal = useMemo(
    () => confirmedCharms.reduce((s, c) => s + safeNum(c.price), 0),
    [confirmedCharms]
  );

  const charmSummaryList = useMemo(
    () =>
      confirmedCharms.map((c) => ({
        key: `${c.charmID}-${c.type || "shape"}`,
        id: c.charmID,
        label:
          c.type === "letter-custom"
            ? `${c.design} (Text: ${c.text})`
            : c.design,
        color: c.color || charmColor,
      })),
    [confirmedCharms, charmColor]
  );

  /* ---------------- ACTIONS ---------------- */
  const toggleShape = (charm) => {
    setSelectedShapes((prev) =>
      prev.some((c) => c.charmID === charm.charmID)
        ? prev.filter((c) => c.charmID !== charm.charmID)
        : [...prev, charm]
    );
  };

  const confirmSelection = () => {
    const trimmed = letterText.trim();
    if (selectedLetterStyle && !trimmed) {
      setUiError("Enter text for letter charm");
      return;
    }

    const letterCustom = selectedLetterStyle
      ? [
          {
            ...selectedLetterStyle,
            type: "letter-custom",
            text: trimmed,
            color: charmColor,
          },
        ]
      : [];

    setConfirmedCharms([...selectedShapes, ...letterCustom]);
    setActivePanel(null);
    setIsCheckoutView(false);
  };

  const confirmAndPay = async () => {
    if (!isCheckoutView) return;
    setIsPaying(true);

    try {
      const payload = {
        type: "bracelet",
        metal: metal.api,
        nbOfCharms: confirmedCharms.length,
        nbOfStones: 0,
        product: {
          chain: chainDbValue,
          style: BRACELET_DB_STYLE,
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

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);

      addToLocalCartOnce({
        accessoryID: data.accessoryID,
        type: "bracelet",
        style: "free charm",
        metal: metal.name,
        chain: selectedChain.name,
        length: selectedLength,
        charmColor,
        charms: confirmedCharms,
        price: data.computedPrice ?? estimatedTotal,
      });

      navigate(ORDER_PAGE_ROUTE);
    } catch (e) {
      setUiError(e.message);
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
          <p className="nk-subtitle">
            Build your design, then review summary, then Confirm & Pay.
          </p>
        </header>

        {uiError && (
          <div className="nk-error">{uiError}</div>
        )}

        <div className="nk-customizer">
          {/* LEFT PREVIEW */}
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
                      key={`${c.charmID}-${c.type}`}
                      src={`${API_BASE}${c.photoURL}`}
                      alt={c.design}
                      className="nk-charmImg"
                    />
                  ))
                )}
              </div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Metal</span>
                  <strong>{metal.name}</strong>
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
                  <span>Total</span>
                  <strong>${estimatedTotal.toFixed(2)}</strong>
                </div>
              </div>

              {isCheckoutView && (
                <button
                  className="nk-next"
                  onClick={confirmAndPay}
                  disabled={isPaying}
                >
                  {isPaying ? "Processing..." : "Confirm and Pay"}
                </button>
              )}
            </div>
          </section>

          {/* RIGHT CONTROLS */}
          <section className="nk-controls">
            <button className="nk-rowBtn" onClick={() => setActivePanel("charms")}>
              Charms
            </button>
            <button className="nk-rowBtn" onClick={() => setActivePanel("chain")}>
              Chain & Length
            </button>
            <button className="nk-next" onClick={() => setIsCheckoutView(true)}>
              Go to Checkout
            </button>
          </section>

          {/* PANEL */}
          {activePanel && (
            <aside className="nk-panel open">
              <div className="nk-panelHeader">
                <h3>{activePanel === "charms" ? "Charms" : "Chain & Length"}</h3>
                <button onClick={() => setActivePanel(null)}>Close</button>
              </div>

              <div className="nk-panelBody">
                {activePanel === "chain" && (
                  <>
                    <h4>Chain</h4>
                    <div className="nk-chainGrid">
                      {CHAINS.map((c) => (
                        <button
                          key={c.name}
                          className={`nk-chainCard ${
                            selectedChain.name === c.name ? "isActive" : ""
                          }`}
                          onClick={() => setSelectedChain(c)}
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
                          className={`nk-lengthBtn ${
                            selectedLength === l ? "isActive" : ""
                          }`}
                          onClick={() => setSelectedLength(l)}
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
          )}
        </div>
      </div>
    </div>
  );
}
