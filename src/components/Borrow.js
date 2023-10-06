import React, { useEffect, useState } from "react";
import "../css/Borrow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Borrow = () => {
  const { mobileNumber } = useParams();
  const [borrowList, setBorrowList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the borrow details from the backend API
    axios
      .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
      .then((response) => {
        setBorrowList(response.data);
        setName(response.data.name);
        // Calculate the total amount dynamically based on the borrow list
        const total = response.data.amountArray.reduce(
          (total, amount) => total + amount,
          0
        );

        setTotalAmount(total);
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

  const handleBorrow = () => {
    const borrowAmount = 9900;
    // Call the backend API to store the borrow details
    axios
      .post(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`, {
        amount: borrowAmount,
      })
      .then(() => {
        // Fetch the updated borrow details from the backend API
        axios
          .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
          .then((response) => {
            setBorrowList(response.data);
            // Calculate the total amount dynamically based on the updated borrow list
            const total = response.data.amountArray.reduce(
              (total, amount) => total + amount,
              0
            );
            setTotalAmount(total);
            setError("");
          })
          .catch((error) => {
            console.log(error);
            setError("Error fetching borrow details. Please try again later.");
          });
      })
      .catch((error) => {
        console.log(error);
        setError("Error borrowing money. Please try again later.");
      });
  };

  const handleLendClick = (item, idx) => {
    // Redirect to the Lend component with the selected borrow item's details
    navigate(`/lend/${mobileNumber}/${idx}`);
  };
  
  function convertDateFormat(inputDate) {
    var parts = inputDate.split("/");
    var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
    return formattedDate;
  }

  return (
    <div className="Bbody">
      <div className="Bcontainer example">
        <div className="Bheading">
          <h1 className="">Borrow Money ({name})</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h3 className="text-[22px] font-bold">
            Total Outstanding: {totalAmount} Rs.
          </h3>
        </div>
        <div className="Bamounts">
          <h2>Borrow List</h2>
          <ul className="ull">
            {/* {console.log(borrowList)} */}
            {borrowList.length == 0 ? (
              <h1></h1>
            ) : (
              <>
                {/* {borrowList.amountArray.map((amount, subIndex) => (
                  <ol>
                    <li value={subIndex + 1}>
                      <div key={subIndex}>
                        Amount: {amount} Rs || Date:{" "}
                        {borrowList.dateArray[subIndex]}
                        {" "}|| Termination Date:{" "}
                        {get100thDayExcludingSundays(
                          borrowList.dateArray[subIndex]
                        ).toLocaleDateString()}
                        <button className="viewB"
                          onClick={() => handleLendClick(borrowList, subIndex)}
                        >
                          View Transactions
                        </button>
                      </div>
                    </li>
                  </ol>
                ))} */}
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
                        Loan No.
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Amount
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Start Date
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Termination Date
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowList.amountArray.map((amount, subIndex) => (
                      <tr key={subIndex}>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {subIndex+1}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {amount} Rs.
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {convertDateFormat(borrowList.dateArray[subIndex])}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {convertDateFormat(
                            get100thDayExcludingSundays(
                              borrowList.dateArray[subIndex]
                            ).toLocaleDateString()
                          )}
                        </td>
                        <td
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          <button
                            className="viewB"
                            onClick={() =>
                              handleLendClick(borrowList, subIndex)
                            }
                          >
                            View Transactions
                          </button>
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
          <input type="button" value="Borrow Rs. 9000" onClick={handleBorrow} />
        </div>
      </div>
    </div>
  );
};

export default Borrow;

// <table>
//   <thead>
//     <tr>
//       <th>Amount</th>
//       <th>Date</th>
//       <th>Termination Date</th>
//       <th>Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {borrowList.amountArray.map((amount, subIndex) => (
//       <tr key={subIndex}>
//         <td>{amount} Rs.</td>
//         <td>{borrowList.dateArray[subIndex]}</td>
//         <td>
//           {get100thDayExcludingSundays(
//             borrowList.dateArray[subIndex]
//           ).toLocaleDateString()}
//         </td>
//         <td>
//           <button className="viewB" onClick={() => handleLendClick(borrowList, subIndex)}>
//             View Transactions
//           </button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
