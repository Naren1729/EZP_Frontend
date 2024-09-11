/**
 * @author Naren
 * @description
 * This component represents a form for making transactions, including deposits and withdrawals. 
 * It handles user input, validates the transaction details, and communicates with the backend API to perform the transaction.
 * It also provides feedback to the user using toast notifications.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MakeTransaction = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [amount, setAmount] = useState(0); // State for transaction amount
  const [userID, setUserID] = useState(""); // State for the user ID initiating the transaction
  const [destinationUserID, setDestinationUserID] = useState(""); // State for the recipient's user ID (for transfers)
  const [type, setType] = useState("deposit"); // State for the type of transaction (deposit or withdrawal)
  const [transactionPassword, setTransactionPassword] = useState(""); // State for transaction password
  const url = "http://localhost:9090/api/transaction"; // API endpoint for transaction requests
  const [status, setStatus] = useState(""); // State for transaction status
  const [error, setError] = useState(null); // State for error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct the transaction data object
    const transactionData = {
      amount: Number(amount), // Convert amount to a number
      userID,
      destinationUserID,
      type,
      transactionPassword,
    };
    console.log(transactionData); // Log transaction data for debugging

    try {
      // Make POST request to the API
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(transactionData),
        headers: { "Content-Type": "application/json" },
      });

      let json = await response.text(); // Parse response text

      if (!response.ok) {
        setError(json.message || "Network error"); // Set error message if response is not ok
        setStatus("Failed"); // Set status to Failed
      } else {
        setStatus(json); // Set status based on response
        setError(null); // Clear error

        // Clear form fields after successful submission
        setAmount(0);
        setUserID("");
        setDestinationUserID("");
        setType("deposit");
        setTransactionPassword("");

        // Display success or failure message based on response
        if (json === "Transaction Successful") {
          toast.success("Transaction successful", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        } else if (json === "Transaction Failed") {
          toast.error("Transaction Failed", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        }
      }
    } catch (error) {
      setError("Network error"); // Set error message in case of a network error
      setStatus("Failed"); // Set status to Failed
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update amount state
            type="number"
            placeholder="Amount"
          />
        </div>
        <div>
          <input
            value={userID}
            onChange={(e) => setUserID(e.target.value)} // Update userID state
            type="text"
            placeholder="User ID"
          />
        </div>
        <div>
          <input
            value={destinationUserID}
            onChange={(e) => setDestinationUserID(e.target.value)} // Update destinationUserID state
            type="text"
            placeholder="Destination User ID"
          />
        </div>
        <div>
          <select value={type} onChange={(e) => setType(e.target.value)} // Update type state
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>
        <div>
          <input
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)} // Update transactionPassword state
            type="password"
            placeholder="Transaction Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <div>Status: {status}</div>} {/* Display status message if present */}
    </>
  );
};

export default MakeTransaction;
