// api/client.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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
        ...options.headers,
      },
    };

    // Add auth token if exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed");
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // LOGIN - unified endpoint for both roles
  async login({ role, email, password }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ role, email, password }),
    });
  }

  // SIGNUP CUSTOMER
  async signupCustomer({ username, email, password }) {
    return this.request("/auth/signup/customer", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  // SIGNUP DESIGNER
  async signupDesigner({ username, email, password }) {
    return this.request("/auth/signup/designer", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  // LOGOUT
  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
}

export const api = new ApiClient(API_BASE_URL);