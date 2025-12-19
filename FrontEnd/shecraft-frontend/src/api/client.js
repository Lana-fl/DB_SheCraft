// // // src/api/client.js
// const API_URL = process.env.REACT_APP_API_URL;
//  // ✅ your backend

// async function request(path, { method = "GET", body } = {}) {
//   const res = await fetch(`${API_URL}${path}`, {
//     method,
//     headers: { "Content-Type": "application/json" },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data.message || "Request failed");
//   return data;
// }

// export const api = {
//   login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
//   signupCustomer: (payload) =>
//     request("/api/auth/signup/customer", { method: "POST", body: payload }),
//   signupDesigner: (payload) =>
//     request("/api/auth/signup/designer", { method: "POST", body: payload }),
// };
// api/client.js
// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// class ApiClient {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;
    
//     const config = {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...options.headers,
//       },
//     };

//     // Add auth token if exists
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(url, config);
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || data.error || "Request failed");
//       }

//       // Store token if provided
//       if (data.token) {
//         localStorage.setItem("authToken", data.token);
//       }

//       return data;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   }

//   // LOGIN - unified endpoint for both roles
//   async login({ role, email, password }) {
//     return this.request("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ role, email, password }),
//     });
//   }

//   // SIGNUP CUSTOMER
//   async signupCustomer({ username, email, password }) {
//     return this.request("/auth/signup/customer", {
//       method: "POST",
//       body: JSON.stringify({ username, email, password }),
//     });
//   }

//   // SIGNUP DESIGNER
//   async signupDesigner({ username, email, password }) {
//     return this.request("/auth/signup/designer", {
//       method: "POST",
//       body: JSON.stringify({ username, email, password }),
//     });
//   }

//   // LOGOUT
//   logout() {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//   }
// }

// export const api = new ApiClient(API_BASE_URL);

// src/api/client.js
// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// class ApiClient {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;

//     const token = localStorage.getItem("token"); // Always use "token"

//     const config = {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...options.headers,
//       },
//     };

//     try {
//       const response = await fetch(url, config);
//       const data = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(data.message || "Request failed");
//       }

//       // Save token & user on login/signup
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }

//       return data;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   }

//   /* ================= AUTH ================= */
//   login(payload) {
//     return this.request("/auth/login", { method: "POST", body: JSON.stringify(payload) });
//   }

//   signupCustomer(payload) {
//     return this.request("/auth/signup/customer", { method: "POST", body: JSON.stringify(payload) });
//   }

//   signupDesigner(payload) {
//     return this.request("/auth/signup/designer", { method: "POST", body: JSON.stringify(payload) });
//   }

//   logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }

//   /* ================= CUSTOMER ================= */
//   // getMyCustomerAccount() {
//   //   // Read from localStorage if exists
//   //   const storedUser = localStorage.getItem("user");
//   //   if (storedUser) return Promise.resolve(JSON.parse(storedUser));
//   //   // Otherwise call backend
//   //   return this.request("/customers/account");
//   // }

//   async getMyCustomerAccount() {
//   // Always fetch fresh data from backend
//   const data = await this.request("/customers/account");
//   // Update localStorage with fresh data
//   localStorage.setItem("user", JSON.stringify(data));
//   return data;
// }
//   updateMyCustomerAccount(payload) {
//     return this.request("/customers/account", { method: "PUT", body: JSON.stringify(payload) });
//   }

//   /* ================= DESIGNERS ================= */
//   getDesigners() {
//     return this.request("/designers");
//   }

//   getDesignerById(id) {
//     return this.request(`/designers/${id}`);
//   }

//   /* ================= ORDERS ================= */
//   createOrder(payload) {
//     return this.request("/orders", { method: "POST", body: JSON.stringify(payload) });
//   }
// }

// export const api = new ApiClient(API_BASE_URL);
// src/api/client.js
//old one 
// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000";

// const TOKEN_KEY = "authToken";

// class ApiClient {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;

//     const config = {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//       },
//     };

//     // ✅ ALWAYS attach token if it exists
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     const response = await fetch(url, config);
//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       throw new Error(data.message || data.error || "Request failed");
//     }

//     // ✅ ONLY store token here (user is handled by useAuth)
//     if (data.token) {
//       localStorage.setItem(TOKEN_KEY, data.token);
//     }

//     return data;
//   }

//   // ================= AUTH =================
//   login({ role, email, password }) {
//     return this.request("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ role, email, password }),
//     });
//   }

//   signupCustomer({ name, email, password }) {
//     return this.request("/api/auth/signup/customer", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password }),
//     });
//   }

//   signupDesigner({ name, email, password, branch }) {
//     return this.request("/api/auth/signup/designer", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password, branch }),
//     });
//   }

//   // ================= PASSWORD =================
//   changePassword({ oldPassword, newPassword }) {
//     return this.request("/api/auth/change-password", {
//       method: "PUT",
//       body: JSON.stringify({ oldPassword, newPassword }),
//     });
//   }

//   // ================= ACCOUNT =================
//   updateCustomerAccount({
//     firstName,
//     lastName,
//     countryCode,
//     phoneNb,
//     email,
//   }) {
//     return this.request("/api/customers/account", {
//       method: "PUT",
//       body: JSON.stringify({
//         firstName,
//         lastName,
//         countryCode,
//         phoneNb,
//         email,
//       }),
//     });
//   }

// getMyAccount() {
//   return this.request("/api/customers/account", {
//     method: "GET",
//   });
// }

// getMyDesignerAccount() {
//   return this.request("/api/designers/account");
// }

// updateDesignerAccount({ name, branch, countryCode, phoneNb, email }) {
//   return this.request("/api/designers/account", {
//     method: "PUT",
//     body: JSON.stringify({ name, branch, countryCode, phoneNb, email }),
//   });
// }



//   // ❌ NO logout() here anymore
//   // Logout is handled ONLY by useAuth.logout()
// }


// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const TOKEN_KEY = "authToken";

// class ApiClient {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${this.baseURL}${endpoint}`;
//     const config = {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//       },
//     };

//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) config.headers.Authorization = `Bearer ${token}`;

//     const res = await fetch(url, config);
//     const data = await res.json().catch(() => ({}));

//     if (!res.ok) throw new Error(data.message || data.error || "Request failed");

//     if (data.token) localStorage.setItem(TOKEN_KEY, data.token);

//     return data;
//   }

//   // Auth
//   login({ role, email, password }) {
//     return this.request("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ role, email, password }),
//     });
//   }

//   signupCustomer({ name, email, password }) {
//     return this.request("/api/auth/signup/customer", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password }),
//     });
//   }

//   signupDesigner({ name, email, password, branch }) {
//     return this.request("/api/auth/signup/designer", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password, branch }),
//     });
//   }

//   // Customer
//   getMyCustomerAccount() {
//     return this.request("/api/customers/account", { method: "GET" });
//   }

//   // Designers
//   getDesigners() {
//     return this.request("/api/designers", { method: "GET" });
//   }

//   // Orders
//   createOrder(orderPayload) {
//     return this.request("/api/orders", {
//       method: "POST",
//       body: JSON.stringify(orderPayload),
//     });
//   }
// }

// // Export a single instance
// export const api = new ApiClient(API_BASE_URL);


// src/api/client.js

// const API_BASE = "http://localhost:5000"; // change if needed

// async function request(path, { method = "GET", body, headers } = {}) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(headers || {}),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     // backend often sends { message: "..." }
//     throw new Error(data?.message || `Request failed (${res.status})`);
//   }

//   return data;
// }

// export const api = {
//   // ✅ sends the body EXACTLY like backend expects (top-level keys)
//   createOrder(payload) {
//     return request("/api/orders", { method: "POST", body: payload });
//   },

//   // keep your other API methods here...
// };

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

  // Auth
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

  // Customer
  getMyCustomerAccount() {
    return this.request("/api/customers/account", { method: "GET" });
  }

  // Designers
  getDesigners() {
    return this.request("/api/designers", { method: "GET" });
  }

  // Orders
  createOrder(orderPayload) {
    return this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload),
    });
  }
}

// Export a single instance
export const api = new ApiClient(API_BASE_URL);