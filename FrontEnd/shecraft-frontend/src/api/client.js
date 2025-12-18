// src/api/client.js

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const TOKEN_KEY = "authToken";

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

    // ✅ ALWAYS attach token if it exists
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }

    // ✅ ONLY store token here (user is handled by useAuth)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    return data;
  }

  // ================= AUTH =================
  login({ role, email, password }) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ role, email, password }),
    });
  }

  signupCustomer({ name, email, password }) {
    return this.request("/api/auth/signup/customer", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  signupDesigner({ name, email, password, branch }) {
    return this.request("/api/auth/signup/designer", {
      method: "POST",
      body: JSON.stringify({ name, email, password, branch }),
    });
  }

  // ================= PASSWORD =================
  changePassword({ oldPassword, newPassword }) {
    return this.request("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  // ================= ACCOUNT =================
  updateCustomerAccount({
    firstName,
    lastName,
    countryCode,
    phoneNb,
    email,
  }) {
    return this.request("/api/customers/account", {
      method: "PUT",
      body: JSON.stringify({
        firstName,
        lastName,
        countryCode,
        phoneNb,
        email,
      }),
    });
  }

getMyAccount() {
  return this.request("/api/customers/account", {
    method: "GET",
  });
}


  // ❌ NO logout() here anymore
  // Logout is handled ONLY by useAuth.logout()
}

export const api = new ApiClient(API_BASE_URL);
