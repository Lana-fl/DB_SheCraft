import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "shecraft_user";
const TOKEN_KEY = "authToken";

export default function useAuth() {
  const [user, setUser] = useState(null);

  // ---------------- LOAD USER ON APP START ----------------
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // ---------------- LOGIN ----------------
  const login = useCallback((userData, token) => {
    if (!userData) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    setUser(userData);
  }, []);

  // ---------------- UPDATE USER (AFTER ACCOUNT EDIT) ----------------
  const updateUser = useCallback((updatedUser) => {
    if (!updatedUser) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  // ---------------- LOGOUT ----------------
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
}
