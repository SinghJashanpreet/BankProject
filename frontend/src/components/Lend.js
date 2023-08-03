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

  return (
    <div className="Lbody">
      <div className="Lcontainer">
        <div className="Lheading">
          <h1 className="text-[34px] font-bold">
            Transactions for Borrow Item ID: {mobileNumber} for Loan:{" "}
            {parseInt(idx) + 1}
          </h1>
        </div>
        <div className="Lamounts">
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                Amount: {transaction.amount} Rs. (Date: {transaction.date}) from
                Loan Number: {parseInt(transaction.num)}
              </li>
            ))}
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
