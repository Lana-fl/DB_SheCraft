// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/header.css";

// import logoImg from "../assets/logo.png";
// import addToCartImg from "../assets/addtocart.png";
// import personImg from "../assets/person.png";
// import orderImg from "../assets/order.png"; 
// import useAuth from "../context/AuthContext"; 

// const Header = ({ openLogin }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // ✅ source of truth
//   const isLoggedIn = !!user;

//   return (
//     <header className="sc-header">
//       <div className="sc-left">
//         <button
//           type="button"
//           className="logo-button"
//           onClick={() => navigate("/")}
//           aria-label="SheCraft Home"
//         >
//           <img src={logoImg} alt="SheCraft logo" className="logo-img" />
//         </button>

//         <button
//           type="button"
//           className="icon-button"
//           aria-label="Cart"
//           onClick={() => {
//             if (!isLoggedIn) openLogin?.();
//             else navigate("/cart");
//           }}
//         >
//           <img src={addToCartImg} alt="Cart" className="icon-img" />
//         </button>

//         <button
//           type="button"
//           className="icon-button"
//           aria-label="Account"
//           onClick={() => {
//             if (!isLoggedIn) openLogin?.();
//             else navigate("/account");
//           }}
//         >
//           <img src={personImg} alt="Account" className="icon-img" />
//         </button>
//       </div>

//       <nav className="sc-nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about">About Us</Link>

//         {!isLoggedIn ? (
//           <span
//             className="login-header-link"
//             onClick={openLogin}
//             style={{ cursor: "pointer" }}
//           >
//             Login
//           </span>
//         ) : (
//           <span
//             className="login-header-link"
//             onClick={() => navigate("/account")}
//             style={{ cursor: "pointer" }}
//           >
//             My Account
//           </span>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

import logoImg from "../assets/logo.png";
import addToCartImg from "../assets/addtocart.png";
import personImg from "../assets/person.png";
import orderImg from "../assets/order.png"; // ✅ ORDER ICON
import useAuth from "../context/AuthContext";

const Header = ({ openLogin }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const handleProtectedNav = (path) => {
    if (!isLoggedIn) openLogin?.();
    else navigate(path);
  };

  return (
    <header className="sc-header">
      <div className="sc-left">
        {/* LOGO */}
        <button
          type="button"
          className="logo-button"
          onClick={() => navigate("/")}
          aria-label="SheCraft Home"
        >
          <img src={logoImg} alt="SheCraft logo" className="logo-img" />
        </button>

        {/* CART */}
        <button
          type="button"
          className="icon-button"
          aria-label="Cart"
          onClick={() => handleProtectedNav("/cart")}
        >
          <img src={addToCartImg} alt="Cart" className="icon-img" />
        </button>

        {/* ORDERS ✅ */}
        <button
          type="button"
          className="icon-button"
          aria-label="Orders"
          onClick={() => handleProtectedNav("/orders")}
        >
          <img src={orderImg} alt="Orders" className="icon-img" />
        </button>

        {/* ACCOUNT */}
        <button
          type="button"
          className="icon-button"
          aria-label="Account"
          onClick={() => handleProtectedNav("/account")}
        >
          <img src={personImg} alt="Account" className="icon-img" />
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="sc-nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>

        {!isLoggedIn ? (
          <span
            className="login-header-link"
            onClick={openLogin}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        ) : (
          <span
            className="login-header-link"
            onClick={() => navigate("/account")}
            style={{ cursor: "pointer" }}
          >
            My Account
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;

