import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const stored = localStorage.getItem("shecraft_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function login(authData) {
    localStorage.setItem("shecraft_user", JSON.stringify(authData));
    setUser(authData);
  }

  function logout() {
    localStorage.removeItem("shecraft_user");
    localStorage.removeItem("authToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
