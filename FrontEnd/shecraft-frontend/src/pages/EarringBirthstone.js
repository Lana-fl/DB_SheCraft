import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/necklace.css";

/* preview images */
import GemColorPreviewImg from "../assets/gems/birthstone.jpeg";
import EarringPreviewImg from "../assets/Earring/birthstoneearing.jpg";

/* cut images */
import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const API_BASE = "http://localhost:5000";
const EARRING_DB_STYLE = "birthstone";

/* METALS — SAME STRUCTURE AS BRACELET */
const METALS = [
  { name: "Silver", color: "#C0C0C0", api: "Silver" },
  { name: "Gold", color: "#FFD700", api: "Gold" },
  { name: "Rose Gold", color: "#B76E79", api: "Rose Gold" },
];

/* BACKINGS — value = DB, name = UI */
const BACKINGS = [
  { name: "Screw Back", value: "screw" },
  { name: "Clasp Back", value: "clasp" },
];

/* CUTS */
const CUTS = [
  { key: "Round", img: CutRound },
  { key: "Oval", img: CutOval },
  { key: "Pear", img: CutPear },
  { key: "Princess", img: CutPrincess },
];

/* helpers */
const norm = (s) => String(s || "").trim().toLowerCase();

function pickStoneForCut(stones, selectedCut) {
  if (!Array.isArray(stones) || stones.length === 0) return null;
  if (!selectedCut) return stones[0];

  const want = norm(selectedCut);

  return (
    stones.find((st) =>
      [st.cut, st.shape, st.cutType, st.type]
        .map(norm)
        .filter(Boolean)
        .some((c) => c.includes(want) || want.includes(c))
    ) || stones[0]
  );
}

export default function BirthstoneEarring() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /* DATA */
  const [allBirthstones, setAllBirthstones] = useState([]);

  /* SELECTIONS */
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthStones, setMonthStones] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorStones, setSelectedColorStones] = useState([]);

  const [selectedCut, setSelectedCut] = useState(null);
  const [metal, setMetal] = useState(METALS[0].color);
  const [backing, setBacking] = useState(null); // 🔥 STORES "screw" | "clasp"

  /* UI FEEDBACK (same as bracelet) */
  const [uiError, setUiError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");
  const [addedAccessoryID, setAddedAccessoryID] = useState(null);
  const [lastComputedPrice, setLastComputedPrice] = useState(null);

  /* FETCH STONES */
  useEffect(() => {
    fetch(`${API_BASE}/api/stones`)
      .then((res) => res.json())
      .then((data) => {
        const birthstones = Array.isArray(data)
          ? data.filter((s) => s.stoneID?.startsWith("B"))
          : [];
        setAllBirthstones(birthstones);
      })
      .catch((err) => console.error("Fetch stones error:", err));
  }, []);

  /* MONTHS */
  const months = useMemo(() => {
    const set = new Set();
    allBirthstones.forEach((s) => s.gem && set.add(s.gem));
    return Array.from(set);
  }, [allBirthstones]);

  /* PICK MONTH */
  const onPickMonth = (month) => {
    setSelectedMonth(month);
    setSelectedColor(null);
    setSelectedCut(null);
    setSelectedColorStones([]);
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);

    const stones = allBirthstones.filter((s) => s.gem === month);
    setMonthStones(stones);

    const map = new Map();
    stones.forEach((s) => {
      if (s.colorHex && !map.has(s.colorHex)) {
        map.set(s.colorHex, {
          label: s.color,
          hex: s.colorHex,
          price: s.price ?? 0,
        });
      }
    });

    setAvailableColors(Array.from(map.values()));
  };

  /* PICK COLOR */
  const onPickColor = (c) => {
    setSelectedColor(c);
    setSelectedColorStones(
      monthStones.filter((s) => s.colorHex === c.hex)
    );
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);
  };

  const metalObj = useMemo(
    () => METALS.find((m) => m.color === metal),
    [metal]
  );

  const canProceed =
    selectedMonth &&
    selectedColor &&
    selectedCut &&
    metalObj &&
    backing;

  const stonePrice =
    selectedColor?.price ??
    selectedColorStones?.[0]?.price ??
    0;

  /* ✅ ADD TO CART — SAME LOGIC AS BRACELET */
  const addToCartNow = async () => {
    setUiError("");
    setAddedMsg("");
    setAddedAccessoryID(null);
    setLastComputedPrice(null);

    if (!canProceed) {
      setUiError("Required: Month, Color, Cut, Metal, Backing.");
      return;
    }

    const chosenStone = pickStoneForCut(
      selectedColorStones,
      selectedCut
    );

    if (!chosenStone?.stoneID) {
      setUiError("No stone found for this selection.");
      return;
    }

    setIsAdding(true);
    try {
      const payload = {
        type: "earring",
        metal: metalObj.api,
        nbOfCharms: 0,
        nbOfStones: 1,
        product: {
          style: EARRING_DB_STYLE,
          backing, // ✅ "screw" | "clasp"
          birthstoneMonth: selectedMonth,
          birthstoneColor: selectedColor.label,
          birthstoneColorHex: selectedColor.hex,
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

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");

      addToCart({
        accessoryID: data.accessoryID,
        type: "earring",
        style: EARRING_DB_STYLE,
        metal: metalObj.name,
        backing,
        summary: {
          birthstone: {
            month: selectedMonth,
            color: selectedColor,
            cut: selectedCut,
            stoneID: chosenStone.stoneID,
          },
        },
        price: data.computedPrice ?? stonePrice,
      });

      setAddedAccessoryID(data.accessoryID);
      setLastComputedPrice(data.computedPrice);
      setAddedMsg("Added to cart!");
    } catch (err) {
      console.error(err);
      setUiError(err.message || "Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Birthstone Earrings</h2>
          <p className="nk-subtitle">
            Select Month → Color → Cut → Metal → Backing
          </p>
        </header>

        {uiError && <div className="nk-error">{uiError}</div>}

        <div className="nk-customizer">
          {/* PREVIEW */}
          <section className="nk-preview">
            <div className="nk-previewCard">
              <div className="nk-previewTop">
                <span className="nk-badge">Live Preview</span>
                <span className="nk-chip">{metalObj?.name}</span>
              </div>

              <img src={EarringPreviewImg} className="nk-mainImg" />
              <img src={GemColorPreviewImg} className="nk-mainImg" />

              <div className="nk-previewMeta">
                <div className="nk-metaRow">
                  <span>Month</span>
                  <strong>{selectedMonth || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Color</span>
                  <strong style={{ color: selectedColor?.hex }}>
                    {selectedColor?.label || "—"}
                  </strong>
                </div>
                <div className="nk-metaRow">
                  <span>Cut</span>
                  <strong>{selectedCut || "—"}</strong>
                </div>
                <div className="nk-metaRow">
                  <span>Backing</span>
                  <strong>{backing || "—"}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* CONTROLS */}
          <section className="nk-controls">
            {/* MONTH */}
            <div className="nk-section">
              <label className="nk-label">Month</label>
              <div className="nk-grid">
                {months.map((m) => (
                  <button
                    key={m}
                    className={`nk-cardPick ${selectedMonth === m ? "isActive" : ""}`}
                    onClick={() => onPickMonth(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            {selectedMonth && (
              <div className="nk-section">
                <label className="nk-label">Gem Color</label>
                <div className="nk-metals">
                  {availableColors.map((c) => (
                    <button
                      key={c.hex}
                      className={`nk-metalBtn ${
                        selectedColor?.hex === c.hex ? "isActive" : ""
                      }`}
                      onClick={() => onPickColor(c)}
                    >
                      <span
                        className="nk-metalDot"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CUT */}
            <div className="nk-section">
              <label className="nk-label">Cut</label>
              <div className="nk-grid">
                {CUTS.map((c) => (
                  <button
                    key={c.key}
                    className={`nk-cardPick ${
                      selectedCut === c.key ? "isActive" : ""
                    }`}
                    onClick={() => setSelectedCut(c.key)}
                  >
                    <img src={c.img} className="nk-cardImg" />
                    {c.key}
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
                    className={`nk-metalBtn ${
                      metal === m.color ? "isActive" : ""
                    }`}
                    onClick={() => setMetal(m.color)}
                  >
                    <span
                      className="nk-metalDot"
                      style={{ backgroundColor: m.color }}
                    />
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* BACKING */}
            <div className="nk-section">
              <label className="nk-label">Backing</label>
              <div className="nk-grid">
                {BACKINGS.map((b) => (
                  <button
                    key={b.value}
                    className={`nk-cardPick ${
                      backing === b.value ? "isActive" : ""
                    }`}
                    onClick={() => setBacking(b.value)}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="nk-next"
              onClick={addToCartNow}
              disabled={!canProceed || isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>

            {addedMsg && (
              <p style={{ color: "green", fontWeight: 700 }}>
                {addedMsg} {addedAccessoryID && `• ID ${addedAccessoryID}`}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
