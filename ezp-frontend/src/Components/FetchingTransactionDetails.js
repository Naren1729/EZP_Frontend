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
      } catch (error) {
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
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Transactions:</h1>
      <ul className="get-data-container">
        {transactions.map((transaction) => (
          <li key={transaction.transactionId} className="card">
            <div className={`circle ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>
                <h2>{transaction.transactionId}</h2>
              </div>
              <div class="content">
                <p>User Id: <strong className='user-data-label'>{transaction.usernId}</strong> </p>
                <p>Destination User Id: <strong className='user-data-label'> {transaction.destinationUserId}</strong></p>
                <p>Transaction Type: <strong className='user-data-label'> {transaction.transactionType}</strong></p>
                <p>Amount: <strong className='user-data-label'>{transaction.amount}</strong> </p>
                <span className={`lower-button ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>Status: {transaction.transactionStatus} </span>
             </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
