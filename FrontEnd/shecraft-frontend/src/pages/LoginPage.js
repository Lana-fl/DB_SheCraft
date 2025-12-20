
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { api } from "../api/client";
import useAuth from "../context/AuthContext"; 

export default function LoginPage({ closePopup }) {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("customer");
  const [branch, setBranch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closePopup?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closePopup]);

 
  useEffect(() => {
    setBranch("");
  }, [role, activeTab]);

  async function handleSubmit(e, type) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const form = e.target;
    const name = form.elements.name?.value.trim();
    const email = form.elements.email?.value.trim();
    const password = form.elements.password?.value.trim();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (type === "signup" && !name) {
      setErrorMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    if (type === "signup" && role === "designer" && !branch.trim()) {
      setErrorMessage("Please enter your branch.");
      setLoading(false);
      return;
    }

    try {
      let data;

      if (type === "login") {
        data = await api.login({ role, email, password });
      } else {
        data =
          role === "customer"
            ? await api.signupCustomer({ name, email, password })
            : await api.signupDesigner({ name, email, password, branch });
      }

      
      login({
        role,
        user: data.user,
      });
      if (role === "designer") {
  localStorage.setItem("designerID", data.user.designerID || data.user.id);
}
      
      closePopup?.();

      
      navigate(role === "designer" ? "/designer/dashboard" : "/orderpage");

    } catch (err) {
      setErrorMessage(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="close-icon" onClick={closePopup}>
          ×
        </span>

        <div className="tab-header">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
            type="button"
          >
            Login
          </button>

          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <div className="login-layout">
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

          <div className="form-column">
            {activeTab === "login" && (
              <form onSubmit={(e) => handleSubmit(e, "login")}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                />
                <button className="primary-btn" disabled={loading}>
                  Login
                </button>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={(e) => handleSubmit(e, "signup")}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-input"
                />

                {role === "designer" && (
                  <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    className="form-input"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                />
                <button className="primary-btn" disabled={loading}>
                  Sign Up
                </button>
              </form>
            )}

            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
