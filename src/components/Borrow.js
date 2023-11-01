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
  const [lend, setLend] = useState(0);
  const [ProfitTill, setProfitTill] = useState(0);
  const [error, setError] = useState("");
  const [idFromArray, setIdFromArray] = useState("");
  const [names, setName] = useState("");
  const navigate = useNavigate();
  const [shouldDecrement, setShouldDecrement] = useState([]);
  const [automate, setAutomate] = useState(false);
  useEffect(() => {
    // Fetch the borrow details from the backend API
    axios
      // .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
      // .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
      .get(window.backendUrl + `borrow/${mobileNumber}`)
      .then((response) => {
        const filteredAmountArray = response.data.amountArray.filter((arr) => {
          return arr.Remaining > 0;
        });
        const filteredPastAmountArray = response.data.amountArray.filter(
          (arr) => {
            //console.log()
            return (
              arr.Remaining <= 0 ||
              get100thDayExcludingSundays(
                new Date(arr.DateBorrow).toLocaleDateString()
              ) < new Date().toLocaleDateString()
            );
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

        const totalBorrow = response.data.amountArray.reduce(
          (total, amount) => total + amount.TotalBorrow,
          0
        );

        //setLend();
        const profit = (totalBorrow * 10) / 9 - totalBorrow;
        setProfitTill(profit);
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

  // const toggleDecrement = async (idx) => {
  //   try {
  //     // const response = await fetch("http://localhost:5000/toggle-decrement", {
  //     // const response = await fetch(window.backendUrl + "toggle-decrement", {
  //     //   mobileNumber: mobileNumber,
  //     //   method: "POST",
  //     // });
  //     // if (response.ok) {
  //     //   setShouldDecrement(!shouldDecrement);
  //     // } else {
  //     //   // Handle the response if there's an error
  //     //   console.error("Request failed with status: " + response.status);
  //     // }

  //     setShouldDecrement(!shouldDecrement[idx]);
  //   } catch (error) {
  //     // Handle any other errors
  //     console.error("An error occurred:", error);
  //   }
  // };

  const handleBorrow = () => {
    const borrowAmount = prompt("Enter the Amount to borrow: ");

    if (borrowAmount === null) return;

    let maturityAmount = (borrowAmount * 10) / 9;

    if (borrowAmount !== null) {
      // Call the backend API to store the borrow details
      axios
        // .post(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`, {
        // .post(`http://localhost:5000/api/borrow/${mobileNumber}`, {
        .post(window.backendUrl + `borrow/${mobileNumber}`, {
          amount: borrowAmount,
          maturityAmount: maturityAmount - maturityAmount / 100,
          Automate: false,
        })
        .then(() => {
          // Fetch the updated borrow details from the backend API
          axios
            // .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
            // .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
            .get(window.backendUrl + `borrow/${mobileNumber}`)
            .then((response) => {
              const filteredAmountArray = response.data.amountArray.filter(
                (arr) => {
                  return arr.Remaining > 0;
                }
              );

              //   let idxNew = filteredAmountArray[filteredAmountArray.length - 1].id

              // axios
              //   .post(
              //     // `https://bank-backend7.onrender.com/api/borrow/${mobileNumber}/${idx}`
              //     // `http://localhost:5000/api/borrow/${mobileNumber}/${idx}`,
              //     window.backendUrl + `borrow/${mobileNumber}/${idxNew}`,
              //     {
              //       deductAm: maturityAmount / 100,
              //     }
              //   )
              //   .then((response) => {
              //     //console.log(response);
              //     // Update the transactions with the updated item from the response
              //     // setTransactions((prevTransactions) => {
              //     //   const updatedTransactions = [...prevTransactions];
              //     //   const currentDate = new Date().toLocaleDateString();

              //     //   // Add a new transaction to the array with the deducted amount and current date
              //     //   updatedTransactions.push({
              //     //     amount: -(parseInt(maturityAmount) / 100), // Deducted amount
              //     //     date: currentDate, // Current date
              //     //   });
              //     //   return updatedTransactions;
              //     // });
              //     console.log("*first emi deducted*");
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });

              setIdFromArray(
                filteredAmountArray[filteredAmountArray.length - 1].id
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
              const totalBorrow = response.data.amountArray.reduce(
                (total, amount) => total + amount.TotalBorrow,
                0
              );
              const profit = (totalBorrow * 10) / 9 - totalBorrow;
              setProfitTill(profit);
              setTotalAmount(total);

              setError("");
            })
            .catch((error) => {
              console.log(error);
              setError(
                "Error fetching borrow details. Please try again later."
              );
            });

          //console.log("idx to be updated is: ", idFromArray , "maturity is : " , (maturityAmount) / 100);
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

    if (Nname === null) return;

    axios
      // .post(`http://localhost:5000/api/namechange/${mobileNumber}/${Nname}`)
      .post(window.backendUrl + `namechange/${mobileNumber}/${Nname}`)

      .then(() => {
        console.log("Name changed to ", Nname);
        // Update the names state with the new name
        setName(Nname);
        navigate(`/login`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const lendAmount = 30000;

  useEffect(() => {
    if (borrowList?.amountArray?.length !== undefined) {
      var booleanArray = new Array(borrowList.amountArray.length).fill(false);
      setShouldDecrement(booleanArray);
    }
  }, [borrowList]);

  return (
    <div className="Bbody">
      <div className="Bcontainer example">
        <div className="Bheading">
          <div className="flex flex-row justify-between">
            <h1 className="text-[35px] font-semibold underline">
              Borrow Money : ({names})
            </h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="border-2 border-black rounded-xl p-2">
              <h3 className="text-[22px] font-medium">
                Total Outstanding: {totalAmount} Rs.
              </h3>
              {/* <h3 className="text-[22px] font-bold">
            Lend Amount: {lendAmount} Rs.
            </h3> */}
              <h3 className="text-[22px] font-medium">
                Profit Till: {ProfitTill} Rs.
              </h3>
            </div>
          </div>
        </div>
        <div className="Bamounts">
          {/* <h2>Borrow List</h2> */}
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
                      {/* <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Automate
                      </th> */}
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
                        <tr
                          key={subIndex}
                          className={
                            amount.Automate == true ? "bg-green-200" : ""
                          }
                        >
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
                          {/* <td
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <button
                              // onClick={() =>
                              //   setShouldDecrement((prevState) => {
                              //     const newArray = [...prevState]; // Create a copy of the current state array
                              //     newArray[subIndex] = !newArray[subIndex]; // Toggle the value at the specified index
                              //     return newArray; // Set the new array as the updated state
                              //   })
                              //}
                            >
                              {amount.Automate === true ? "on" : "off"}
                            </button>
                          </td> */}
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
          className="bg-[#4070f4] text-white font-medium py-3 px-2 rounded-lg fixed left-[12%] bottom-[13%]"
        >
          View Past Account
        </button>

        <button
          onClick={HandleNameChange}
          className="bg-[#4070f4] text-white font-medium py-3 px-2 rounded-lg fixed left-[12%] bottom-[22%]"
        >
          Edit Name
        </button>
      </div>
    </div>
  );
};

export default Borrow;
