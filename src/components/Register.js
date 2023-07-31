import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    // Validate that all fields are filled
    if (!name || !mobileNumber) {
      setError("Please fill in all fields.");
      return;
    }

    // Send a POST request to register the new user
    axios
      .post("https://bank-backend7.onrender.com/api/register", {
        name,
        mobileNumber,
      })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        navigate('/');
        // Handle successful registration
      })
      .catch((error) => {
        console.log("Error registering user:", error);
        setError("Error registering user. Please try again later.");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
