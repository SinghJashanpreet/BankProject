import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Register";
import Borrow from "./components/Borrow";
import Lend from "./components/Lend";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/borrow/:mobileNumber" element={<Borrow />} />
      <Route path="/lend/:mobileNumber/:idx" element={<Lend />} />
    </Routes>
  );
};

export default App;
