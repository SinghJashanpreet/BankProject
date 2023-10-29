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
      // .get(`https://bank-backend7.onrender.com/api/borrow/${mobileNumber}`)
      // .get(`http://localhost:5000/api/borrow/${mobileNumber}`)
      .get(window.backendUrl + `borrow/${mobileNumber}`)
      .then((response) => {
        // console.log(
        //   response.data.amountArray.filter((arr) => {
        //     console.log(arr.id, "  ", (idx));
        //     return arr.id == (idx) ;
        //   })
        // );
        setTransactions(
          response.data.amountArray.filter((arr) => {
            return arr.id == idx;
          })
        );
        // console.log(
        //   response.data.amountArray.filter((arr) => {
        //     return arr.id == idx;
        //   })[0].Transactions
        // );
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, [idx, mobileNumber, transactions]);

  const handleDeduct = () => {
    const deductAm = prompt("Enter Amount to Deduct: ");
    if (deductAm === null) return;
    if (deductAm !== null) {
      // Call the backend API to deduct Rs. 100 for the specific borrow item
      axios
        .post(
          // `https://bank-backend7.onrender.com/api/borrow/${mobileNumber}/${idx}`
          // `http://localhost:5000/api/borrow/${mobileNumber}/${idx}`,
          window.backendUrl + `borrow/${mobileNumber}/${idx}`,
          {
            deductAm: deductAm,
          }
        )
        .then((response) => {
          //console.log(response);
          // Update the transactions with the updated item from the response
          setTransactions((prevTransactions) => {
            const updatedTransactions = [...prevTransactions];
            const currentDate = new Date().toLocaleDateString();

            // Add a new transaction to the array with the deducted amount and current date
            updatedTransactions.push({
              amount: -deductAm, // Deducted amount
              date: currentDate, // Current date
            });
            return updatedTransactions;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <h1 className="text-[35px] font-semibold underline">
            Transactions : ({mobileNumber})<br></br>
          </h1>
        </div>
        <div className="Lamounts example">
          <ul>
            {/* {transactions.map((transaction, index) => (
              <li key={index} style="list-style-type:disc">
                Amount: {transaction.amount} Rs. (Date: {transaction.date})
                Loan Number: {(transaction.num)}
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
                    Sr. No.
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                    Lend
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length !== 0 &&
                  transactions[0].Transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {transaction.amount} Rs.
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                        {convertDateFormat(transaction.date)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </ul>
        </div>
        <div className="Linput-field button">
          <input type="button" value="Deduct" onClick={handleDeduct} />
        </div>
      </div>
    </div>
  );
};

export default Lend;
