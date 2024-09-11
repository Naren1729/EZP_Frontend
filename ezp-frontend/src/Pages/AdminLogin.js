/**
 * @author Mayuri
 * 
 * @description
 * AdminLogin Component
 * 
 * This component represents the Admin Login page of the application.
 * It includes two main sections:
 * 1. The left section contains an animated image for visual appeal.
 * 2. The right section contains the actual login form.
 * 
 * The `Framer Motion` library is used to animate the left section, where the image slides in smoothly from the left side.
 * The `Login` component is reused here to handle the admin login process.
 * 
 * NavBar component is also added at the top for site-wide navigation.
 */

import React from 'react';
import Login from '../Components/Login';
import NavBar from '../Components/NavBar';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  return (
    <>
    <NavBar/>
    <div className="loginContainer">
    <motion.div
          className="leftDiv"
          initial={{ x: '-8vw' }} // Start off-screen from the left
          animate={{ x: 0 }}        // Animate to its current position
          transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 4 }} // Smooth transition
        >
        <img src="/Admin-Login.png" alt="" sizes="" srcset="" />
      </motion.div>
      <Login title = "Admin"/>
    </div>
    </>
  );
}
