import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/necklace.css";

/* preview images (KEEP SAME COLOR IMAGE) */
import GemColorPreviewImg from "../assets/gems/birthstone.jpeg";
import EarringPreviewImg from "../assets/Earring/birthstoneearing.jpg";

/* cut images */
import CutOval from "../assets/Cuts/oval.jpeg";
import CutPear from "../assets/Cuts/pear.jpeg";
import CutPrincess from "../assets/Cuts/princess.jpeg";
import CutRound from "../assets/Cuts/round.jpg";

const API_BASE = "http://localhost:5000";

/* metals */
const METALS = [
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Rose Gold", color: "#B76E79" },
];

/* backings — EXACTLY AS YOU SAID */
const BACKINGS = [
  { name: "Screw Back", value: "screw" },
  { name: "Clasp Back", value: "clasp" },
];

/* cuts */
const CUTS = [
  { key: "Round", img: CutRound },
  { key: "Oval", img: CutOval },
  { key: "Pear", img: CutPear },
  { key: "Princess", img: CutPrincess },
];

export default function BirthstoneEarring() {
  const navigate = useNavigate();

  /* data */
  const [allBirthstones, setAllBirthstones] = useState([]);

  /* selections */
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthStones, setMonthStones] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedCut, setSelectedCut] = useState(null);
  const [metal, setMetal] = useState(METALS[0].color);
  const [backing, setBacking] = useState(null);

  /* fetch birthstones */
  useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/stones`);
        const data = await res.json();

        const birthstones = Array.isArray(data)
          ? data.filter((s) => s.stoneID?.startsWith("B"))
          : [];

        setAllBirthstones(birthstones);
      } catch (err) {
        console.error("Error fetching stones", err);
      }
    };

    fetchStones();
  }, []);

  /* months list */
  const months = useMemo(() => {
    const set = new Set();
    allBirthstones.forEach((s) => s.gem && set.add(s.gem));
    return Array.from(set);
  }, [allBirthstones]);

  /* month selection */
  const onPickMonth = (month) => {
    setSelectedMonth(month);
    setSelectedColor(null);
    setSelectedCut(null);

    const stones = allBirthstones.filter((s) => s.gem === month);
    setMonthStones(stones);

    const uniqueColors = new Map();
    stones.forEach((s) => {
      if (!uniqueColors.has(s.colorHex)) {
        uniqueColors.set(s.colorHex, {
          label: s.color,
          hex: s.colorHex,
          price: s.price ?? 0,
        });
      }
    });

    setAvailableColors(Array.from(uniqueColors.values()));
  };

  const canProceed =
    selectedMonth &&
    selectedColor &&
    selectedCut &&
    metal &&
    backing;

  const handleSubmit = () => {
    if (!canProceed) return;

    navigate("/checkout", {
      state: {
        itemType: "birthstone_earring",
        metal,
        backing,
        birthstoneMonth: selectedMonth,
        birthstoneColor: selectedColor,
        birthstoneCut: selectedCut,
      },
    });
  };

  return (
    <div className="nk-page">
      <div className="nk-container">
        <header className="nk-header">
          <h2>Birthstone Earrings</h2>
          <p className="nk-subtitle">
            Select Month → Color → Cut → Metal → Backing
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
                <img src={EarringPreviewImg} alt="Earring preview" className="nk-mainImg" />
              </div>

              <div className="nk-imageWrap" style={{ marginTop: 12 }}>
                <img src={GemColorPreviewImg} alt="Gem preview" className="nk-mainImg" />
              </div>

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
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                {months.map((m) => (
                  <button
                    key={m}
                    className={`nk-cardPick ${selectedMonth === m ? "isActive" : ""}`}
                    onClick={() => onPickMonth(m)}
                  >
                    <strong>{m}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            {selectedMonth && (
              <div className="nk-section">
                <label className="nk-label">Gem Color</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {availableColors.map((c) => (
                    <button
                      key={c.hex}
                      className={`nk-metalBtn ${selectedColor?.hex === c.hex ? "isActive" : ""}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      <span className="nk-metalDot" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CUT */}
            <div className="nk-section">
              <label className="nk-label">Cut</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
                {CUTS.map((c) => (
                  <button
                    key={c.key}
                    className={`nk-cardPick ${selectedCut === c.key ? "isActive" : ""}`}
                    onClick={() => setSelectedCut(c.key)}
                  >
                    <img src={c.img} className="nk-cardImg" alt={c.key} />
                    <strong>{c.key}</strong>
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
                    className={`nk-metalBtn ${metal === m.color ? "isActive" : ""}`}
                    onClick={() => setMetal(m.color)}
                  >
                    <span className="nk-metalDot" style={{ backgroundColor: m.color }} />
                    <span className="nk-metalName">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BACKING */}
            <div className="nk-section">
              <label className="nk-label">Backing</label>
              <div className="nk-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
                {BACKINGS.map((b) => (
                  <button
                    key={b.value}
                    className={`nk-cardPick ${backing === b.name ? "isActive" : ""}`}
                    onClick={() => setBacking(b.name)}
                  >
                    <strong>{b.name}</strong>
                  </button>
                ))}
              </div>
            </div>

            <button className="nk-next" onClick={handleSubmit} disabled={!canProceed}>
              Order Summary
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
