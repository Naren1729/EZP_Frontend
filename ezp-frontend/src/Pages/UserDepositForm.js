import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserDepositForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isBlockListed, setIsBlockListed] = useState(false);
  const [transactionPassword, setTransactionPassword] = useState("");
  const url = "http://localhost:9090/api/user";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      name,
      password,
      email,
      currentBalance: Number(currentBalance), // Ensure it's a number
      isBlockListed,
      transactionPassword,
    };
    console.log(userData);

    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let json = await response.json();
      console.log(json);

      // Clear form fields after successful submission
      setUsername("");
      setName("");
      setPassword("");
      setEmail("");
      setCurrentBalance(0);
      setIsBlockListed(false);
      setTransactionPassword("");

      if (response.status === 201) {
        toast.success("Signed up successfully", {
          position: "top-right",
          style: { width: "400px", height: "60px" },
        });
        navigate("/main/authenticate");
      } else {
        toast.error("Invalid Username or Password", {
          position: "top-right",
          style: { width: "400px", height: "60px" },
        });
      }
    } catch (error) {
      toast.error("User alredy present", {
        position: "top-right",
        style: { width: "500px", height: "60px" },
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="user-form-container">
      <form className="deposit-funds-form" onSubmit={handleSubmit}>
        <div className="deposit-form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Username"
            required
          />
        </div>
        <div className="deposit-form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Name"
            required
          />
        </div>
        <div className="deposit-form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-input"
            placeholder="Password"
            required
          />
        </div>
        <div className="deposit-form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Email"
            required
          />
        </div>
        <div className="deposit-form-group">
          <label
            htmlFor="currentBalance"
            className="form-label"
            placeholder="100000"
          >
            Current Balance
          </label>
          <input
            id="currentBalance"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            type="number"
            className="form-input"
            placeholder="Current Balance"
            required
          />
        </div>
        <div className="deposit-form-group">
          <label htmlFor="isBlockListed" className="form-label">
            Blocklisted
          </label>
          <select
            id="isBlockListed"
            value={isBlockListed}
            onChange={(e) => setIsBlockListed(e.target.value === "true")}
            className="form-select"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="deposit-form-group">
          <label htmlFor="transactionPassword" className="form-label">
            Transaction Password
          </label>
          <input
            id="transactionPassword"
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Transaction Password"
            required
          />
        </div>
        <button type="submit" className="userDepositForm-button">
          Submit
        </button>
      </form>
    </div>
  );
}
