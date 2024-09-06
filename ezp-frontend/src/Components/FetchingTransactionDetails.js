import React, { useEffect, useState } from "react";

export default function FetchingTransactionDetails() {
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:9090/api/transactionDetails";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        setTransactions(data);
      } catch (eror) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.transactionId}>
            {transaction.transactionId} - {transaction.amount} -{" "}
            {transaction.usernId}
          </li>
        ))}
      </ul>
    </div>
  )
}
