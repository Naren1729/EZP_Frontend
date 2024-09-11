/**
 * @author Mayuri
 * @description 
 * This component renders the hero section of the website's landing page. It uses the `react-type-animation` library 
 * to create animated text that welcomes users to the "Security and Compliance" project. The hero section also 
 * includes an image to the right of the animated text.
 */

import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <div className="poppins-bold container">
      <div className="left">
        {/* TypeAnimation component for the initial greeting text */}
        <TypeAnimation
          sequence={[
            "Welcome to", // Type 'Welcome to'
            2000, // Wait for 2 seconds before moving to the next animation
          ]}
          wrapper="p"
          className="heading2"
          cursor={false} // Disable blinking cursor
          speed={25} // Slows down the typing speed
          repeat={0} // Do not repeat the animation
        />

        {/* TypeAnimation component for the main title text */}
        <TypeAnimation
          sequence={[
            `Security and \nCompliance`, // Type 'Security and Compliance' with a line break
            2000, // Small delay before continuing with the next animation
            "", // Empty string to create a pause effect
            1000, // Pause for 1 second
            `Security and \nCompliance`, // Repeat the main title
            1000, // Wait for 1 second before ending the animation
          ]}
          wrapper="p"
          className="heading"
          speed={25} // Slower typing speed for emphasis
          repeat={0} // Do not repeat the animation
        />
      </div>

      <div className="right">
        {/* Image displayed on the right side of the hero section */}
        <img src="./EZP-SAC.png" alt="Security and Compliance" />
      </div>
    </div>
  );
}
