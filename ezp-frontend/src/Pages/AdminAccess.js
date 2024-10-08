import React, { useState } from "react";
import { motion } from "framer-motion";
import FetchingUserData from "../Components/FetchingUserData";
import FetchingRiskScores from "../Components/FetchingRiskScores";
import FetchingTransactionDetails from "../Components/FetchingTransactionDetails";
import NavBar from "../Components/NavBar";

export default function AdminAccess() {
  const [activeComponent, setActiveComponent] = useState("usersData");

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
