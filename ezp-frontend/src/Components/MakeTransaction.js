import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MakeTransaction = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [userID, setUserID] = useState("");
  const [destinationUserID, setDestinationUserID] = useState("");
  const [type, setType] = useState("deposit");
  const [transactionPassword, setTransactionPassword] = useState("");
  const url = "http://localhost:9090/api/transaction";
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      amount: Number(amount), // Ensure it's a number
      userID,
      destinationUserID,
      type,
      transactionPassword,
    };
    console.log(transactionData);

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
      } else {
        setStatus(json);
        setError(null);

        // Clear form fields after successful submission
        setAmount(0);
        setUserID("");
        setDestinationUserID("");
        setType("deposit");
        setTransactionPassword("");
        if (response.text === "Transaction Successful") {
          toast.success("Transaction successfully", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        } else if(response.text === "Transaction Failed") {
          toast.error("Transaction Failed", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        }
      }
    }
    catch (error) {
      setError("Network error");
      setStatus("Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
          />
        </div>
        <div>
          <input
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            type="text"
            placeholder="User ID"
          />
        </div>
        <div>
          <input
            value={destinationUserID}
            onChange={(e) => setDestinationUserID(e.target.value)}
            type="text"
            placeholder="Destination User ID"
          />
        </div>
        <div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>
        <div>
          <input
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
            type="password"
            placeholder="Transaction Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <div>Status: {status}</div>}
    </>
  );
};

export default MakeTransaction;