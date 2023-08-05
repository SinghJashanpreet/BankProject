import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Lend.css";
import { useParams } from "react-router-dom";

const Lend = () => {
  const { mobileNumber, idx } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    //console.log('Fetching transactions for itemId:', mobileNumber);

    axios
      .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, [idx, mobileNumber]);

  const handleDeduct = () => {
    // Call the backend API to deduct Rs. 100 for the specific borrow item
    axios
      .post(
        `https://bank-backend7.onrender.com/api/borrow/${mobileNumber}/${idx}`
      )
      .then((response) => {
        //console.log(response);
        // Update the transactions with the updated item from the response
        setTransactions((prevTransactions) => {
          const updatedTransactions = [...prevTransactions];
          const currentDate = new Date().toLocaleDateString();

          // Add a new transaction to the array with the deducted amount and current date
          updatedTransactions.push({
            amount: -100, // Deducted amount
            date: currentDate, // Current date
            num: parseInt(idx) + 1,
          });
          return updatedTransactions;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function convertDateFormat(inputDate) {
    var parts = inputDate.split("/");
    var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
    return formattedDate;
  }

  return (
    <div className="Lbody">
      <div className="Lcontainer example">
        <div className="Lheading">
          <h1 className="text-[34px] font-bold">
            Transactions for Borrow Item ID: {mobileNumber}
            <br></br>
            Loan No. : {parseInt(idx) + 1}
          </h1>
        </div>
        <div className="Lamounts example">
          <ul>
            {/* {transactions.map((transaction, index) => (
              <li key={index} style="list-style-type:disc">
                Amount: {transaction.amount} Rs. (Date: {transaction.date}) 
                Loan Number: {parseInt(transaction.num)}
              </li>
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
                    Amount
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                    Date
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                    Loan Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                      {transaction.amount} Rs.
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                      {convertDateFormat(transaction.date)}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                      {parseInt(transaction.num)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
        <div className="Linput-field button">
          <input type="button" value="Deduct Rs. 100" onClick={handleDeduct} />
        </div>
      </div>
    </div>
  );
};

export default Lend;
