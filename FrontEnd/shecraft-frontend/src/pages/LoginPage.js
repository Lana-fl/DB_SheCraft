// import React, { useState } from "react";
// import "../styles/login.css";
// import Footer from "./Footer";

// export default function LoginPage() {
//   const [activeTab, setActiveTab] = useState("login");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (e, type) => {
//     e.preventDefault();
//     const username = e.target.username?.value.trim();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value.trim();

//     if (type === "signup" && !username) {
//       setErrorMessage("Please enter your name.");
//       return;
//     }

//     if (!email || !password) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     alert(`${type === "login" ? "Login" : "Sign Up"} successful!`);
//     navigate("/orderpage"); 
//  };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         {/* Header tabs */}
//         <div className="tab-header">
//           <div
//             className={`tab ${activeTab === "login" ? "active" : ""}`}
//             onClick={() => { setActiveTab("login"); setErrorMessage(""); }}
//           >
//             Login
//           </div>
//           <div
//             className={`tab ${activeTab === "signup" ? "active" : ""}`}
//             onClick={() => { setActiveTab("signup"); setErrorMessage(""); }}
//           >
//             Sign Up
//           </div>
//         </div>

//         {/* Login Form */}
//         {activeTab === "login" && (
//           <form onSubmit={(e) => handleSubmit(e, "login")}>
//             <input type="email" name="email" placeholder="Email" />
//             <input type="password" name="password" placeholder="Password" />
//             <button type="submit">Login</button>
//           </form>
//         )}

//         {/* Sign Up Form */}
//         {activeTab === "signup" && (
//           <form onSubmit={(e) => handleSubmit(e, "signup")}>
//             <input type="text" name="username" placeholder="Name" />
//             <input type="email" name="email" placeholder="Email" />
//             <input type="password" name="password" placeholder="Password" />
//             <button type="submit">Sign Up</button>
//           </form>
//         )}

//         {errorMessage && <p id="error-message">{errorMessage}</p>}
//       </div>

//       <Footer />
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "../styles/login.css";
import Footer from "./Footer";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // ✅ define navigate here

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const username = e.target.username?.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (type === "signup" && !username) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Clear any previous error
    setErrorMessage("");

    alert(`${type === "login" ? "Login" : "Sign Up"} successful!`);

    // Navigate to OrderPage
    navigate("/orderpage");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header tabs */}
        <div className="tab-header">
          <div
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => { setActiveTab("login"); setErrorMessage(""); }}
          >
            Login
          </div>
          <div
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => { setActiveTab("signup"); setErrorMessage(""); }}
          >
            Sign Up
          </div>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={(e) => handleSubmit(e, "login")}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <form onSubmit={(e) => handleSubmit(e, "signup")}>
            <input type="text" name="username" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        )}

        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </div>

      <Footer />
    </div>
  );
}
