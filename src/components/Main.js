import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();
    const LedgerHandler = () =>{
        navigate("/login")
    }
    const DayHandler = () =>{
        navigate("/daybook")
    }
  return (
    <div className="body">
      <div className="container">
        <div className="form login flex flex-row justify-around ">
          <button className="py-3 px-6 bg-[#4070f4] text-white font-semibold text-lg" onClick={DayHandler}> Day Book</button>
          <button className="py-3 px-6 bg-[#4070f4] text-white font-semibold text-lg" onClick={LedgerHandler}>Ledger</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
