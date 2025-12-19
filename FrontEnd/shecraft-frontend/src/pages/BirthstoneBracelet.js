import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/necklace.css";

/* chain/length assets */
import LengthImg from "../assets/Bracelet/length.jpg";
import Cable from "../assets/chains/cable.png";
import Rope from "../assets/chains/rope.jpg";
import Box from "../assets/chains/box.jpg";
import Thin from "../assets/chains/thin.png";


import GemImg from "../assets/gems/birthstone.jpeg";
import ColorPreviewImg from "../assets/Bracelet/birthstone.png";


import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const API_BASE = "http://localhost:5000";


const CHAIN_DB_MAP = { Cable: "cable", Rope: "rope", Box: "box", Thin: "thin" };


const BIRTHSTONE_BRACELET_DB_STYLE = "birthstone";

const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "Rose Gold" },
];

const CHAINS = [
  { name: "Cable", img: Cable },
  { name: "Rope", img: Rope },
  { name: "Box", img: Box },
  { name: "Thin", img: Thin },
];

const LENGTHS = [6, 6.5, 7, 7.5];

const CUTS = [
  { key: "Round", img: CutRound },
  { key: "Oval", img: CutOval },
  { key: "Pear", img: CutPear },
  { key: "Princess", img: CutPrincess },
];

function norm(s) {
  return String(s || "").trim().toLowerCase();
}

/** tries to pick the “best” stone row for the selected cut */
function pickStoneForCut(stones, selectedCut) {
  if (!Array.isArray(stones) || stones.length === 0) return null;
  if (!selectedCut) return stones[0];

  const want = norm(selectedCut);

  const match = stones.find((st) => {
    const candidates = [
      st.cut,
      st.shape,
      st.stoneCut,
      st.cutType,
      st.cutName,
      st.type,
    ]
      .map(norm)
      .filter(Boolean);

    return candidates.some((c) => c.includes(want) || want.includes(c));
  });

  return match || stones[0];
}

export default function BirthstoneBracelet() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

 
  const [activePanel, setActivePanel] = useState(null); // "chainLength" | null

  // data
  const [allBirthstones, setAllBirthstones] = useState([]); // raw B* stones

  // selections
  const [selectedMonth, setSelectedMonth] = useState(null); // string month
  const [monthStones, setMonthStones] = useState([]); // all stones for selected month
  const [availableColors, setAvailableColors] = useState([]); // unique colors for month [{label, hex, price}]
  const [selectedColor, setSelectedColor] = useState(null); // {label, hex, price}
  const [selectedColorStones, setSelectedColorStones] = useState([]); // stones filtered by color

  const [selectedCut, setSelectedCut] = useState(null);
  const [metal, setMetal] = useState(METALS[0].color);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);
  const [selectedLength, setSelectedLength] = useState(16);

 
  const [uiError, setUiError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");
  const [addedAccessoryID, setAddedAccessoryID] = useState(null);
  const [lastComputedPrice, setLastComputedPrice] = useState(null);

  useEffect(() => {
    const fetchBirthstones = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/stones`);
        const data = await res.json();

        const filtered = Array.isArray(data)
          ? data.filter((s) => typeof s.stoneID === "string" && s.stoneID.startsWith("B"))
          : [];

        setAllBirthstones(filtered);
      } catch (err) {
        console.error("Failed to fetch birthstones:", err);
        setAllBirthstones([]);
      }
    };

    fetchBirthstones();
  }, []);

  const months = useMemo(() => {
    const uniqueMonths = new Set();

    for (const s of allBirthstones) {
      if (typeof s.gem === "string" && s.gem.trim() !== "") {
        uniqueMonths.add(s.gem.trim());
      }
    }

    return Array.from(uniqueMonths);
  }, [allBirthstones]);

  const closePanel = () => setActivePanel(null);
  const togglePanel = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  // Month pick: load month stones + unique colors
  const onPickMonth = (month) => {
    setSelectedMonth(month);
    setSelectedColor(null);
    setSelectedCut(null);
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);

    const stones = allBirthstones.filter((s) => (s.gem || "").trim() === month);
    setMonthStones(stones);

    const unique = new Map();
    for (const st of stones) {
      const hex = (st.colorHex || "").trim();
      if (!hex) continue;
      if (!unique.has(hex)) {
        unique.set(hex, {
          label: st.color || "Color",
          hex: hex,
          price: st.price ?? 0,
        });
      }
    }
    const colors = Array.from(unique.values());
    setAvailableColors(colors);

    setSelectedColorStones([]);
  };

  // Color pick: filter monthStones -> selectedColorStones
  const onPickColor = (c) => {
    setSelectedColor(c);
    const filtered = monthStones.filter((s) => (s.colorHex || "").trim() === c.hex);
    setSelectedColorStones(filtered);

    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);
  };

  const metalObj = useMemo(
    () => METALS.find((m) => m.color === metal) || METALS[0],
    [metal]
  );

  const chainDbValue = useMemo(
    () => CHAIN_DB_MAP[selectedChain?.name] || null,
    [selectedChain]
  );

  const canProceed =
    !!selectedMonth &&
    !!selectedColor &&
    !!selectedCut &&
    !!metal &&
    !!selectedChain &&
    !!selectedLength &&
    !!chainDbValue;

  // stone price to display (you asked: show price for stones below)
  const stonePrice =
    selectedColor?.price ??
    selectedColorStones?.[0]?.price ??
    monthStones?.[0]?.price ??
    0;


  const shownTotal = Number(stonePrice || 0);

 
  const addToCartNow = async () => {
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);

    if (!canProceed) {
      setUiError("Required: Month, Color, Cut, Metal, Chain, Length.");
      return;
    }

    const chosenStone = pickStoneForCut(selectedColorStones, selectedCut);
    if (!chosenStone?.stoneID) {
      setUiError("No stone found for this selection. Please pick a different color/cut.");
      return;
    }

    setIsAdding(true);
    try {
      const payload = {
        type: "bracelet",
        metal: metalObj.api, 
        nbOfCharms: 0,
        nbOfStones: 1,
        product: {
          chain: chainDbValue,
          style: BIRTHSTONE_BRACELET_DB_STYLE, 
          length: selectedLength,

          // optional extras (safe)
          birthstoneMonth: selectedMonth,
          birthstoneColor: selectedColor?.label,
          birthstoneColorHex: selectedColor?.hex,
          birthstoneCut: selectedCut,
        },
        charms: [],
        stones: [{ stoneID: chosenStone.stoneID, quantity: 1 }],
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
        type: "bracelet",
        style: BIRTHSTONE_BRACELET_DB_STYLE,
        metal: metalObj.name,
        chain: selectedChain.name,
        chainDb: chainDbValue,
        length: selectedLength,

        // birthstone summary for cart display
        summary: {
          birthstone: {
            month: selectedMonth,
            color: selectedColor,
            cut: selectedCut,
            stoneID: chosenStone.stoneID,
          },
        },

        // use backend price when available
        price: computedPrice ?? shownTotal,
      });

      setAddedAccessoryID(accessoryID);
      setLastComputedPrice(computedPrice ?? null);
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
          <h2>Birthstone Bracelet</h2>
          <p className="nk-subtitle">Select Month → Color → Cut → Metal → Chain & Length.</p>
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
                <span className="nk-chip">{metalObj.name}</span>
              </div>

              <div className="nk-imageWrap">
                <img src={GemImg} alt="Bracelet preview" className="nk-mainImg" />
              </div>

              <div className="nk-imageWrap" style={{ marginTop: 12 }}>
                <img
                  src={ColorPreviewImg}
                  alt="Gem color preview"
                  className="nk-mainImg"
                />
              </div>

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Month</span>
                  <strong>{selectedMonth || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Color</span>
                  <strong>
                    {selectedColor ? (
                      <span style={{ color: selectedColor.hex }}>{selectedColor.label}</span>
                    ) : (
                      "—"
                    )}
                  </strong>
                </div>
                <div className="nk-metaRow">
                  <span>Cut</span>
                  <strong>{selectedCut || "—"}</strong>
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
                  <span>Stone price</span>
                  <strong>${Number(stonePrice || 0).toFixed(2)}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Total</span>
                  <strong>
                    {lastComputedPrice != null
                      ? `$${Number(lastComputedPrice).toFixed(2)}`
                      : `$${Number(shownTotal).toFixed(2)}`}
                  </strong>
                </div>

                {addedMsg ? (
                  <div className="nk-metaRow">
                    <span>Status</span>
                    <strong style={{ color: "#1a7f37" }}>
                      {addedMsg}
                      {addedAccessoryID ? ` • ID: ${addedAccessoryID}` : ""}
                    </strong>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* RIGHT CONTROLS */}
          <section className="nk-controls">
            {/* MONTH FIRST */}
            <div className="nk-section">
              <label className="nk-label">Month</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`nk-cardPick ${selectedMonth === m ? "isActive" : ""}`}
                    onClick={() => onPickMonth(m)}
                  >
                    <div className="nk-cardText">
                      <strong>{m}</strong>
                      <span>Tap to select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* COLORS AFTER MONTH */}
            {selectedMonth && (
              <div className="nk-section">
                <label className="nk-label">Gem Color</label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {availableColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => onPickColor(c)}
                      className={`nk-metalBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        padding: 0,
                      }}
                      title={`${c.label} ($${c.price})`}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                          border: "2px solid rgba(0,0,0,0.08)",
                          display: "inline-block",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {selectedColor && (
                  <p className="nk-help" style={{ marginTop: 10 }}>
                    Selected:{" "}
                    <strong style={{ color: selectedColor.hex }}>{selectedColor.label}</strong> ·{" "}
                    <strong>${Number(stonePrice || 0).toFixed(2)}</strong>
                  </p>
                )}
              </div>
            )}

            {/* CUT */}
            <div className="nk-section">
              <label className="nk-label">Cut</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                {CUTS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`nk-cardPick ${selectedCut === c.key ? "isActive" : ""}`}
                    onClick={() => {
                      setSelectedCut(c.key);
                      setUiError("");
                      setAddedMsg("");
                      setAddedAccessoryID(null);
                      setLastComputedPrice(null);
                    }}
                  >
                    <img src={c.img} alt={c.key} className="nk-cardImg" />
                    <div className="nk-cardText">
                      <strong>{c.key}</strong>
                      <span>Tap to select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* METAL */}
            <div className="nk-section">
              <label className="nk-label">Metal</label>
              <div className="nk-metals">
                {METALS.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`nk-metalBtn ${metal === m.color ? "isActive" : ""}`}
                    onClick={() => {
                      setMetal(m.color);
                      setUiError("");
                      setAddedMsg("");
                      setAddedAccessoryID(null);
                      setLastComputedPrice(null);
                    }}
                  >
                    <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
                    <span className="nk-metalName">{m.name}</span>
                  </button>
                ))}
              </div>

              {/* ✅ show stone + total price BELOW (as you requested) */}
              <div style={{ marginTop: 10 }}>
                <p className="nk-help" style={{ margin: 0 }}>
                  Stone price: <strong>${Number(stonePrice || 0).toFixed(2)}</strong>
                </p>
                <p className="nk-help" style={{ margin: 0 }}>
                  Total:{" "}
                  <strong>
                    {lastComputedPrice != null
                      ? `$${Number(lastComputedPrice).toFixed(2)}`
                      : `$${Number(shownTotal).toFixed(2)}`}
                  </strong>
                  {lastComputedPrice == null ? (
                    <span style={{ opacity: 0.7 }}> (final total returned when you add)</span>
                  ) : null}
                </p>
              </div>
            </div>

            {/* Chain & Length (right tab like necklace page) */}
            <button
              type="button"
              className={`nk-rowBtn ${activePanel === "chainLength" ? "open" : ""}`}
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

            {/* ✅ Replace checkout flow with Add to Cart */}
            <button
              className="nk-next"
              type="button"
              onClick={addToCartNow}
              disabled={!canProceed || isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>

            {!canProceed && (
              <p className="nk-help" style={{ color: "#b00020" }}>
                Required: Month, Color, Cut, Metal, Chain, Length.
              </p>
            )}

            {/* optional: View Cart quick link */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              style={{
                marginTop: 10,
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
          </section>

          {/* RIGHT SLIDE PANEL (Chain & Length) */}
          <aside className={`nk-panel ${activePanel ? "open" : ""}`} aria-hidden={!activePanel}>
            <div className="nk-panelHeader">
              <div>
                <h3 className="nk-panelTitle">Chain & Length</h3>
                <p className="nk-panelSub">Choose the chain type and length.</p>
              </div>

              <button type="button" className="nk-close" onClick={closePanel}>
                Close
              </button>
            </div>

            <div className="nk-panelBody">
              <h4 className="nk-panelSectionTitle">Chain Type</h4>
              <div className="nk-chainGrid">
                {CHAINS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`nk-chainCard ${selectedChain.name === c.name ? "isActive" : ""}`}
                    onClick={() => {
                      setSelectedChain(c);
                      setUiError("");
                      setAddedMsg("");
                      setAddedAccessoryID(null);
                      setLastComputedPrice(null);
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
                    className={`nk-lengthBtn ${selectedLength === len ? "isActive" : ""}`}
                    onClick={() => {
                      setSelectedLength(len);
                      setUiError("");
                      setAddedMsg("");
                      setAddedAccessoryID(null);
                      setLastComputedPrice(null);
                    }}
                  >
                    {len}"
                  </button>
                ))}
              </div>

              <div className="nk-lengthPreview">
                <img src={LengthImg} alt="Length Guide" className="nk-lengthImg" />
              </div>
            </div>

            {activePanel && (
              <div className="nk-panelFooter">
                <button className="nk-confirm" type="button" onClick={closePanel}>
                  Confirm Selection
                </button>
              </div>
            )}
          </aside>

          {activePanel && <div className="nk-overlay" onClick={closePanel} />}
        </div>
      </div>
    </div>
  );
}

