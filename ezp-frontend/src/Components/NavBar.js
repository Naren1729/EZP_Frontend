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
    if (usertype === "user") {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("usertype");
      sessionStorage.clear();
      // Show a toast notification
      toast.success("You have been logged out successfully.", {
        position: "top-right",
        style: { width: "400px", height: "80px" },
      });

      // Redirect to the login page
      navigate("/main/authenticate");
    }
    else if (usertype === "admin") {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("usertype");
      sessionStorage.clear();
      // Show a toast notification
      toast.success("You have been logged out successfully.", {
        position: "top-right",
        style: { width: "400px", height: "80px" },
      });

      // Redirect to the login page
      navigate("/admin/authenticate");
    }

  };

  // Check if the user is logged in by checking the session storage
  const isLoggedIn = sessionStorage.getItem("username");

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

        {/* Conditionally render the Logout button if the user is logged in */}
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