import { useNavigate } from "react-router-dom";
import "../styles/necklaceselections.css";
import Footer from "./Footer";

/* ✅ PNG IMAGES */
import nameNecklaceImg from "../assets/necklace/name.png";
import charmNecklaceImg from "../assets/necklace/charms.png";
import birthstoneNecklaceImg from "../assets/necklace/birthstone.png";

/* ✅ 3 Necklace Types */
const necklaces = [
  {
    id: 1,
    type: "name",
    label: "Name Necklace",
    image: nameNecklaceImg,
    theme: "name-theme",
  },
  {
    id: 2,
    type: "charm",
    label: "Charm Necklace",
    image: charmNecklaceImg,
    theme: "charm-theme",
  },
  {
    id: 3,
    type: "birthstone",
    label: "Birthstone Necklace",
    image: birthstoneNecklaceImg,
    theme: "birthstone-theme",
  },
];

export default function NecklaceSelection() {
  const navigate = useNavigate();

 const handleSelectNecklace = (necklaceType) => {
  if (necklaceType === "charm") {
    navigate("/necklace/charm");
    return;
  }
  navigate("/necklacespage", { state: { necklaceType } });
};
return (
  <div className="page-wrapper">
    <div className="necklace-selection-page">
      <h1 className="necklace-title">Choose Your Necklace</h1>
      <p className="necklace-subtitle">
        Personalize your necklace with your initials, charms, or birthstones.
      </p>

      <div className="necklaces-grid">
        {necklaces.map((necklace) => (
          <div
            key={necklace.id}
            className={`necklace-card ${necklace.theme}`}
            onClick={() => handleSelectNecklace(necklace.type)}
          >
            <div className="necklace-image-container">
              <img src={necklace.image} alt={necklace.label} />
            </div>
            <p className="necklace-label">{necklace.label}</p>
          </div>
        ))}
      </div>
    </div>

    
  </div>
);
}