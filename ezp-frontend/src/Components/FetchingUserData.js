import React, { useEffect, useState } from 'react';

export default function FetchingUserData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      let response = await fetch("http://localhost:9090/main/users", { method: "GET" });
      let json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Data from backend:</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="user-container">
          {data.map((transaction, index) => (
          
            <div className="user-subContainer">
                <p> <strong>Transaction ID:</strong> {transaction.transaction_id} </p>
                <p><strong>Username:</strong> {transaction.username}</p>
                <p><strong>Password:</strong> {transaction.password}</p>
                <p><strong>Email:</strong> {new Date(transaction.email).toLocaleString()}</p>
                <p><strong>Current Balance:</strong> {transaction.currentBalance}</p>
                {/* <p><strong>Amount:</strong> ${Number(transaction.amount).toFixed(2)}</p>
                <p><strong>Status:</strong> {transaction.status}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
