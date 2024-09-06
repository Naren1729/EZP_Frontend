import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserForm() {
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
        if (response.status === 200) {
          toast.success("Transaction successfull", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          navigate("/main/authenticate");
        } else {
          toast.error("Transaction Failed", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        }
      }
    } catch (error) {
      setError("Network error");
      setStatus("Failed");
    }
  };

  return (
    <>
      <div className="user-container">
        <div className="left-container">
          <img
            className="userForm_Img1"
            src="/userForm2.png"
            alt=""
            srcset=""
          />
        </div>

        <div className="middle-container">
          <div className="user-form-container">
            <p>Enter your transaction details</p>
            <form onSubmit={handleSubmit}>
              <div></div>
              <div className="form-group">
                <label htmlFor="name">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Amount"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">User ID</label>
                <input
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  type="text"
                  placeholder="User ID"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Destination ID</label>
                <input
                  value={destinationUserID}
                  onChange={(e) => setDestinationUserID(e.target.value)}
                  type="text"
                  placeholder="Destination User ID"
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
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="withdraw"
                      name="type"
                      value="withdraw"
                      checked={type === "withdraw"}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="withdraw">Withdraw</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Transaction Password</label>
                <input
                  value={transactionPassword}
                  onChange={(e) => setTransactionPassword(e.target.value)}
                  type="password"
                  placeholder="Transaction Password"
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="right-container">
          <img
            className="userForm_Img1"
            src="/userForm1.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </>
  );
}
