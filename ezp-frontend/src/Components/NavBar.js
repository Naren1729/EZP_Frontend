import React from "react";
import { Link } from "react-scroll";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <ul className="nav-items">
        <li>
          <Link to="/" spy={true} smooth={true} offset={-100} duration={1000}>
            Home
          </Link>
        </li>
        <li>
          <Link to="about" spy={true} smooth={true} offset={-150} duration={1000}>About</Link>
        </li>
        <li>
          <Link to="features" spy={true} smooth={true} offset={-150} duration={1000}>Features</Link>
        </li>
        <li>
          <Link to="team" spy={true} smooth={true} offset={-20} duration={1000}>Our Team</Link>
        </li>
      </ul>
    </div>
  );
}
