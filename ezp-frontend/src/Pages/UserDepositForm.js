import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!username.trim()) {
      toast.error("Username is required", { position: "top-right" });
      return false;
    }
    if (!name.trim()) {
      toast.error("Name is required", { position: "top-right" });
      return false;
    }
    if (!password.trim() || password.length < 4) {
      toast.error("Password must be at least 4 characters long", { position: "top-right" });
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format", { position: "top-right" });
      return false;
    }
    if (currentBalance < 0) {
      toast.error("Current Balance cannot be negative 0", { position: "top-right" });
      return false;
    }
    if (!transactionPassword.trim()|| transactionPassword.length < 4) {
      toast.error("Transaction Password is required", { position: "top-right" }); 
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const userData = {
      username,
      name,
      password,
      email,
      currentBalance: Number(currentBalance),
      isBlockListed,
      transactionPassword,
    };

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
        });
        navigate("/main/authenticate");
      } else {
        toast.error("Invalid Username or Password", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("User already present", {
        position: "top-right",
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
          <label htmlFor="currentBalance" className="form-label">
            Current Balance
          </label>
          <input
            id="currentBalance"
            value={currentBalance}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                setCurrentBalance(value);
              }
            }}
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
            required
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
            type="password"
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
