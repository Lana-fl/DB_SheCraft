
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
    method: "PUT", 
    body: JSON.stringify(payload),
  });
}

changePassword(payload) {
  return this.request("/api/auth/change-password", {
    method: "PUT", 
    body: JSON.stringify(payload), // { oldPassword, newPassword }
  });
}

  getMyDesignerAccount() {
    return this.request("/api/designers/account", { method: "GET" });
  }

updateMyDesignerAccount(payload) {
  return this.request("/api/designers/account", {
    method: "PUT", 
    body: JSON.stringify(payload),
  });
}
  // ---------------- DESIGNERS ----------------
  getDesigners() {
    return this.request("/api/designers", { method: "GET" });
  }

  // ---------------- ORDERS ----------------

  
  createOrder(orderPayload) {
    return this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload),
    });
  }

  
  getAllOrders() {
    return this.request("/api/orders", { method: "GET" });
  }

  
  getOrdersByCustomer(customerID) {
    return this.request(`/api/orders/customer/${customerID}`, { method: "GET" });
  }

  
  getOrderDetails(orderID) {
    return this.request(`/api/orders/${orderID}`, { method: "GET" });
  }

 
  completeOrder(orderID, designerID) {
    return this.request(`/api/orders/${orderID}/complete`, {
      method: "PATCH",
      body: JSON.stringify({ designerID }),
    });
  }

 
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


export const api = new ApiClient(API_BASE_URL);
