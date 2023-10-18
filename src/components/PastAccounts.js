import React from "react";
import { useLocation } from "react-router-dom";

function convertDateFormat(inputDate) {
  var parts = inputDate.split("/");
  var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
  return formattedDate;
}
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
  var parts = startDate.toLocaleDateString().split("/");
  var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
  return formattedDate;
}

function PastAccounts() {
  const location = useLocation();
  // Access the pastList from the location state
  const borrowList = location.state?.pastList || [];
  //console.log(borrowList);
  return (
    <div className="Bbody">
      <div className="Bcontainer example">
        <div className="Bamounts">
          <h2>Past Accounts List</h2>
          <ul className="ull">
            {/* {console.log(borrowList)} */}
            {borrowList.length == 0 ? (
              <h1></h1>
            ) : (
              <>
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
                        Sr No.
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Date Borrow
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Amount Borrow
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Amount Remaining
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Date Maturity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowList.amountArray.map((amount, subIndex) => (
                      <tr key={subIndex}>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {subIndex + 1}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {convertDateFormat(amount.DateBorrow)}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {amount.TotalBorrow} Rs.
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {amount.Remaining} Rs.
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {get100thDayExcludingSundays(amount.DateBorrow)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </>
            )}
            {/*  */}
          </ul>
        </div>
        <div className="Bbutton">
          <input type="button" value="Go Back" />
        </div>
      </div>
    </div>
  );
}

export default PastAccounts;
