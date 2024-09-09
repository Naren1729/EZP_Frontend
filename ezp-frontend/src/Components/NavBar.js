import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (target) => {
    // Navigate to root "/"
    navigate("/");
    // After navigation, scroll to the target section
    setTimeout(() => {
      document.getElementById(target).scrollIntoView({ behavior: "smooth" });
    }, 1000); // Delay to ensure routing happens first
  };

  return (
    <div className="nav-bar">
      <ul className="nav-items">
        <li>
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            duration={1000}
          >
            <span onClick={() => handleNavigation("home")}>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-150}
            duration={1000}
          >
            <span onClick={() => handleNavigation("about")}>About</span>
          </Link>
        </li>
        <li>
          <Link
            to="features"
            spy={true}
            smooth={true}
            offset={-150}
            duration={1000}
          >
            <span onClick={() => handleNavigation("features")}>Features</span>
          </Link>
        </li>
        <li>
          <Link to="team" spy={true} smooth={true} offset={-20} duration={1000}>
            <span onClick={() => handleNavigation("team")}>Our Team</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
