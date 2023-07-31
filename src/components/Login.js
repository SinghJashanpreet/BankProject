import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      // Call the backend API for login with the correct URL
      const response = await axios.post("https://bank-backend7.onrender.com/api/login", {
        mobileNumber,
      });
      
      if (response.status === 200) {
        // Login successful, navigate to the Borrow component
        navigate(`/borrow/${mobileNumber}`, { state: { user: response.data.user } });
      } else {
        // Login failed, display the error message
        setError(response.data.error);

        // If mobile number not found, navigate to the registration page
        if (response.status === 404) {
          navigate("/register");
        }
      }
    } catch (error) {
      // Handle any other errors that may occur during login
      navigate("/register");
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
