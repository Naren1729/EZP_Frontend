import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";

export default function UserForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [destinationUserID, setDestinationUserID] = useState("");
  const [type, setType] = useState("deposit");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [userID, setUserID] = useState(""); // Define userID state
  const url = "http://localhost:9090/api/transaction";
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem("username");
  const usertype = sessionStorage.getItem("usertype");

  // Fetch userID using username from sessionStorage
  const fetchUserId = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/username/${username}`);
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
    if (!username || !usertype || usertype !== "user") {
      toast.error("Unauthorized access. Please log in as user", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      sessionStorage.clear();
      navigate("/main/authenticate");
    } else {
      fetchUserId();
    }
  }, [username, usertype, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
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

      let json = await response.text();

      if (!response.ok) {
        setError(json.message || "Network error");
        setStatus("Failed");
        toast.error("Transaction Failed: " + (json.message || "Network error"), {
          position: "top-right",
          style: { width: "400px", height: "60px" },
        });
      } else {
        setStatus(json);
        setError(null);

        // Clear form fields after successful submission
        setAmount(0);
        setDestinationUserID("");
        setType("deposit");
        setTransactionPassword("");

        if (json === "Transaction Successful" && response.status === 200) {
          toast.success("Transaction Successful", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          // Clear all session variables
          sessionStorage.clear();
          navigate("/main/authenticate");
        } else if (json === "Transaction Failed" && response.status === 200) {
          toast.error("Transaction Failed", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          // Clear all session variables
          sessionStorage.clear();
          navigate("/main/authenticate");
        }
      }
    } catch (error) {
      setError("Network error");
      setStatus("Failed");
      toast.error("Network Error: Unable to process the transaction", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
    }
  };

  return (
    <>
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
                      id="deposit"
                      name="type"
                      value="deposit"
                      checked={type === "deposit"}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="deposit">Deposit</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="transactionPassword">Transaction Password</label>
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
    </>
  );
}
