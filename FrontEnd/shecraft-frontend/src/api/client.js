// src/api/client.js
const API_URL = process.env.REACT_APP_API_URL;
 // ✅ your backend

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  signupCustomer: (payload) =>
    request("/api/auth/signup/customer", { method: "POST", body: payload }),
  signupDesigner: (payload) =>
    request("/api/auth/signup/designer", { method: "POST", body: payload }),
};
