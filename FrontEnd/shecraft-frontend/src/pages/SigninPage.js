import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Footer from "./Footer";


export default function SigninPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    alert(`Sign-up successful! Welcome, ${username}`);
  };

  return (
    <div className="signup-page">
      <div className="auth-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
