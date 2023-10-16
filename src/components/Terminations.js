import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Terminations() {
  var { dates } = useParams();
  dates = new Date(dates);
  dates = dates.toLocaleDateString();
  const [error, setError] = useState("");
  const [List, setList] = useState([]);
  useEffect(() => {
    // Fetch the borrow details from the backend API
    axios
      .get(`http://127.0.0.1:5000/api/borrow/`)
      .then((response) => {
        setList(response.data);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching borrow details. Please try again later.");
      });
  }, []);

  function get100thDayExcludingSundays(startDateStr) {
    const startDate = new Date(startDateStr);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    let count = 0;

    while (count < 100) {
      startDate.setTime(startDate.getTime() + oneDayInMilliseconds);

      if (startDate.getDay() !== 0) {
        count++;
      }
    }
    if (startDate.getDay() == 0)
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
    else if (startDate.getDay() == 1) {
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
    }
    return startDate;
  }

  return (
    <div>
      <div className="Bbody">
        <div className="Bcontainer example">
          <div className="Bheading">
            <h1 className="" style={{ fontSize: "50px" }}>
              Terminations
            </h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="Bamounts">
            <ul className="ull">
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Name
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Loan Number
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Amount
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Principal
                    </th>
                  </tr>
                </thead>
                {/* const processedData = response.data.map((obj, index) => {
          if (obj.dateArray.length != 0) {
            console.log(obj.name, obj.mobileNumber);
            obj.dateArray.map((d, idx) => {
              const temp = get100thDayExcludingSundays(d).toLocaleDateString();
              if (dates == temp) console.log("Termintion : ",temp, " loan number: ", idx+1);
            });
          }
          return obj;
        });   */}

                {/* <tbody>
                  {List.map((obj, index) => {
                    return obj.dateArray
                      .filter((d) => {
                        const temp =
                          get100thDayExcludingSundays(d).toLocaleDateString();
                        return dates === temp;
                      })
                      .map((d, idx) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {obj.name}
                          </td>

                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {idx + 1}
                          </td>

                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {obj.mobileNumber}
                          </td>

                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            
                          </td>
                        </tr>
                      ));
                  })}
                </tbody> */}
              </table>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminations;
