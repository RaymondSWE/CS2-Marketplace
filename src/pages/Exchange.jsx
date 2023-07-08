import React, { useState } from "react";
import ExchangeBody from "../components/ExchangeBody/ExchangeBody";
import Sidebar from "../components/SideBar/Sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Faq from "../components/Faq/Faq";
import TermsConditions from "../components/TermsConditions/TermsConditions";
import LoginAlert from "../components/LoginAlert/LoginAlert";
import useUserSession from "../hooks/useUserSession";
import "../components/SellBody/SellBody.css";
import LoginPrompt from "../components/LoginAlert/LoginPrompt";
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";
const Exchange = () => {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { userSteamId } = useUserSession();

  // Set underConstruction state to true to show the modal
  const [underConstruction, setUnderConstruction] = useState(true);

  return (
    <HelmetProvider>
      <Helmet>
        <title>CSFairTrade || Exchange Inventory</title>
        <meta
          name="CSFairTrade || Exchange Inventory"
          content="CSFairTrade || Exchange Inventory Page"
        />
      </Helmet>

      <UnderConstruction
        underConstruction={underConstruction}
        setUnderConstruction={setUnderConstruction}
      />
      <div style={{ filter: underConstruction ? "blur(8px)" : "none" }}>
        <>
          <Sidebar mainBody={<ExchangeBody />} placeholder="Search Market" />
          <Faq />
          <TermsConditions />
        </>
      </div>
    </HelmetProvider>
  );
};

export default Exchange;
