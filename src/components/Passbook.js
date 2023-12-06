// Passbook.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Passbook = ({ transactions }) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.token == undefined){
      navigate('/')
    }
  },[])
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
