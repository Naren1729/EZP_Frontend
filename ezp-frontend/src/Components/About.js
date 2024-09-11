/**
 * @author Bhavansh
 * @description This component renders the 'About Us' section using a carousel with animated transitions.
 * It showcases the company's vision and mission statements, and incorporates Framer Motion for smooth animations.
 * The carousel automatically plays and loops through items while providing a responsive experience.
 */

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importing the carousel styles
import { motion } from 'framer-motion'; // Importing motion for animation
import { fadeIn } from '../variants'; // Custom animation variant for fade-in effects

// Array containing carousel item data (vision and mission)
const carouselItems = [
  {
    id: 1,
    icon: 'fa fa-eye',
    title: 'Our Vision',
    description: 'To revolutionize the way people transfer money by providing a secure, transparent, and user-friendly platform. We aim to be the trusted choice for individuals and businesses seeking reliable financial transactions.',
  },
  {
    id: 2,
    icon: 'fa fa-bullseye',
    title: 'Our Mission',
    description: 'Our mission is to ensure that every transaction is safeguarded with advanced encryption and fraud detection technologies. We are committed to offering an intuitive experience while continuously innovating to stay ahead of potential security threats.',
  }
];

// The About component renders the About Us section with animated headings and a carousel
export default function About() {
  return (
    <div className="carousel-container">
      {/* Animated heading using motion for fade-in effect */}
      <motion.h1
        variants={fadeIn("right", 0.2)} // Fades in from the right with a delay of 0.2s
        initial="hidden" // Initial hidden state
        whileInView={"show"} // Animation triggered when in view
        viewport={{ once: false, amount: 0.2 }} // Keeps animating as long as it's in view
      >
        About Us
      </motion.h1>

      {/* Animated carousel containing the vision and mission statements */}
      <motion.div 
        variants={fadeIn("left", 0.2)} // Fades in from the left with a delay of 0.2s
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="carousel-items-wrapper"
      >
        <Carousel
          showArrows={true} // Show navigation arrows
          autoPlay={true} // Automatically cycle through the carousel
          infiniteLoop={true} // Loop carousel items infinitely
          showThumbs={false} // Hide thumbnail navigation
          showStatus={false} // Hide the current status (e.g., slide number)
          transitionTime={500} // Transition duration between slides in milliseconds
        >
          {/* Rendering each carousel item */}
          {carouselItems.map(item => (
            <motion.div key={item.id} className="carousel-item">
              <i className={item.icon} aria-hidden="true"></i> {/* Icon display */}
              <h5>{item.title}</h5> {/* Item title */}
              <p>{item.description}</p> {/* Item description */}
            </motion.div>
          ))}
        </Carousel>
      </motion.div>
    </div>
  );
}
