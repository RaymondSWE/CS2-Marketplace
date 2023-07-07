import React, { useState } from "react";
import SellBody from "../components/SellBody/SellBody";
import Sidebar from "../components/SideBar/Sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Faq from "../components/Faq/Faq";
import TermsConditions from "../components/TermsConditions/TermsConditions";
import LoginAlert from "../components/LoginAlert/LoginAlert";
import useUserSession from "../hooks/useUserSession";
import "../components/SellBody/SellBody.css";
import LoginPrompt from "../components/LoginAlert/LoginPrompt";

const Sell = () => {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { userSteamId } = useUserSession();

  return (
    <>
      <Helmet>
        <title>CSFairTrade || Sell Inventory</title>
        <meta
          name="CSFairTrade || Sell Inventory"
          content="CSFairTrade || Sell Inventory Page"
        />
      </Helmet>
      {userSteamId ? (
        <>
          <Sidebar mainBody={<SellBody />} />
          <Faq />
          <TermsConditions />
        </>
      ) : (
        <>
          <LoginPrompt
            title="Welcome to the Sell Page!"
            description="To access the selling features, please log in or sign up for an account."
            onLoginClick={() => setShowLoginAlert(true)}
          />

          <LoginAlert
            show={showLoginAlert}
            handleClose={() => setShowLoginAlert(false)}
          />
        </>
      )}
    </>
  );
};

export default Sell;
