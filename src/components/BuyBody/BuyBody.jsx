import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useRef,
} from "react";
import "./BuyBody.css";
import BuyCard from "./BuyCard";
import { cardReducer } from "./reducer";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import useSkins from "../../hooks/useBotSkins";
import useBotsWebsocket from "../../hooks/useBotsWebSocket";

export const CardContext = createContext();

const BuyBody = () => {
  const botId = 1; // You can change this to the desired bot ID
  const skins = useSkins(botId);

  // Use the custom hook to fetch and update data through WebSockets
  const {
    isLoading,
    botInventories,
    getBotInventoriesPrice,
    getBotFloatValue,
  } = useBotsWebsocket();

  console.log("Bot inventories:", botInventories);
  console.log("Bot inventories prices:", getBotInventoriesPrice);
  console.log("Bot float values:", getBotFloatValue);
  useEffect(() => {
    if (skins.length > 0) {
      dispatch({
        type: "ACTIONS_CALL_API",
        data: skins,
      });
    }
  }, [skins]);

  const [state, dispatch] = useReducer(cardReducer, {
    // here you have to pass Array sof object
    buyData: [],
    addCard: [],
  });
  return (
    <>
      <CardContext.Provider value={{ state, dispatch }}>
        {skins.length > 0 ? <BuyCard /> : <Loader />}
      </CardContext.Provider>
    </>
  );
};

export default BuyBody;

export const CardState = () => {
  return useContext(CardContext);
};
