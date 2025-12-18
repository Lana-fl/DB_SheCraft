import React, { useState } from "react";
import useAuth from "../context/AuthContext";

import { api } from "../api/client";
import "../styles/AccountPage.css";

export default function EditAccountPage() {
  const { user } = useAuth();

  // ---------------- INITIAL DATA ----------------
  const initialData = user?.user || {};

  // ---------------- HOOKS ----------------
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    specialty: initialData.specialty || "",
    portfolioLink: initialData.portfolioLink || "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ---------------- BLOCK IF NOT LOGGED IN ----------------
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

  // ---------------- FORM HANDLERS ----------------
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePasswordChange(e) {
    const updated = { ...passwords, [e.target.name]: e.target.value };
    setPasswords(updated);

    if (updated.newPassword !== updated.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
    } else {
      setPasswordError("");
    }
  }

  function togglePassword(field) {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  // ---------------- SAVE ACCOUNT INFO ----------------
  async function handleSave() {
    try {
      // Split name → firstName / lastName
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(" ") || null;

      // Clean phone (digits only → satisfies DB CHECK)
      const phoneNb = formData.phone
        ? formData.phone.replace(/\D/g, "")
        : null;

      if (phoneNb && !/^\d{8}$/.test(phoneNb)) {
        setMessage("Phone number must be exactly 8 digits.");
        return;
      }

      await api.updateCustomerAccount({
        firstName,
        lastName,
        countryCode: "+961",
        phoneNb,
        email: formData.email,
      });

      setMessage("Account updated successfully!");
    } catch (err) {
      setMessage(err.message || "Failed to update account");
    }
  }

  // ---------------- SAVE PASSWORD (REAL BACKEND) ----------------
  async function handlePasswordSave() {
    if (passwordError) return;

    try {
      await api.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      setMessage("Password updated successfully!");

      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(err.message || "Failed to update password");
    }
  }

  // ---------------- RENDER ----------------
  return (
    <div className="account-container">
      <div className="account-banner">
        <h1 className="banner-title">Edit Account</h1>
        <p className="banner-subtitle">Update your information</p>
      </div>

      <div className="account-card">
        {message && (
          <p style={{ color: "#e4c67b", marginBottom: "20px" }}>{message}</p>
        )}

        {/* ACCOUNT INFO */}
        <h2 className="section-title">Account Information</h2>

        <div className="info-item">
          <span className="info-label">Name</span>
          <input
            className="info-value edit-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="info-item">
          <span className="info-label">Email</span>
          <input
            className="info-value edit-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {user.role === "customer" && (
          <div className="info-item">
            <span className="info-label">Phone</span>
            <input
              className="info-value edit-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        )}

        {user.role === "designer" && (
          <>
            <div className="info-item">
              <span className="info-label">Specialty</span>
              <input
                className="info-value edit-input"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              />
            </div>

            <div className="info-item">
              <span className="info-label">Portfolio Link</span>
              <input
                className="info-value edit-input"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button className="edit-btn" onClick={handleSave}>
          Save Changes
        </button>

        {/* PASSWORD */}
        <h2 className="section-title" style={{ marginTop: "40px" }}>
          Change Password
        </h2>

        {["old", "new", "confirm"].map((field, idx) => (
          <div className="info-item" key={idx}>
            <span className="info-label">
              {field === "old"
                ? "Old Password"
                : field === "new"
                ? "New Password"
                : "Confirm Password"}
            </span>
            <div className="password-wrapper">
              <input
                type={showPassword[field] ? "text" : "password"}
                className="info-value edit-input"
                name={
                  field === "old"
                    ? "oldPassword"
                    : field === "new"
                    ? "newPassword"
                    : "confirmPassword"
                }
                value={passwords[
                  field === "old"
                    ? "oldPassword"
                    : field === "new"
                    ? "newPassword"
                    : "confirmPassword"
                ]}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => togglePassword(field)}
              >
                {showPassword[field] ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        ))}

        {passwordError && (
          <p style={{ color: "red", marginTop: "5px" }}>{passwordError}</p>
        )}

        <button className="edit-btn" onClick={handlePasswordSave}>
          Update Password
        </button>
      </div>
    </div>
  );
}
