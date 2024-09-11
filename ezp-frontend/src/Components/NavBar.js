/**
 * @author Mayuri
 * @description This component contains the navbar, which includes home, about, features and our team.
 */

import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleLogout = () => {
    const usertype = sessionStorage.getItem("usertype");
    // Remove the session variables
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("usertype");
    sessionStorage.clear();
    // Show a toast notification
    toast.success("You have been logged out successfully.", {
      position: "top-right",
      style: { width: "400px", height: "80px" },
    });

    // Redirect to the login page
    navigate("/");

    setTimeout(() => {
      window.location.reload(); // Force a page reload after navigation (optional, based on Code1)
    }, 100);
  };

  // Check if the user is logged in by checking the session storage
  const isLoggedIn = sessionStorage.getItem("usertype");
  const isLoggedInUser = sessionStorage.getItem("usertype") === "user";
  const isLoggedInAdmin = sessionStorage.getItem("usertype") === "admin";

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
          <Link
            to="team"
            spy={true}
            smooth={true}
            offset={-20}
            duration={1000}
          >
            <span onClick={() => handleNavigation("team")}>Our Team</span>
          </Link>
        </li>

        {/* Conditionally render based on user type */}
        {isLoggedInUser && (
          <li>
            <Link to="#">
              <span onClick={() => navigate("/main/userForm")}>Pay</span>
            </Link>
          </li>
        )}
        {isLoggedInAdmin && (
          <li>
            <Link to="#">
              <span onClick={() => navigate("/admin/adminAccess")}>
                Admin Panel
              </span>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="#">
              <span onClick={handleLogout}>Logout</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

