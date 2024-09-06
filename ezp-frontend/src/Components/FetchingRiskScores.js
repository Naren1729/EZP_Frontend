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
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Fraud Transactions</h1>
      <ul className='get-data-container'>
        {fraudTransactions.map((transaction) => (
          <li key={transaction.fraudID} className="card risk">
            <div className={`circle ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>
                <h2>{transaction.fraudID}</h2>
              </div>
              <div class="content">
                <p>User Id: <strong className='user-data-label'>{transaction.transaction.usernId}</strong> </p>
                <p>Transaction Amount: <strong className='user-data-label'> {transaction.transaction.amount}</strong></p>
                <p style={{"color":"white"}} className="lower-button">Risk Score {transaction.riskScore}</p>
             </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
