import React, { useEffect, useState } from 'react';

export default function FetchingUserData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:9090/api/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>All Users:</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="user-container">
          {users.map((transaction, index) => (
          
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
