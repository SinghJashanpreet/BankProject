import React, { useState } from "react";
import "../css/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
></link>;

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
      // .post("http://localhost:5000/api/register", {
      .post(window.backendUrl + "register", {
        name,
        mobileNumber,
      })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        navigate('/login');
        // Handle successful registration
      })
      .catch((error) => {
        console.log("Error registering user:", error);
        setError("Error registering user. Please try again later.");
      });
  };

  return (
    <div className="body">
      <div className="conatiner">
        <div className="form register">
          <span className="title">Register</span>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form action="#">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your name"
                required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <i class="uil uil-mobile-android"></i>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="input-field button" onClick={handleRegister}>
              <input type="button" value="Register"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;










  