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
          <label>Enter Date: </label>
          <input
            type="date"
            onChange={(ev) => setEnteredDate(ev.target.value)}
          />
          <div className="input-field button">
            <input type="button" value="Enter" onClick={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayBookPage;
