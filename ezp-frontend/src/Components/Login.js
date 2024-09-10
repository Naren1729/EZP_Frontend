import React, { useRef, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login(props) {
  const userNameRef = useRef(); // Reference to username input
  const passwordRef = useRef(); // Reference to password input
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem("username");
  const usertype = sessionStorage.getItem("usertype");
  // Check session storage for username and usertype
  useEffect(() => {
    if ((username || usertype) && usertype==="user") {
      toast.success("Already Logged In as user", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      navigate("/main/userForm"); // Redirect to login page if session variables are missing
    }
    else if ((username || usertype) && usertype=="admin") {
      toast.success("Already Logged In as admin", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      navigate("/admin/adminAccess"); // Redirect to login page if session variables are missing
    }
  }, [navigate]);
  // Validation function to check if fields are empty
  const validateForm = () => {
    if (!userNameRef.current.value || !passwordRef.current.value) {
      setError("Both fields are required");
      return false;
    }
    setError(null); // Reset error if validation passes
    return true;
  };

  // Method for performing POST request to the server
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in both fields", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      return;
    }

    try {
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

      const message = await response.text();
      console.log("Response Message:", message);

      if (props.title === "Admin") {
        if (
          userNameRef.current.value === "admin123" &&
          passwordRef.current.value === "EZP123"
        ) {
          // Set session storage variables
          sessionStorage.setItem("username", userNameRef.current.value);
          sessionStorage.setItem("usertype", "admin");

          toast.success("Logged in successfully", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          navigate("/admin/adminAccess");
        } else {
          toast.error("Invalid Admin Username or Password", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
        }
      } else if (props.title === "User") {
        if (message === "Login Successful") {
          // Set session storage variables
          sessionStorage.setItem("username", userNameRef.current.value);
          sessionStorage.setItem("usertype", "user");

          toast.success("Logged in successfully", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
          });
          navigate("/main/userForm");
        } else {
          toast.error("Invalid User Username or Password", {
            position: "top-right",
            style: { width: "400px", height: "60px" },
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
    <>
      <motion.div
        className="login-form-container"
        initial={{ x: "8vw" }} // Start off-screen from the left
        animate={{ x: 0 }} // Animate to its current position
        transition={{ type: "spring", stiffness: 50, damping: 20, duration: 4 }} // Smooth transition
      >
        <p>Welcome to {props.title} Login</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
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
