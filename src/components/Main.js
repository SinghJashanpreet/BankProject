import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.token == undefined){
      navigate('/')
    }
  },[])
  const LedgerHandler = () => {
    navigate("/login");
  };
  const DayHandler = () => {
    navigate("/daybook");
  };
  const logout = () =>{
    localStorage.removeItem('token');
    alert("Logout Successfull!")
    navigate('/')
  }
  return (
    <>
      <div className="body w-screen h-screen">
      <button
        className="py-3 px-6 bg-white text-[#4070f4] rounded-lg absolute right-4 top-4 font-semibold text-lg"
        onClick={logout}
      >
        Logout
      </button>
        <div className="container">
          <div className="form login flex flex-row justify-around ">
            <button
              className="py-3 px-6 bg-[#4070f4] text-white font-semibold text-lg"
              onClick={DayHandler}
            >
              {" "}
              Day Book
            </button>
            <button
              className="py-3 px-6 bg-[#4070f4] text-white font-semibold text-lg"
              onClick={LedgerHandler}
            >
              Ledger
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
