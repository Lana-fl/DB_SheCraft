import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Footer from "./Footer";
import { api } from "../api/client";

export default function SigninPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // 🔹 DESIGNER SIGNUP (matches backend exactly)
      await api.signupDesigner({
        name,
        email,
        password,
      });

      // Optional redirect after success
      navigate("/"); // change if needed
    } catch (err) {
      setErrorMessage(err.message || "Designer registration failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="auth-container">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
          />

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
