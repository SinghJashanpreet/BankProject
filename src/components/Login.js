import React, { useState } from "react";
import axios from "axios";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [enteredDate, setEnteredDate] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      // Call the backend API for login with the correct URL
      // const response = await axios.post("https://bank-backend7.onrender.com/api/login", {
      // const response = await axios.post("http://localhost:5000/api/login", {
      const response = await axios.post("https://bank-backend7.onrender.com/api/login", {
        mobileNumber,
        name,
        selectedDate,
      });

      if (response.status === 200) {
        // Login successful, navigate to the Borrow component
        if (name)
          navigate(`/borrow/${name}`, {
            state: { user: response.data.user },
          });
        else if(mobileNumber)
          navigate(`/borrow/${mobileNumber}`, {
            state: { user: response.data.user },
          });
        else
          navigate(`/borrow/${selectedDate}`, {
            state: { user: response.data.user },
          });
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
    <div className="body">
      <div className="container">
        <div className="form login">
          <span className="title">Search User</span>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form action="#">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter Name "
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field button">
              <input type="button" value="Search" onClick={handleLogin} />
            </div>
          </form>
        </div>

        <div className="form login">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form action="#">
            <div className="input-field">
              <input
                type="date"
                placeholder="Enter Termination Date "
                required
                value={selectedDate}
                onChange={(ev) => setEnteredDate(ev.target.value)}
              />
            </div>
            <div className="input-field button">
              <input
                type="button"
                value="Search"
                onClick={()=>navigate(`/terminationdata/${enteredDate}`)}
              />
            </div>
          </form>
        </div>

        {/* <div className="form login">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form action="#">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter Mobile Number "
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="input-field button">
              <input type="button" value="Search" onClick={handleLogin} />
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import "../css/Login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [Tdate, setTdate] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setError("");

//     try {
//       // Call the backend API for login with the correct URL
//       if (mobileNumber != "") {
//         const response = await axios.post(
//           "https://bank-backend7.onrender.com/api/login",
//           {
//             mobileNumber,
//           }
//         );

//         if (response.status === 200) {
//           // Login successful, navigate to the Borrow component
//           navigate(`/borrow/${mobileNumber}`, {
//             state: { user: response.data.user },
//           });
//         } else {
//           // Login failed, display the error message
//           setError(response.data.error);

//           // If mobile number not found, navigate to the registration page
//           if (response.status === 404) {
//             navigate("/register");
//           }
//         }

//       } else if (Tdate != "") {
//         const response = await axios.post(
//           "https://bank-backend7.onrender.com/api/login",
//           {
//             Tdate,
//           }
//         );

//         if (response.status === 200) {
//           // Login successful, navigate to the Borrow component
//           navigate(`/borrow/${mobileNumber}`, {
//             state: { user: response.data.user },
//           });
//         } else {
//           // Login failed, display the error message
//           setError(response.data.error);

//           // If mobile number not found, navigate to the registration page
//           if (response.status === 404) {
//             navigate("/register");
//           }
//         }

//       }
//     } catch (error) {
//       // Handle any other errors that may occur during login
//       navigate("/register");
//       console.error("Error during login:", error);
//       setError("An error occurred during login");
//     }
//   };

//   return (
//     <div className="body">
//       <div className="container">
//         <div className="form login">
//           <span className="title">Search User</span>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <form action="#">
//             <div className="input-field">
//               <input
//                 type="text"
//                 placeholder="Enter Mobile Number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//               />
//             </div>
//             <h2 class="hr-lines">OR</h2>
//             <div className="input-field">
//               <input
//                 type="date"
//                 placeholder="Enter Termination Date (MM/DD/YYYY) "
//                 value={Tdate}
//                 onChange={(e) => setTdate(e.target.value)}
//               />
//             </div>
//             <div className="input-field button">
//               <input type="button" value="Search" onClick={handleLogin} />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
