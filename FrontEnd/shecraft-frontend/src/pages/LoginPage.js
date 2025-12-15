import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { api } from "../api/client";


export default function LoginPage({ closePopup, setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // login | signup
  const [role, setRole] = useState("customer");        // customer | designer
  const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); 
      // ESC closes modal
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && closePopup?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closePopup]);

 const handleSubmit = async (e, type) => {
  e.preventDefault();
  console.log("SUBMIT FIRED:", type);
  setErrorMessage("");
  setLoading(true);

  const username = e.target.username?.value?.trim();
  const email = e.target.email?.value?.trim();
  const password = e.target.password?.value?.trim();

  if (type === "signup" && !username) {
    setErrorMessage("Please enter your name.");
    setLoading(false);
    return;
  }

  if (!email || !password) {
    setErrorMessage("Please fill in all fields.");
    setLoading(false);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setErrorMessage("Invalid email format.");
    setLoading(false);
    return;
  }

  try {
    let data;

    // 🔹 LOGIN (customer OR designer)
    if (type === "login") {
      data = await api.login({
        role,      // "customer" or "designer"
        email,
        password,
      });
      localStorage.setItem(
  "shecraft_user",
  JSON.stringify({
    role: data.role || role,
    user: data.user
  })
);

    }
    


    // 🔹 SIGNUP
    else {
      if (role === "customer") {
        data = await api.signupCustomer({
          username,
          email,
          password,
        });
      } else {
        data = await api.signupDesigner({
          username,
          email,
          password,
        });
      }
    }

    // ✅ SUCCESS
    setIsLoggedIn(true);
    setUserRole(role);

    // optional: store user
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    closePopup?.();
    navigate("/orderpage");
  } catch (err) {
    setErrorMessage(err.message || "Authentication failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="close-icon" onClick={closePopup}>×</span>

        {/* TABS */}
        <div className="tab-header">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => { setActiveTab("login"); setErrorMessage(""); }}
          >
            Login
          </button>

          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => { setActiveTab("signup"); setErrorMessage(""); }}
          >
            Sign Up
          </button>
        </div>

        <div className="login-layout">

          {/* LEFT: ROLE SELECTION */}
          <div className="role-column">
            <h3 className="role-title">Continue as</h3>

            <button
              type="button"
              className={`role-pill ${role === "customer" ? "active" : ""}`}
              onClick={() => setRole("customer")}
            >
              Customer
            </button>

            <button
              type="button"
              className={`role-pill ${role === "designer" ? "active" : ""}`}
              onClick={() => setRole("designer")}
            >
              Designer
            </button>
          </div>

          {/* RIGHT: FORMS */}
          <div className="form-column">
            {activeTab === "login" && (
              <form onSubmit={(e) => handleSubmit(e, "login")}>
                <input type="email" name="email" placeholder="Email" className="form-input" />
                <input type="password" name="password" placeholder="Password" className="form-input" />
                <button type="submit" className="primary-btn">Login</button>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={(e) => handleSubmit(e, "signup")}>
                <input type="text" name="username" placeholder="Name" className="form-input" />
                <input type="email" name="email" placeholder="Email" className="form-input" />
                <input type="password" name="password" placeholder="Password" className="form-input" />
                <button type="submit" className="primary-btn">Sign Up</button>
              </form>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
