import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/AccountPage.css";

export default function EditAccountPage() {
  const { user } = useAuth();

  // ---------------- HOOKS (must be before any return) ----------------
  const initialData = user?.user || {};

  const [formData, setFormData] = useState(initialData);

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
  function handleSave() {
    const updatedUser = {
      role: user.role,
      password: user.password, // keep existing password
      user: formData,
    };

    localStorage.setItem("shecraft_user", JSON.stringify(updatedUser));
    setMessage("Account updated successfully!");
  }

  // ---------------- SAVE PASSWORD ----------------
  function handlePasswordSave() {
    // Validate old password
    if (passwords.oldPassword !== user.password) {
      setPasswordError("Old password is incorrect.");
      return;
    }

    // Validate new password match
    if (passwordError) {
      setMessage("Please fix the password mismatch before saving.");
      return;
    }

    // Save new password
    const updatedUser = {
      role: user.role,
      user: formData,
      password: passwords.newPassword,
    };

    localStorage.setItem("shecraft_user", JSON.stringify(updatedUser));
    setMessage("Password updated successfully!");

    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  // ---------------- RENDER UI ----------------
  return (
    <div className="account-container">
      <div className="account-banner">
        <h1 className="banner-title">Edit Account</h1>
        <p className="banner-subtitle">Update your information</p>
      </div>

      <div className="account-card">
        {message && (
          <p
            style={{
              color: "#e4c67b",
              marginBottom: "20px",
              fontSize: "1.1rem",
            }}
          >
            {message}
          </p>
        )}

        {/* ---------------- ACCOUNT INFO ---------------- */}
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

        {/* CUSTOMER FIELDS */}
        {user.role === "customer" && (
          <>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <input
                className="info-value edit-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="info-item">
              <span className="info-label">Address</span>
              <input
                className="info-value edit-input"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* DESIGNER FIELDS */}
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

        {/* ---------------- PASSWORD SECTION ---------------- */}
        <h2 className="section-title" style={{ marginTop: "40px" }}>
          Change Password
        </h2>

        {/* OLD PASSWORD */}
        <div className="info-item">
          <span className="info-label">Old Password</span>
          <div className="password-wrapper">
            <input
              type={showPassword.old ? "text" : "password"}
              className="info-value edit-input"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => togglePassword("old")}
            >
              {showPassword.old ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="info-item">
          <span className="info-label">New Password</span>
          <div className="password-wrapper">
            <input
              type={showPassword.new ? "text" : "password"}
              className="info-value edit-input"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => togglePassword("new")}
            >
              {showPassword.new ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="info-item">
          <span className="info-label">Confirm Password</span>
          <div className="password-wrapper">
            <input
              type={showPassword.confirm ? "text" : "password"}
              className="info-value edit-input"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => togglePassword("confirm")}
            >
              {showPassword.confirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* LIVE ERRORS */}
        {passwordError && (
          <p style={{ color: "red", marginTop: "5px", marginBottom: "10px" }}>
            {passwordError}
          </p>
        )}

        <button className="edit-btn" onClick={handlePasswordSave}>
          Update Password
        </button>
      </div>
    </div>
  );
}
