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
      const response = await axios.post("http://localhost:5000/api/login", {
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
    <div className="bg-my  h-screen flex flex-col justify-center bg-cover  text-slate-100 " >
    <div className="border-2  border-red-500 shadow-lg flex flex-col absolute" >
    </div>
      <h2 className="font-bold text-[50px] flex justify-center my-[30px] items-center">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input className="text-slate-900 w-max mx-auto my-[30px] rounded-md border-transparent p-[10px] px-[50px]"
        type="text"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button className="text-md border-solid border-2  mx-auto  p-[5px] px-[30px] rounded-lg  hover:bg-red-600 py-2  " onClick={handleLogin}>Login</button>
      
    </div>
  );
};

export default Login;
