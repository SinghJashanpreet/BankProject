import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Register";
import Borrow from "./components/Borrow";
import Lend from "./components/Lend";
import Main from "./components/Main";
import DayBookPage from "./components/DayBookPage";
import DayBookData from "./components/DayBookData";
import TerminationData from "./components/TerminationData";
import PastAccounts from "./components/PastAccounts";

const App = () => {
  window.backendUrl = `https://bank-backend7.onrender.com/api/`;
  window.backendUrlWithoutApi = `https://bank-backend7.onrender.com/`;
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daybook" element={<DayBookPage />} />
      <Route
        path="/terminationdata/:enteredDate"
        element={<TerminationData />}
      />
      <Route path="/daybookdata/:enteredDate" element={<DayBookData />} />
      <Route path="/borrow/:mobileNumber" element={<Borrow />} />
      <Route path="/pastaccount/:mobileNumber" element={<PastAccounts />} />
      <Route path="/lend/:mobileNumber/:idx" element={<Lend />} />
    </Routes>
  );
};

export default App;
