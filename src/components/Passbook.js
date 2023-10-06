// Passbook.js
import React from 'react';

const Passbook = ({ transactions }) => {
  return (
    <div>
      <h2>Passbook Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  );
};

export default Passbook;
