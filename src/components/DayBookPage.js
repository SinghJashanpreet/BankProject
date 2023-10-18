import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DayBookPage() {
  const [enteredDate, setEnteredDate] = useState(null);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/daybookdata/${enteredDate}`);
  };
  return (
    <div className="body">
      <div className="container">
        <div className="form login">
          <div className="flex flex-row justify-evenly">
            <label className="text-lg font-semibold">Enter Date: </label>
            <input
              type="date"
              onChange={(ev) => setEnteredDate(ev.target.value)}
            />
          </div>
          <div className="input-field button">
            <input type="button" value="Enter" onClick={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayBookPage;
