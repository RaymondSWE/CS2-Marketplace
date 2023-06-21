import React from "react";
import Faq from "../components/Faq/Faq";
import TermsConditions from "../components/TermsConditions/TermsConditions";
import ContactUs from "../components/ContactUs/ContactUs";
import Banner from "../components/Banner/Banner";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useBotsWebsocket from "../hooks/useBotsWebSocket";

const Home = () => {
  // Use the custom hook to fetch and update data through WebSockets
  const {
    isLoading,
    botInventories,
    getBotInventoriesPrice,
    getBotFloatValue,
  } = useBotsWebsocket();
  // You can use the data fetched from WebSockets here...
  // console.log("Bot Inventories:", botInventories); s

  return (
    <HelmetProvider>
      <Helmet>
        <title>CSFairTrade - The market place with low fees</title>
        <meta name="CSFairTrade" content="The market place with low fees" />
      </Helmet>

      <Banner />
      <ContactUs />
      <Faq />
      <TermsConditions />
    </HelmetProvider>
  );
};

export default Home;
