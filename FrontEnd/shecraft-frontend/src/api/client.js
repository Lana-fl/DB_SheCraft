
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
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

    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.message || data.error || "Request failed");

    if (data.token) localStorage.setItem(TOKEN_KEY, data.token);

    return data;
  }

  // ---------------- AUTH ----------------
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

  // ---------------- CUSTOMER ----------------
  getMyCustomerAccount() {
    return this.request("/api/customers/account", { method: "GET" });
  }

  updateMyCustomerAccount(payload) {
  return this.request("/api/customers/account", {
    method: "PUT", // or "PATCH" depending on your backend
    body: JSON.stringify(payload),
  });
}

changePassword(payload) {
  return this.request("/api/auth/change-password", {
    method: "PUT", // or PUT
    body: JSON.stringify(payload), // { oldPassword, newPassword }
  });
}

  // OPTIONAL: if you have it later
  getMyDesignerAccount() {
    return this.request("/api/designers/account", { method: "GET" });
  }

updateMyDesignerAccount(payload) {
  return this.request("/api/designers/account", {
    method: "PUT", // or "PATCH" if your backend uses PATCH
    body: JSON.stringify(payload),
  });
}
  // ---------------- DESIGNERS ----------------
  getDesigners() {
    return this.request("/api/designers", { method: "GET" });
  }

  // ---------------- ORDERS ----------------

  // Create order from reserved accessories
  createOrder(orderPayload) {
    return this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload),
    });
  }

  // Get ALL orders (designer/admin usage)
  getAllOrders() {
    return this.request("/api/orders", { method: "GET" });
  }

  // Get orders by customerID (customer page)
  getOrdersByCustomer(customerID) {
    return this.request(`/api/orders/customer/${customerID}`, { method: "GET" });
  }

  // Get order details by orderID
  getOrderDetails(orderID) {
    return this.request(`/api/orders/${orderID}`, { method: "GET" });
  }

  // Mark order completed (PATCH /api/orders/:orderID/complete)
  // Your backend requires designerID in body
  completeOrder(orderID, designerID) {
    return this.request(`/api/orders/${orderID}/complete`, {
      method: "PATCH",
      body: JSON.stringify({ designerID }),
    });
  }

  // Best sellers endpoint you already have
  getBestSellersByType({ from, to } = {}) {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const qs = params.toString();
    return this.request(`/api/orders/best-sellers-by-type${qs ? `?${qs}` : ""}`, {
      method: "GET",
    });
  }
}

// Export a single instance
export const api = new ApiClient(API_BASE_URL);
