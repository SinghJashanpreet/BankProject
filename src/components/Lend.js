import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Lend = () => {
  const { mobileNumber, idx} = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    //console.log('Fetching transactions for itemId:', mobileNumber);
  
    axios
      .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.log('Error fetching transactions:', error);
      });
  }, [idx, mobileNumber]);
  

  

  const handleDeduct = () => {
    // Call the backend API to deduct Rs. 100 for the specific borrow item
    axios
    .post(`http://localhost:5000/api/borrow/${mobileNumber}/${idx}`)
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
          num: parseInt(idx)+1
        });
        return updatedTransactions;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <div>
      <h1>Transactions for Borrow Item ID: {mobileNumber} for Loan: {parseInt(idx)+1}</h1>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            Amount: {transaction.amount} Rs. (Date: {transaction.date}) from Loan Number: {parseInt(transaction.num)}
          </li>
        ))}
      </ul>
      <button onClick={handleDeduct}>Deduct Rs. 100</button>
    </div>
  );
};

export default Lend;
