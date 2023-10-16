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
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/daybook" element={<DayBookPage/>} />
      <Route path="/terminationdata" element={<TerminationData/>} />
      <Route path="/daybookdata" element={<DayBookData/>} />
      <Route path="/borrow/:mobileNumber" element={<Borrow />} />
      <Route path="/pastaccount/:mobileNumber" element={<PastAccounts/>} />
      <Route path="/lend/:mobileNumber/:idx" element={<Lend />} />
    </Routes>
  );
};

export default App;
