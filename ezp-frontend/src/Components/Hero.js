import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <div className="poppins-bold container">
      <div className="left">
        <TypeAnimation
          sequence={[
            "Welcome to", // Type 'Welcome to'
            2000, // Wait for 2 seconds before moving to next animation
          ]}
          wrapper="p"
          className="heading2"
          cursor={false}
          speed={25} // Slows down the typing
          repeat={0} // Do not repeat
        />

        <TypeAnimation
          sequence={[
            `Security and \nCompliance`, // Type 'Security '
            2000, // Small delay before typing "and"
            "",
            1000,
            `Security and \nCompliance`, // Type 'and'
            1000, // Wait for 2 seconds before moving to the next line
          ]}
          wrapper="p"
          className="heading"
          speed={25} // Slower speed for typing
          repeat={0}
        />
      </div>

      <div className="right">
        <img src="./EZP-SAC.png" alt="" srcset="" />
      </div>
    </div>
  );
}
