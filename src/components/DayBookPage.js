import React from 'react'
import { useNavigate } from 'react-router-dom'

function DayBookPage() {
    const navigate = useNavigate();
    const clickHandler = () =>{
        navigate("/daybookdata")
    }
  return (
    <div className="body">
      <div className="container">
        <div className="form login">
            <label>Enter Date: </label>
            <input type='date'/>
            <div className="input-field button">
              <input type="button" value="Enter" onClick={clickHandler}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DayBookPage