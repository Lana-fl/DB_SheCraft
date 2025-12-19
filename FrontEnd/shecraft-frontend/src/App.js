import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* =======================
   PAGES
   ======================= */
   import CharmBraceletPage from "./pages/CharmBraceletPage.js";

import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage";
import NecklacesPage from "./pages/NecklacesPage";
import RingsPage from "./pages/RingsPage";
import BraceletsPage from "./pages/BraceletsPage";
import EarringsPage from "./pages/EarringsPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import Checkout from "./pages/CheckOut";
import RingSelection from "./pages/RingSelection";
import DesignerPage from "./pages/DesignerPage";

import NecklaceSelection from "./pages/NecklaceSelection";
import CharmNecklacePage from "./pages/CharmNecklacePage";
import BirthstoneNecklace from "./pages/BirthstoneNecklace";
import BraceletSelection from "./pages/BraceletSelection";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import EarringBirthstone from "./pages/EarringBirthstone";
import EarringCharm from "./pages/EarringCharm";
import BirthstoneBracelet from "./pages/BirthstoneBracelet";
import FinalStep from "./pages/FinalStep"; 
/* =======================
   ACCOUNT SYSTEM
   ======================= */
import AccountPage from "./pages/AccountPage";
import EditAccountPage from "./pages/EditAccountPage";

/* =======================
   CART PAGE
   ======================= */
import CartPage from "./pages/CartPage";
import DesignerDashboard from "./pages/DesignerDashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("customer"); // "customer" | "designer"

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <Router>
      <div className="page-container">
        {/* ================= GLOBAL HEADER ================= */}
        <Header openLogin={openLogin} isLoggedIn={isLoggedIn} />

        {/* ================= LOGIN POPUP ================= */}
        {showLogin && (
          <div
            className="login-modal-overlay"
            onClick={closeLogin}
            role="presentation"
          >
            <div
              className="login-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <LoginPage
                closePopup={closeLogin}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            </div>
          </div>
        )}

        {/* ================= MAIN ROUTES ================= */}
        <main className="main-content">
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={<WelcomePage openLogin={openLogin} />}
            />

            <Route path="/about" element={<AboutPage />} />

            {/* ACCOUNT */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/edit" element={<EditAccountPage />} />
            <Route
  path="/designer/dashboard"
  element={
    isLoggedIn && userRole === "designer" ? (
      <DesignerDashboard />
    ) : (
      <WelcomePage openLogin={openLogin} />
    )
  }
/>
            {/* CART */}
            <Route
              path="/cart"
              element={
                <CartPage
                  isLoggedIn={isLoggedIn}
                  userRole={userRole}
                />
              }
            />

            {/* SHOPPING */}
            <Route path="/orderpage" element={<OrderPage />} />

            {/* NECKLACES */}
            <Route path="/necklaces" element={<NecklaceSelection />} />
            <Route path="/necklacespage" element={<NecklacesPage />} />
            <Route
              path="/necklaces/birthstone"
              element={<BirthstoneNecklace />}
            />
            <Route
              path="/necklaces/charm"
              element={<CharmNecklacePage />}
            />

            {/* RINGS */}
            <Route path="/rings" element={<RingSelection />} />
            <Route path="/ringspage" element={<RingsPage />} />

            {/* BRACELETS */}
            <Route path="/bracelets" element={<BraceletSelection />} />
            <Route
              path="/braceletspage"
              element={<BraceletsPage />}
            />
            <Route
            path="/bracelet/charm"
            element={<CharmBraceletPage />}
            />
            <Route
              path="/bracelet/birthstone"
              element={<BirthstoneBracelet />}
            />

            {/* EARRINGS */}
           <Route path="/earrings" element={<EarringsPage />} />

<Route
  path="/earrings/birthstone"
  element={<EarringBirthstone />}
/>

<Route
  path="/earrings/charm"
  element={<EarringCharm />}
/>

            {/* OTHER */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/designer" element={<DesignerPage />} />
            
            <Route path="/final-step" element={<FinalStep />} />
          </Routes>
        </main>

        {/* ================= FOOTER ================= */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
