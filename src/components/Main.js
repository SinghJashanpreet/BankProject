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
        <div className="form login">
          <button className="py-3 px-6" onClick={DayHandler}> Day Book</button>
          <button className="py-3 px-6" onClick={LedgerHandler}>Ledger</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
