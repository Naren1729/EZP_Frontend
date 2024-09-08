import React from 'react';
import { motion } from 'framer-motion';
import Login from '../Components/Login';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default function UserLogin() {
  return (
    <>
      <NavBar />
      <div className="loginContainer">
        <motion.div
          className="leftDiv"
          initial={{ x: '-8vw' }} // Start off-screen from the left
          animate={{ x: 0 }}        // Animate to its current position
          transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 4 }} // Smooth transition
        >
          <img src="/User-Login.png" alt="User Login" sizes="" srcSet="" />
        </motion.div>
        
        <div className='rightDiv'>
          <Login title="User" />
          <Link to="/main/userDepositForm" className="depositFunds">Sign up</Link>
        </div>
      </div>
    </>
  );
}
