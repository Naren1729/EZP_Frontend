import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function Features() {
  return (
    <div className="features-container">
      <motion.h1
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
      >
        Features
      </motion.h1>

      <div className="features-grid">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="feature-item"
        >
          <i className="fas fa-lock"></i>
          <h3>Security</h3>
          <p>State-of-the-art encryption for your safety.</p>
        </motion.div>
        <motion.div 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="feature-item">
          <i className="fas fa-credit-card"></i>
          <h3>Payments</h3>
          <p>Easy and secure transactions.</p>
        </motion.div>
        <motion.div 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="feature-item">
          <i className="fas fa-shield-alt"></i>
          <h3>Fraud Detection</h3>
          <p>Advanced algorithms to detect and prevent fraud.</p>
        </motion.div>
        {/* <div className="feature-item">
          <i className="fas fa-cogs"></i>
          <h3>Customizable</h3>
          <p>Flexible settings to suit your needs.</p>
        </div> */}
        <motion.div 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="feature-item">
          <i className="fas fa-people-carry"></i>
          <h3>Support</h3>
          <p>24/7 customer support for all your needs.</p>
        </motion.div>
      </div>
    </div>
  );
}
