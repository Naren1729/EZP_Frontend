/**
 * @author Mayuri
 * 
 * @description
 * UserLogin Component
 * 
 * This component represents the User Login page of the application.
 * It includes two main sections:
 * 1. The left section contains an animated image for visual appeal.
 * 2. The right section contains the actual login form and a link to the sign-up page.
 * 
 * The `Framer Motion` library is used to animate the left section, where the image slides in smoothly from the left side.
 * The `Login` component is reused here to handle the user login process.
 * 
 * NavBar component is also added at the top for site-wide navigation.
 */

import React from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion for animations
import Login from '../Components/Login'; // Import the Login component for user login
import { Link } from 'react-router-dom'; // Import Link to navigate to different routes
import NavBar from '../Components/NavBar'; // Import NavBar component for navigation

export default function UserLogin() {
  return (
    <>
      {/* NavBar for site-wide navigation */}
      <NavBar />
      
      {/* Main container for login */}
      <div className="loginContainer">
        
        {/* Left section with animated image */}
        <motion.div
          className="leftDiv"
          initial={{ x: '-8vw' }} // Start the image off-screen from the left
          animate={{ x: 0 }}     // Animate it into its current position (on-screen)
          transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 4 }} // Smooth spring-like animation
        >
          {/* Image representing User Login */}
          <img src="/User-Login.png" alt="User Login" sizes="" srcSet="" />
        </motion.div>
        
        {/* Right section with login form */}
        <div className="rightDiv">
          {/* Reuse the Login component to handle user login */}
          <Login title="User" />
          
          {/* Link to navigate to the sign-up form */}
          <Link to="/main/userDepositForm" className="depositFunds">Sign up</Link>
        </div>
      </div>
    </>
  );
}
