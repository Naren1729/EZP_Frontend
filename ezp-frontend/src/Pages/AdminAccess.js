import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import FetchingUserData from "../Components/FetchingUserData";
import FetchingRiskScores from "../Components/FetchingRiskScores";
import FetchingTransactionDetails from "../Components/FetchingTransactionDetails";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminAccess() {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("usersData");
  const username = sessionStorage.getItem("username");
  const usertype = sessionStorage.getItem("usertype");
  // Check session storage for username and usertype
  useEffect(() => {
    if (!username || !usertype) {
      toast.error("Unauthorized access. Please log in.", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      sessionStorage.clear();
      navigate("/main/admin/authenticate"); // Redirect to login page if session variables are missing
    }
    else if (usertype!=="admin") {
      toast.error("Unauthorized access. Please log in as admin", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
        
      });
      sessionStorage.clear();
      navigate("/main/admin/authenticate"); // Redirect to login page if session variables are missing
    }
  }, [navigate]);
  const renderComponent = () => {
    switch (activeComponent) {
      case "usersData":
        return <FetchingUserData />;
      case "riskScores":
        return <FetchingRiskScores />;
      case "transactionDetails":
        return <FetchingTransactionDetails />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="admin-container">
        <input
          className="subContainer"
          type="button"
          value="Get User Details"
          onClick={() => setActiveComponent("usersData")}
        />
        <input
          className="subContainer"
          type="button"
          value="Get Risk Scores"
          onClick={() => setActiveComponent("riskScores")}
        />
        <input
          className="subContainer"
          type="button"
          value="Get Transaction Details"
          onClick={() => setActiveComponent("transactionDetails")}
        />
      </div>

      <div className="admin-display-container">
          {renderComponent()}
      </div>
    </>
  );
}
