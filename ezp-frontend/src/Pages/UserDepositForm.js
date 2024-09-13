/***
 * @author Naren, Bhavansh
 * @description This is the user sign up form, which is required when user wants to register in the website.
 */


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import NavBar from "../Components/NavBar"; // Import the NavBar component

export default function UserDepositForm() {
  const navigate = useNavigate(); // Initialize navigation hook

  // Define state variables for form input fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isBlockListed, setIsBlockListed] = useState(false); // Boolean for blocklisted status
  const [transactionPassword, setTransactionPassword] = useState("");
  
  // Define the URL for API request
  const url = "http://localhost:9090/api/user";

  // Function to validate the email format using a regular expression
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate form inputs before submission
  const validateForm = () => {
    if (!username.trim()) {
      toast.error("Username is required", { position: "top-right", style: { width: "400px", height: "60px" },});
      return false;
    }
    if (!name.trim()) {
      toast.error("Name is required", { position: "top-right", style: { width: "400px", height: "60px" },});
      return false;
    }
    if (!password.trim() || password.length < 4) {
      toast.error("Password must be at least 4 characters long", { position: "top-right", style: { width: "400px", height: "60px" }, });
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format", { position: "top-right" , style: { width: "400px", height: "60px" },});
      return false;
    }
    if (currentBalance < 0) {
      toast.error("Current Balance cannot be negative 0", { position: "top-right", style: { width: "400px", height: "60px" }, });
      return false;
    }
    if (!transactionPassword.trim()|| transactionPassword.length < 4) {
      toast.error("Transaction Password must be 4 characters long", { position: "top-right", style: { width: "500px", height: "60px" }, }); 
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    // If form validation fails, stop further execution
    if (!validateForm()) {
      return;
    }

    // Create an object containing the form data
    const userData = {
      username,
      name,
      password,
      email,
      currentBalance: Number(currentBalance), // Convert balance to a number
      isBlockListed,
      transactionPassword,
    };

    try {
      // Send the form data to the backend API using POST
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData), // Convert form data to JSON
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

      // Check if the user was successfully created
      if (response.status === 201) {
        toast.success("Signed up successfully", { position: "top-right", style: { width: "500px", height: "60px" }, });
        navigate("/main/authenticate"); // Redirect to authentication page
      } else {
        toast.error("Invalid Username or Password", { position: "top-right", style: { width: "500px", height: "60px" }, });
      }
    } catch (error) {
      // Show an error if the username is already taken
      toast.error("User already present", { position: "top-right", style: { width: "400px", height: "60px" }, });
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <NavBar /> {/* Render the navigation bar */}
      <div className="signUp-form-container">
        <form className="deposit-funds-form" onSubmit={handleSubmit}>
          {/* Username field */}
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
          
          {/* Name field */}
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
          
          {/* Password field */}
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
          
          {/* Email field */}
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
          
          {/* Current Balance field */}
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
          
          {/* Blocklisted field */}
          {/* <div className="deposit-form-group">
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
          </div> */}
          
          {/* Transaction Password field */}
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
          
          {/* Submit button */}
          <button type="submit" className="userDepositForm-button">
            Submit
          </button>
        </form>
        {/* SignUp Div text and image added */}
        <div className="signUpDiv">
          <div className="signUpTitle poppins-bold">
            <h2>Secure Your Information Today – Sign Up Now!</h2>
          </div>
          <img src="/signUpImage.png" alt="" srcset="" />
        </div>
      </div>
    </>
  );
}
