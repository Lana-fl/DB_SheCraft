// src/pages/EditAccountPage.js
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { api } from "../api/client";
import "../styles/AccountPage.css";

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Hooks MUST be at top (no returns before them)
  const [loading, setLoading] = useState(true);

  // source of truth loaded from backend (so required fields always exist)
  const [original, setOriginal] = useState(null);

  // editable form values
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    email: "",
    phone: "",
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

  // ================= LOAD PREVIOUS INFO FIRST =================
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setMessage("");

        const data =
          user.role === "designer"
            ? await api.getMyDesignerAccount()
            : await api.getMyCustomerAccount();

        if (!mounted) return;

        // normalize possible backend field names
        const normalized = {
          name:
            data?.name ||
            [data?.firstName, data?.lastName].filter(Boolean).join(" ") ||
            "",
          branch: data?.branch || "",
          email: data?.email || "",
          phone:
            data?.phone ||
            data?.phoneNb ||
            data?.phone_number ||
            data?.phoneNumber ||
            "",
        };

        setOriginal(normalized);
        setFormData(normalized);
      } catch (err) {
        console.error("Failed to load account:", err);
        setMessage(err.message || "Failed to load account info");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  // ================= ONLY CHANGE WHAT USER MODIFIED =================
  const changed = useMemo(() => {
    if (!original) return {};
    const out = {};
    for (const k of Object.keys(formData)) {
      const a = String(formData[k] ?? "").trim();
      const b = String(original[k] ?? "").trim();
      if (a !== b) out[k] = a;
    }
    return out;
  }, [formData, original]);

  // ================= HANDLERS =================
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(e) {
    const updated = { ...passwords, [e.target.name]: e.target.value };
    setPasswords(updated);

    if (updated.newPassword !== updated.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }

  function togglePassword(field) {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  // ================= SAVE ACCOUNT =================
  async function handleSave() {
    try {
      setMessage("");

      if (!original) {
        setMessage("Account data not loaded yet.");
        return;
      }

      // nothing changed => do nothing
      if (Object.keys(changed).length === 0) {
        setMessage("No changes to save.");
        return;
      }

      // validate phone only if changed and not empty
      let phoneDigits = null;
      if ("phone" in changed) {
        phoneDigits = changed.phone ? changed.phone.replace(/\D/g, "") : "";
        if (phoneDigits && !/^\d{8}$/.test(phoneDigits)) {
          setMessage("Phone must be exactly 8 digits.");
          return;
        }
      }

      if (user.role === "customer") {
        // final values (changed overrides original)
        const finalName =
          ("name" in changed ? changed.name : original.name) || original.name;
        const finalEmail =
          ("email" in changed ? changed.email : original.email) || original.email;

        const nameParts = String(finalName).trim().split(" ").filter(Boolean);
        const firstName = nameParts[0] || null;
        const lastName = nameParts.slice(1).join(" ") || null;

        const finalPhone =
          "phone" in changed
            ? phoneDigits || null
            : String(original.phone || "").replace(/\D/g, "") || null;

        // ✅ keep required fields always sent (even if user didn't change them)
        await api.updateMyCustomerAccount({
          firstName,
          lastName,
          email: finalEmail,
          countryCode: "+961",
          phoneNb: finalPhone,
        });
      } else if (user.role === "designer") {
        const finalName =
          ("name" in changed ? changed.name : original.name) || original.name;
        const finalBranch =
          ("branch" in changed ? changed.branch : original.branch) || original.branch;
        const finalEmail =
          ("email" in changed ? changed.email : original.email) || original.email;

        const finalPhone =
          "phone" in changed
            ? phoneDigits || null
            : String(original.phone || "").replace(/\D/g, "") || null;

        // ✅ keep required fields always sent
        await api.updateMyDesignerAccount({
          name: finalName,
          branch: finalBranch,
          email: finalEmail,
          countryCode: "+961",
          phoneNb: finalPhone,
        });
      }

      setMessage("Account updated successfully!");

      // refresh values so inputs show what is now saved
      const refreshed =
        user.role === "designer"
          ? await api.getMyDesignerAccount()
          : await api.getMyCustomerAccount();

      const normalized = {
        name:
          refreshed?.name ||
          [refreshed?.firstName, refreshed?.lastName].filter(Boolean).join(" ") ||
          "",
        branch: refreshed?.branch || "",
        email: refreshed?.email || "",
        phone:
          refreshed?.phone ||
          refreshed?.phoneNb ||
          refreshed?.phone_number ||
          refreshed?.phoneNumber ||
          "",
      };

      setOriginal(normalized);
      setFormData(normalized);
    } catch (err) {
      setMessage(err.message || "Failed to update account");
    }
  }

  // ================= PASSWORD =================
  async function handlePasswordSave() {
    if (passwordError) return;

    try {
      setMessage("");
      setPasswordError("");

      if (!passwords.oldPassword || !passwords.newPassword) {
        setPasswordError("Old password and new password are required.");
        return;
      }

      await api.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      setMessage("Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err.message || "Password update failed");
    }
  }

  // ================= RENDER (returns AFTER hooks) =================
  if (!user) {
    return (
      <div className="account-container">
        <div className="no-user-container">
          <h1 className="no-user-title">No Account Found</h1>
          <p className="no-user-text">Please log in to access your account.</p>
          <button className="edit-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="account-container">
        <p style={{ color: "#e4c67b" }}>Loading account...</p>
      </div>
    );
  }

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

        <h2 className="section-title">Account Information</h2>

        <div className="info-item">
          <span className="info-label">Name</span>
          <input
            className="info-value edit-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        {user.role === "designer" && (
          <div className="info-item">
            <span className="info-label">Branch</span>
            <input
              className="info-value edit-input"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch"
            />
          </div>
        )}

        <div className="info-item">
          <span className="info-label">Email</span>
          <input
            className="info-value edit-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="info-item">
          <span className="info-label">Phone</span>
          <input
            className="info-value edit-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03xxxxxx"
          />
        </div>

        <button className="edit-btn" onClick={handleSave}>
          Save Changes
        </button>

        <h2 className="section-title" style={{ marginTop: "40px" }}>
          Change Password
        </h2>

        {["old", "new", "confirm"].map((field) => (
          <div className="info-item" key={field}>
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
                value={
                  passwords[
                    field === "old"
                      ? "oldPassword"
                      : field === "new"
                      ? "newPassword"
                      : "confirmPassword"
                  ]
                }
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
