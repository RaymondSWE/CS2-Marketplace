import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./SellBody.css";
import SellCard from "./SellCard";
import { cardReducer } from "./reducer";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import useUserWebsocket from "../../hooks/useUserWebSocket";
import useUserSession from "../../hooks/useUserSession";

export const CardContext = createContext();

const SellBody = () => {
  const { isLoading, userInventory, getAllInventoryPrice } = useUserWebsocket();
  const { userSteamId, fetchUserItems, userItems } = useUserSession();
  console.log("userInventory", userInventory);

  let updateUserResponseObject = [];

  const [state, dispatch] = useReducer(cardReducer, {
    sellData: [],
    addCard: [],
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (userInventory.length > 0 && getAllInventoryPrice.length > 0) {
      userInventory.forEach((inventoryItem, id) => {
        getAllInventoryPrice.forEach((priceItem, id1) => {
          let userInvCheck = inventoryItem[id].data.market_hash_name;
          let priceCheck = Object.keys(priceItem);
          if (userInvCheck === priceCheck[0]) {
            const returnedTarget = Object.assign(inventoryItem[id], {
              price: priceItem[Object.keys(priceItem)],
            });
            updateUserResponseObject.push(returnedTarget);
          }
        });
      });
      dispatch({
        type: "ACTIONS_CALL_API",
        data: updateUserResponseObject,
      });
      setIsDataLoaded(true);
    } else {
      toast.info("Loading inventory prices...", {
        theme: "colored",
      });
    }
  }, [userInventory, getAllInventoryPrice]);

  return (
    <>
      <CardContext.Provider value={{ state, dispatch }}>
        {isDataLoaded ? <SellCard /> : <Loader />}
      </CardContext.Provider>
    </>
  );
};
export default SellBody;

export const CardState = () => {
  return useContext(CardContext);
};
