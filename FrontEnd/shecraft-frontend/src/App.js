import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage";
import NecklacesPage from "./pages/NecklacesPage";
import RingsPage from "./pages/RingsPage";
import BraceletsPage from "./pages/BraceletsPage";
import EarringsPage from "./pages/EarringsPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import Checkout from "./pages/CheckOut";
import RingSelection from "./pages/RingSelection";
import DesignerPage from "./pages/DesignerPage";
import StepsBar from "./pages/StepsBar";
import NecklaceSelection from "./pages/NecklaceSelection";

// Account system pages
import AccountPage from "./pages/AccountPage";
import EditAccountPage from "./pages/EditAccountPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* MAIN PAGES */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />

        {/* ACCOUNT PAGES */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/edit" element={<EditAccountPage />} />

        {/* SHOPPING / PRODUCT PAGES */}
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/necklacespage" element={<NecklacesPage />} />
        <Route path="/necklaces" element={<NecklaceSelection />} />
        <Route path="/rings" element={<RingSelection />} />
        <Route path="/ringspage" element={<RingsPage />} />
        <Route path="/bracelets" element={<BraceletsPage />} />
        <Route path="/earrings" element={<EarringsPage />} />

        {/* OTHER FEATURES */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/designer" element={<DesignerPage />} />
        <Route path="/steps" element={<StepsBar />} />

      </Routes>
    </Router>
  );
}

export default App;
