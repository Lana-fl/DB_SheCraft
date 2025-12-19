import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { api } from "../api/client";
import "../styles/AccountPage.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD ACCOUNT FROM BACKEND ----------------
  useEffect(() => {
    async function loadAccount() {
      try {
        let data;

        if (user.role === "customer") {
          data = await api.getMyCustomerAccount();
        } else if (user.role === "designer") {
          data = await api.getMyDesignerAccount();
        }

        setAccount(data);
      } catch (err) {
        console.error("Failed to load account:", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) loadAccount();
  }, [user]);

  // ---------------- NOT LOGGED IN ----------------
  if (!user) {
    return (
      <div className="account-container">
        <div className="no-user-container">
          <h1 className="no-user-title">No Account Found</h1>
          <p className="no-user-text">
            Please log in to access your SheCraft account.
          </p>
          <a href="/login" className="no-user-button">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="account-container">
        <p style={{ color: "#e4c67b" }}>Loading account...</p>
      </div>
    );
  }

  // ---------------- LOGOUT ----------------
  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="account-container">
      <div className="account-banner">
        <h1 className="banner-title">My Account</h1>
        <p className="banner-subtitle">
          {user.role === "designer" ? "Designer Profile" : "Customer Profile"}
        </p>
      </div>

      <div className="account-card">
        <h2 className="section-title">Account Information</h2>

        {/* NAME */}
        <div className="info-item">
          <span className="info-label">Name</span>
          <span className="info-value">{account?.name || "-"}</span>
        </div>

        {/* EMAIL */}
        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">{account?.email || "-"}</span>
        </div>

        {/* CUSTOMER FIELDS */}
        {user.role === "customer" && (
          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{account?.phone || "-"}</span>
          </div>
        )}

        {/* DESIGNER FIELDS */}
        {user.role === "designer" && (
          <>
            <div className="info-item">
              <span className="info-label">Branch</span>
              <span className="info-value">{account?.branch || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{account?.phone || "-"}</span>
            </div>
          </>
        )}

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
          <button
            className="edit-btn"
            onClick={() => navigate("/account/edit")}
          >
            Edit Account
          </button>
         <button className="edit-btn" onClick={() => navigate("/account/orders")}>
  Orders
</button>

          <button
            className="edit-btn"
            style={{
              backgroundColor: "#3a0d0d",
              border: "1px solid #7d2a2a",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
