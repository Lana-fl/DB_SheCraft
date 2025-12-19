import { useNavigate } from "react-router-dom";
import "../styles/BraceletSelection.css";

import nameBraceletImg from "../assets/Bracelet/names.jpg";
import charmBraceletImg from "../assets/Bracelet/charms.jpg";
import birthstoneBraceletImg from "../assets/Bracelet/birthstone.png";


const bracelets = [
  {
    id: 1,
    type: "name",
    label: "Name Bracelet",
    image: nameBraceletImg,
    theme: "name-theme",
  },
  {
    id: 2,
    type: "charm",
    label: "Charm Bracelet",
    image: charmBraceletImg,
    theme: "charm-theme",
  },
  {
    id: 3,
    type: "birthstone",
    label: "Birthstone Bracelet",
    image: birthstoneBraceletImg,
    theme: "birthstone-theme",
  },
];

export default function BraceletSelection() {
  const navigate = useNavigate();

  const handleSelectBracelet = (braceletType) => {
  if (braceletType === "charm") {
    navigate("/bracelet/charm");
    return;
  }

  if (braceletType === "birthstone") {
    navigate("/bracelet/birthstone");
    return;
  }

  navigate("/braceletspage", { state: { braceletType } });
};


  return (
    <div className="page-wrapper">
      <div className="bracelet-selection-page">
        <h1 className="bracelet-title">Choose Your Bracelet</h1>
        <p className="bracelet-subtitle">
          Personalize your bracelet with names, charms, or birthstones.
        </p>

        <div className="bracelets-grid">
          {bracelets.map((bracelet) => (
            <div
              key={bracelet.id}
              className={`bracelet-card ${bracelet.theme}`}
              onClick={() => handleSelectBracelet(bracelet.type)}
            >
              <div className="bracelet-image-container">
                <img src={bracelet.image} alt={bracelet.label} />
              </div>
              <p className="bracelet-label">{bracelet.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
