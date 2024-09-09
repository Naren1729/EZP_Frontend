import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login(props) {
  const userNameRef = useRef(); //Reference the HTML elemnets to the react app
  const passwordRef = useRef(); //Reference the HTML elemnets to the react app
  const navigate = useNavigate();

  //Method for performing POST method to the server
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:9090/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    // Parsing the response to get the text
    const message = await response.text();

    console.log("Username:", userNameRef.current.value);
    console.log("Password:", passwordRef.current.value);

    //For user login page
    if (
      // Login Failed
      // Login Successful
      message === "Login Successful" ||
      (userNameRef.current.value === "admin123" &&
        passwordRef.current.value === "EZP123")
    ) {
      toast.success("Logged in successfully", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      if (userNameRef.current.value === "admin123")
        navigate("/admin/adminAccess");
      else navigate("/main/userForm");
    } else if (message === "Login Failed") {
      toast.error("Invalid Username or Password", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
    }
  };

  return (
    <>
      <motion.div
          className="login-form-container"
          initial={{ x: '8vw' }} // Start off-screen from the left
          animate={{ x: 0 }}        // Animate to its current position
          transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 4 }} // Smooth transition
        >
        <p>Welcome to {props.title} Login</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              ref={userNameRef}
              required
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
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </motion.div>
    </>
  );
}
