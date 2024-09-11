/**
 * @author Bhavansh
 * @description This component displays a grid of all the key features provided by the platform.
 * Each feature is presented with an icon, title, and description. The component also incorporates 
 * animations using Framer Motion to create a smooth, visually appealing experience for users.
 * The features include Security, Payments, Fraud Detection, and 24/7 Support.
 */

import React from "react";
import { motion } from "framer-motion"; // Importing motion for animation effects
import { fadeIn } from "../variants"; // Importing custom fadeIn animation variant

// The Features component renders a list of platform features with animation and a responsive grid layout
export default function Features() {
  return (
    <div className="features-container">
      {/* Animated heading for the Features section */}
      <motion.h1
        variants={fadeIn("left", 0.2)} // Heading fades in from the left with a 0.2s delay
        initial="hidden" // Initial state is hidden before animation starts
        whileInView={"show"} // Animation triggers when the heading comes into view
        viewport={{ once: false, amount: 0.2 }} // Keeps animating as long as it's in view (0.2 visibility)
      >
        Features
      </motion.h1>

      {/* Grid layout containing individual feature items */}
      <div className="features-grid">
        {/* Each feature item is wrapped with motion for animation */}
        <motion.div
          variants={fadeIn("up", 0.2)} // Fades in from the bottom with a 0.2s delay
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="feature-item"
        >
          <i className="fas fa-lock"></i> {/* Icon representing the security feature */}
          <h3>Security</h3> {/* Title for the security feature */}
          <p>State-of-the-art encryption for your safety.</p> {/* Brief description of the security feature */}
        </motion.div>

        <motion.div 
          variants={fadeIn("up", 0.2)} 
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="feature-item"
        >
          <i className="fas fa-credit-card"></i> {/* Icon representing the payments feature */}
          <h3>Payments</h3> {/* Title for the payments feature */}
          <p>Easy and secure transactions.</p> {/* Brief description of the payments feature */}
        </motion.div>

        <motion.div 
          variants={fadeIn("up", 0.2)} 
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="feature-item"
        >
          <i className="fas fa-shield-alt"></i> {/* Icon representing the fraud detection feature */}
          <h3>Fraud Detection</h3> {/* Title for the fraud detection feature */}
          <p>Advanced algorithms to detect and prevent fraud.</p> {/* Brief description of the fraud detection feature */}
        </motion.div>

        <motion.div 
          variants={fadeIn("up", 0.2)} 
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="feature-item"
        >
          <i className="fas fa-people-carry"></i> {/* Icon representing the support feature */}
          <h3>Support</h3> {/* Title for the support feature */}
          <p>24/7 customer support for all your needs.</p> {/* Brief description of the support feature */}
        </motion.div>
      </div>
    </div>
  );
}
