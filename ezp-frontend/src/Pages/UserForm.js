/**
 * @author Bhavansh, Naren
 * 
 * This component allows users to enter transaction details such as amount, destination user ID, and transaction password.
 * It handles form submission, performs frontend validation, and communicates with the backend to process the transaction.
 * It also checks for user authentication and authorization based on session storage values.
 
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";


export default function UserForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [destinationUserID, setDestinationUserID] = useState("");
  const [type, setType] = useState("transfer");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [userID, setUserID] = useState(""); // State for storing the user ID
  const url = "http://localhost:9090/api/transaction";
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem("username");
  const usertype = sessionStorage.getItem("usertype");

  // Fetch userID using username from sessionStorage
  const fetchUserId = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/user/username/${username}`
      );
      const user = await response.json();
      if (user && user.id) {
        setUserID(user.id);
      } else {
        throw new Error("User ID not found");
      }
    } catch (error) {
      toast.error("Failed to fetch user ID", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
    }
  };

  useEffect(() => {
    // Check session storage for authentication and authorization
    if (!username || !usertype || usertype !== "user") {
      toast.error("Unauthorized access. Please log in as user", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      sessionStorage.clear();
      navigate("/main/authenticate");
    } else {
      fetchUserId(); // Fetch user ID when the component is mounted
    }
  }, [username, usertype, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for form fields
    if (amount <= 0) {
      toast.error("Amount must be greater than zero", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      return;
    }
    if (!userID) {
      toast.error("User ID is required", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      return;
    }
    if (!destinationUserID) {
      toast.error("Destination User ID is required", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      return;
    }
    if (!transactionPassword) {
      toast.error("Transaction Password is required", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      return;
    }

    const transactionData = {
      amount: Number(amount),
      userID,
      destinationUserID,
      type,
      transactionPassword,
    };

    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(transactionData),
        headers: { "Content-Type": "application/json" },
      });

      // Convert the response to text to get the actual message
      let json = await response.text();

      if (!response.ok) {
        // Network-level error (non-200 status codes)
        if (
          json ===
          '{"status":500,"error":"Cannot invoke \\"com.ezpay.entity.User.getIsBlockeListed()\\" because \\"destinationUser\\" is null"}'
        ) {
          toast.error(
            "Transaction failed: Destination user does not exist or is null",
            {
              position: "top-right",
              style: { width: "400px", height: "100px" },
            }
          );
        } else {
          toast.error(
            "Transaction failed: Destination user cannot be same as Sender",
            {
              position: "top-right",
              style: { width: "400px", height: "100px" },
            }
          );
        }
      } else if (json === "Transaction Successful") {
        // Transaction was successful
        toast.success("Transaction Successful", {
          position: "top-right",
          style: { width: "400px", height: "100px" },
        });
        setStatus("Success");

        // Clear form fields after successful submission
        setAmount(0);
        setDestinationUserID("");
        setType("transfer");
        setTransactionPassword("");

        // Clear session and navigate to authentication
        sessionStorage.clear();
        navigate("/main/authenticate");
      } else if (json === "Transaction Failed") {
        // Transaction failed, but no network error
        toast.error("Transaction Failed", {
          position: "top-right",
          style: { width: "400px", height: "100px" },
        });
        setStatus("Failed");

        // Optional: Clear session or perform other actions on failure
        sessionStorage.clear();
        navigate("/");
      } else {
        // Handle unexpected messages from the backend
        toast.error("Unexpected response: " + json, {
          position: "top-right",
          style: { width: "400px", height: "100px" },
        });
      }
    } catch (error) {
      // Network error (e.g., server unreachable)
      toast.error("Network Error: Unable to process the transaction", {
        position: "top-right",
        style: { width: "400px", height: "100px" },
      });
      setStatus("Failed");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="user-container">
        <div className="left-container">
          <img className="userForm_Img1" src="/userForm2.png" alt="" />
        </div>

        <div className="middle-container">
          <div className="user-form-container">
            <p>Enter your transaction details</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Amount"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="userID">User ID</label>
                <input
                  value={userID} // Use the state variable for userID
                  type="text"
                  placeholder="User ID"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="destinationUserID">Destination ID</label>
                <input
                  value={destinationUserID}
                  onChange={(e) => setDestinationUserID(e.target.value)}
                  type="text"
                  placeholder="Destination User ID"
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="transfer"
                      name="type"
                      value="transfer"
                      checked={type === "transfer"}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="transfer">Transfer</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="transactionPassword">
                  Transaction Password
                </label>
                <input
                  value={transactionPassword}
                  onChange={(e) => setTransactionPassword(e.target.value)}
                  type="password"
                  placeholder="Transaction Password"
                  required
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="right-container">
          <img className="userForm_Img1" src="/userForm1.png" alt="" />
        </div>
      </div>
    </div>
  );
}
