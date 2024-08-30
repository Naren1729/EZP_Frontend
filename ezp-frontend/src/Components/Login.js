import React from 'react'
import { useRef } from 'react'

export default function Login(props) {

    const userNameRef = useRef(); //Reference the HTML elemnets to the react app
    const passwordRef = useRef(); //Reference the HTML elemnets to the react app

    //Method for performing POST method to the server
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Username:', userNameRef.current.value);
        console.log('Password:', passwordRef.current.value);
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
                    ref = {userNameRef}
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
                    ref = {passwordRef}
                    required
                />
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
    </>
  )
}
