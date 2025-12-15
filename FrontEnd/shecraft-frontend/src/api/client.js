// src/api/client.js

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }

    if (data.token) localStorage.setItem("authToken", data.token);

    return data;
  }

  login({ role, email, password }) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ role, email, password }),
    });
  }

  signupCustomer({ username, email, password }) {
    return this.request("/api/auth/signup/customer", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  signupDesigner({ username, email, password }) {
    return this.request("/api/auth/signup/designer", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
}

export const api = new ApiClient(API_BASE_URL);
