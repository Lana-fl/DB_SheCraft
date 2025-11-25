// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import NecklacesPage from "./pages/NecklacesPage";
import RingsPage from "./pages/RingsPage";
import BraceletsPage from "./pages/BraceletsPage";
import EarringsPage from "./pages/EarringsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Best seller pages per category */}
        <Route path="/necklaces" element={<NecklacesPage />} />
        <Route path="/rings" element={<RingsPage />} />
        <Route path="/bracelets" element={<BraceletsPage />} />
        <Route path="/earrings" element={<EarringsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
