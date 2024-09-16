/**
 * @author Naren
 * @description This component fetches fraud transaction details from a backend API and displays them in a styled list. 
 * It uses the Fetch API to retrieve data, handles loading and error states, and displays transaction information such as 
 * fraud ID, user ID, transaction amount, and risk score.
 */

import React, { useEffect, useState } from "react";

// The FetchingRiskScores component retrieves and displays fraud transaction data.
export default function FetchingRiskScores() {
  
  // State to store the fetched fraud transactions data
  const [fraudTransactions, setFraudTransactions] = useState([]);
  // State to manage loading state while data is being fetched
  const [loading, setLoading] = useState(true);
  // State to handle and display errors if the data fetching fails
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL; // API URL to fetch fraud transaction details

  // useEffect hook to fetch the fraud transactions data when the component is mounted
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetching the fraud transactions from the backend API
        let response = await fetch(`${apiUrl}/fraudTransactionDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        // Check if the network response is OK (status 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parsing the response data as JSON and updating the state
        let data = await response.json();
        setFraudTransactions(data);
      } catch (error) {
        setError(error); // Handling error if the fetch fails
      } finally {
        setLoading(false); // Setting loading to false once the data is fetched or an error occurs
      }
    };

    console.log(fraudTransactions); // Logging fraud transactions for debugging purposes
    fetchTransactions(); // Calling the function to fetch fraud transactions
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // If the data is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If an error occurs, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If data is fetched successfully, render the fraud transactions in a list
  return (
    <div className="get-data-container">
      <h1 className="get-data-title">All Fraud Transactions</h1>
      <ul className="get-data-container">
        {fraudTransactions.map((transaction) => (
          <li key={transaction.fraudID} className="card risk">
            {/* Conditional rendering of transaction status with dynamic styling */}
            <div className={`circle ${transaction.transactionStatus === 'Success' ? 'success' : 'failed'}`}>
              <h2>{transaction.fraudID}</h2> {/* Displaying Fraud ID */}
            </div>

            <div className="content">
              {/* Displaying User ID and Transaction Amount */}
              <p>User Id: <strong className="user-data-label">{transaction.transaction.usernId}</strong></p>
              <p>Transaction Amount: <strong className="user-data-label">{transaction.transaction.amount}</strong></p>
              
              {/* Displaying the risk score of the transaction */}
              <p style={{"color": "white"}} className="lower-button">Risk Score {transaction.riskScore}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
