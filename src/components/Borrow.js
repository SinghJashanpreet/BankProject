import React, { useEffect, useState } from "react";

import "../css/Borrow.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Borrow = () => {
  const { mobileNumber } = useParams();
  const [borrowList, setBorrowList] = useState([]);
  const [PastList, setPastList] = useState([]);
  // const [List, setBorrowList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [names, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the borrow details from the backend API
    axios
      // .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
      .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
      .then((response) => {
        const filteredAmountArray = response.data.amountArray.filter((arr) => {
          return arr.Remaining > 0;
        });
        const filteredPastAmountArray = response.data.amountArray.filter(
          (arr) => {
            return arr.Remaining <= 0;
          }
        );
        // Update borrowList using the filtered amountArray
        setBorrowList({
          ...response.data,
          amountArray: filteredAmountArray,
        });
        setName(response.data.name);

        setPastList({
          ...response.data,
          amountArray: filteredPastAmountArray,
        });
        // Calculate the total amount dynamically based on the borrow list
        const total = response.data.amountArray.reduce(
          (total, amount) => total + amount.Remaining,
          0
        );

        setTotalAmount(total);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching borrow details. Please try again later.");
      });
  }, [names]);

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

  const handleBorrow = () => {
    const borrowAmount = prompt("Enter the Amount to borrow: ");
    if (borrowAmount !== null) {
      // Call the backend API to store the borrow details
      axios
        // .post(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`, {
        .post(`http://localhost:5000/api/borrow/${mobileNumber}`, {
          amount: borrowAmount,
        })
        .then(() => {
          // Fetch the updated borrow details from the backend API
          axios
            // .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
            .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
            .then((response) => {
              const filteredAmountArray = response.data.amountArray.filter(
                (arr) => {
                  return arr.Remaining > 0;
                }
              );
              // Update borrowList using the filtered amountArray
              setBorrowList({
                ...response.data,
                amountArray: filteredAmountArray,
              });
              // Calculate the total amount dynamically based on the updated borrow list
              const total = response.data.amountArray.reduce(
                (total, amount) => total + amount.Remaining,
                0
              );
              setTotalAmount(total);
             
              setError("");
            })
            .catch((error) => {
              console.log(error);
              setError(
                "Error fetching borrow details. Please try again later."
              );
            });
        })
        .catch((error) => {
          console.log(error);
          setError("Error borrowing money. Please try again later.");
        });
    }
  };

  const handleLendClick = (item, idx) => {
    // Redirect to the Lend component with the selected borrow item's details
    navigate(`/lend/${mobileNumber}/${idx}`);
  };

  const HandleNameChange = async () => {
    const Nname = prompt("Enter New Name: ");
    axios
      .post(`http://localhost:5000/api/namechange/${mobileNumber}/${Nname}`)
      .then(() => {
        console.log("Name changed to ", Nname);
        // Update the names state with the new name
        setName(Nname);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const lendAmount = 25000;

  return (
    <div className="Bbody">
      <div className="Bcontainer example">
        <div className="Bheading">
          <h1 className="">Borrow Money ({names})</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h3 className="text-[22px] font-bold">
            Total Outstanding: {totalAmount} Rs.
          </h3>
          <h3 className="text-[22px] font-bold">
            Lend Amount: {lendAmount} Rs.
          </h3>
          <h3 className="text-[22px] font-bold">
            Profit Till: {totalAmount - lendAmount} Rs.
          </h3>
        </div>
        <div className="Bamounts">
          <h2>Borrow List</h2>
          <ul className="ull">
            {/* {console.log(borrowList)} */}
            {borrowList?.length === 0 ? (
              <h1>Loading...</h1>
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
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Automate
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {/* {console.log(borrowList)} */}
                  <tbody>
                    {borrowList?.length === 0 ? (
                      <h1>Loading...</h1>
                    ) : (
                      borrowList.amountArray.map((amount, subIndex) => (
                        <tr key={subIndex}>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {subIndex + 1}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {/* {convertDateFormat(borrowList.dateArray[subIndex+1])} */}
                            {convertDateFormat(amount.DateBorrow)}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {amount.TotalBorrow} Rs.
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {amount.Remaining} Rs.
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {get100thDayExcludingSundays(amount.DateBorrow)}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            on/off
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <button
                              className="viewB"
                              onClick={() =>
                                handleLendClick(borrowList, amount.id)
                              }
                            >
                              View Transactions
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>{" "}
              </>
            )}
            {/*  */}
          </ul>
        </div>
        <div className="Bbutton">
          <input type="button" value="Borrow" onClick={handleBorrow} />
        </div>

        <button
          onClick={() =>
            navigate(`/pastaccount/${mobileNumber}`, {
              state: { pastList: PastList },
            })
          }
        >
          View Past Account
        </button>

        <button onClick={HandleNameChange}>Edit Name</button>
      </div>
    </div>
  );
};

export default Borrow;
