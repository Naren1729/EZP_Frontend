import React, { useEffect, useState } from "react";

export default function FetchingRiskScores() {

  const [fraudTransactions, setFraudTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:9090/api/fraudTransactionDetails";

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
        setFraudTransactions(data);
      } catch (eror) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    console.log(fraudTransactions);
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
      <h2>All Fraud Transactions</h2>
      <ul>
        {fraudTransactions.map((transaction) => (
          <li key={transaction.fraudID}>
            {transaction.fraudID} - {transaction.transaction.amount} -{" "}
            {transaction.transaction.usernId}-{transaction.riskScore}
          </li>
        ))}
      </ul>
    </div>
  )
}
