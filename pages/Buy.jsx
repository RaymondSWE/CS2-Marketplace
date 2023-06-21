import React, { useState } from "react";
import BuyBody from "../components/BuyBody/BuyBody";
import Sidebar from "../components/SideBar/Sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Faq from "../components/Faq/Faq";
import TermsConditions from "../components/TermsConditions/TermsConditions";
import LoginAlert from "../components/LoginAlert/LoginAlert";
import useUserSession from "../hooks/useUserSession";
import "../components/SellBody/SellBody.css";
import LoginPrompt from "../components/LoginAlert/LoginPrompt";

const Buy = () => {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { userSteamId } = useUserSession();

  return (
    <HelmetProvider>
      <Helmet>
        <title>CSFairTrade || Buy Inventory</title>
        <meta
          name="CSFairTrade || Buy Inventory"
          content="CSFairTrade || Buy Inventory Page"
        />
      </Helmet>
      {userSteamId ? (
        <>
          <Sidebar
            mainBody={<BuyBody actionButton="d-flex" />}
            placeholder="Search Market"
          />
          <Faq />
          <TermsConditions />
        </>
      ) : (
        <>
          <LoginPrompt
            title="Welcome to the Buy Page!"
            description="To access the buying features, please log in or sign up for an account."
            onLoginClick={() => setShowLoginAlert(true)}
          />

          <LoginAlert
            show={showLoginAlert}
            handleClose={() => setShowLoginAlert(false)}
          />
        </>
      )}
    </HelmetProvider>
  );
};

export default Buy;
