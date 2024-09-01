import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(props) {
  const userNameRef = useRef(); //Reference the HTML elemnets to the react app
  const passwordRef = useRef(); //Reference the HTML elemnets to the react app
  const navigate = useNavigate();

  //Method for performing POST method to the server
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:9090/main/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    console.log("Username:", userNameRef.current.value);
    console.log("Password:", passwordRef.current.value);

    //For user login page
    if (
      response.status === 200 ||
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
    } else if (response.status === 400) {
      toast.error("Invalid Username or Password", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
    }
  };

  return (
    <>
      <div className="login-form-container">
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
      </div>
    </>
  );
}
