import React, { useState } from "react";
import bgimg from "../css/6284.jpg";
import { useNavigate } from "react-router-dom";
// import * as JWT from "jwt-decode";
// import jwtDecode from "jwt-decode";
// import JWT from "jsonwebtoken"
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the login data to the backend API
    const response = await fetch(window.backendUrl + "authLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.token) {
        // Verify the token
        try {
          localStorage.setItem("token", data.token);
          navigate("/main");
        } catch (error) {
          // Token is invalid
          alert("Token verification failed");
        }
      } else {
        // Token is missing
        alert("Token not received");
      }
    } else {
      // Handle login failure
      alert("Login failed");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgimg})` }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      <form className="bg-white w-full sm:w-96 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full py-2 px-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-3 border rounded-lg"
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={handlePasswordToggle}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
