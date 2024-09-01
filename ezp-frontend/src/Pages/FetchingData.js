import React, { useEffect, useState } from 'react';

export default function FetchingData() {
  const [data, setData] = useState([]);

  const getUserData = async () => {
      let response = await fetch("http://localhost:9090/admin/users", { method: "GET" });
      let json = await response.json();
      console.log(json); 
      setData(json); 
      
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Data from backend:</h1>
      <ul>
        {data.map((transaction, index) => (
          <li key={index}>
            <strong>Transaction ID:</strong> {transaction.transaction_id} <br />
            <strong>Username:</strong> {transaction.username} <br />
            <strong>Name:</strong> {transaction.name} <br />
            <strong>Password:</strong> {transaction.password} <br />
            <strong>Date:</strong> {new Date(transaction.t_date).toLocaleString()} <br />
            <strong>Type:</strong> {transaction.type} <br />
            <strong>Amount:</strong> ${transaction.amount.toFixed(2)} <br />
            <strong>Status:</strong> {transaction.status} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}