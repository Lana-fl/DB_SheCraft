import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage";
import NecklacesPage from "./pages/NecklacesPage";
import RingsPage from "./pages/RingsPage";
import BraceletsPage from "./pages/BraceletsPage";
import EarringsPage from "./pages/EarringsPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/LoginPage"; // <-- import added
import OrderPage from "./pages/OrderPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/necklaces" element={<NecklacesPage />} />
        <Route path="/rings" element={<RingsPage />} />
        <Route path="/bracelets" element={<BraceletsPage />} />
        <Route path="/earrings" element={<EarringsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
