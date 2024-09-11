/**
 * @author Naren
 * @description This component fetches transaction details from a backend API and displays them in a styled list. 
 * It handles loading, error states, and renders transaction information including transaction ID, user ID, 
 * destination user ID, transaction type, amount, and transaction status.
 */

import React, { useEffect, useState } from "react";

// The FetchingTransactionDetails component fetches and displays transaction data
export default function FetchingTransactionDetails() {
  
  // State to store the fetched transactions
  const [transactions, setTransactions] = useState([]);
  // State to handle loading while data is being fetched
  const [loading, setLoading] = useState(true);
  // State to handle errors during the data fetching process
  const [error, setError] = useState(null);

  const url = "http://localhost:9090/api/transactionDetails"; // API endpoint to fetch transaction details

  // useEffect hook to fetch transactions when the component is mounted
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetching transaction details from the API
        let response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data as JSON
        let data = await response.json();
        setTransactions(data); // Updating the state with fetched transactions
      } catch (error) {
        setError(error); // Handling errors if the fetch fails
      } finally {
        setLoading(false); // Stop loading when the fetch completes or fails
      }
    };

    fetchTransactions(); // Call the function to fetch transaction data
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // If data is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If data is successfully fetched, render the transactions in a list
  return (
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Transactions:</h1>
      <ul className="get-data-container">
        {transactions.map((transaction) => (
          <li key={transaction.transactionId} className="card">
            {/* Conditionally styling the transaction status circle */}
            <div className={`circle ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>
              <h2>{transaction.transactionId}</h2> {/* Displaying the transaction ID */}
            </div>

            <div className="content">
              {/* Displaying various transaction details */}
              <p>User Id: <strong className='user-data-label'>{transaction.usernId}</strong></p>
              <p>Destination User Id: <strong className='user-data-label'>{transaction.destinationUserId}</strong></p>
              <p>Transaction Type: <strong className='user-data-label'>{transaction.transactionType}</strong></p>
              <p>Amount: <strong className='user-data-label'>{transaction.amount}</strong></p>

              {/* Displaying the transaction status with dynamic styling */}
              <span className={`lower-button ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>
                Status: {transaction.transactionStatus}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
