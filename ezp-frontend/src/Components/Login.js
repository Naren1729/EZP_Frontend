/**
 * @author Mayuri
 * @description
 * This component represents the login form for both users and admins. It handles form validation,
 * user authentication, and redirects based on user type. It uses Framer Motion for animation and 
 * react-toastify for notifications.
 */

import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login(props) {
  const apiUrl = process.env.REACT_APP_API_URL;  //API_URL accessed from the .env file
  const userNameRef = useRef(); // Reference to username input field
  const passwordRef = useRef(); // Reference to password input field
  const navigate = useNavigate(); // Hook for navigation
  const [error, setError] = useState(null); // State for storing form errors
  const username = sessionStorage.getItem("username"); // Retrieve username from session storage
  const usertype = sessionStorage.getItem("usertype"); // Retrieve usertype from session storage


  // Method to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`${apiUrl}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userNameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const message = await response.text(); // Get response message
      console.log("Response Message:", message);

      if (props.title === "Admin") {
        // Check credentials for admin login
        if (
          userNameRef.current.value === "admin123" &&
          passwordRef.current.value === "EZP123"
        ) {
          // Set session storage variables for admin
          sessionStorage.setItem("username", userNameRef.current.value);
          sessionStorage.setItem("usertype", "admin");

          toast.success("Logged in successfully", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          navigate("/admin/adminAccess"); // Redirect to admin access page
        } else {
          toast.error("Invalid Admin Username or Password", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        }
      } else if (props.title === "User") {
        // Check response message for user login
        if (message === "Login Successful") {
          // Set session storage variables for user
          sessionStorage.setItem("username", userNameRef.current.value);
          sessionStorage.setItem("usertype", "user");

          toast.success("Logged in successfully", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          navigate("/main/userForm"); // Redirect to user form page
        } else {
          toast.error("Invalid Username or Password", {
            position: "top-right",
            style: { width: "600px", height: "60px" },
          });
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Network Error or Server Unavailable", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
    }
  };

  return (
    <motion.div
      className="login-form-container"
      initial={{ x: "8vw" }} // Start position off-screen to the left
      animate={{ x: 0 }} // Animate to its final position
      transition={{ type: "spring", stiffness: 50, damping: 20, duration: 4 }} // Smooth spring animation
    >
      <p>Welcome to {props.title} Login</p>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Display error message if present */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            ref={userNameRef}
            required  //it is a required field
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            required   //it is a required field
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </motion.div>
  );
}
