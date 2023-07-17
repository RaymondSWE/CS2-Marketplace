import React from "react";
import Faq from "../components/Faq/Faq";
import TermsConditions from "../components/TermsConditions/TermsConditions";
import ContactUs from "../components/ContactUs/ContactUs";
import Banner from "../components/Banner/Banner";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useBotsWebsocket from "../hooks/useBotsWebSocket";
import "../index.css";

const Home = () => {
  const {
    isLoading,
    botInventories,
    getBotInventoriesPrice,
    getBotFloatValue,
  } = useBotsWebsocket();


  return (
    <HelmetProvider>
      <Helmet>
        <title>CSFairTrade - The market place with low fees</title>
        <meta name="CSFairTrade" content="The market place with low fees" />
      </Helmet>

      <div className="section-spacing">
        <Banner />
      </div>

      <div className="section-spacing">
        <ContactUs />
      </div>

      <div className="section-spacing">
        <Faq />
      </div>

      <div className="section-spacing">
        <TermsConditions />
      </div>
    </HelmetProvider>
  );
};

export default Home;
