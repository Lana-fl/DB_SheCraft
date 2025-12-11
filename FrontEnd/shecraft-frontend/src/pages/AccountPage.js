import React from "react";
import useAuth from "../hooks/useAuth";
import "../styles/AccountPage.css";

export default function AccountPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="account-container">
        <div className="no-user-container">
          <h1 className="no-user-title">No Account Found</h1>
          <p className="no-user-text">Please log in to access your SheCraft account.</p>
          <a href="/login" className="no-user-button">Go to Login</a>
        </div>
      </div>
    );
  }

  const data = user.user;

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

        <div className="info-item">
          <span className="info-label">Name</span>
          <span className="info-value">{data.name}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">{data.email}</span>
        </div>

        {user.role === "customer" && (
          <>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{data.phone}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{data.address}</span>
            </div>
          </>
        )}

        {user.role === "designer" && (
          <>
            <div className="info-item">
              <span className="info-label">Specialty</span>
              <span className="info-value">{data.specialty}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Portfolio</span>
              <span className="info-value">{data.portfolioLink}</span>
            </div>
          </>
        )}

        <button 
          className="edit-btn"
          onClick={() => window.location.href = "/account/edit"}
        >
          Edit Account
        </button>
      </div>
    </div>
  );
}
