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
