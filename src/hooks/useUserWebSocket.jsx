import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { toast } from 'react-toastify';

const useUserWebsocket = () => {
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInventory, setUserInventory] = useState([]);
  const [getAllInventoryPrice, setGetAllInventoryPrice] = useState({});
  const [userData, setUserData] = useState(null);
  const [getBotFloatValue, setGetBotFloatValue] = useState({});

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_URL}`);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const userSteamIdFromSession = `${process.env.REACT_APP_API_URL}/api/auth/steamid`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(userSteamIdFromSession, {
          withCredentials: true,
        });
        setUserData(res.data.steamid);
        if (res.data.hasOwnProperty("error")) {
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!socket || !userData) return;

    socket.emit("get user inv", userData);
    socket.on("user inv", (data) => {
      if (data.hasOwnProperty("items")) {
        let userInvArray = Object.keys(data.items).map((key, key1) => ({
          [key1]: data.items[key],
        }));
        setUserInventory(userInvArray);
        toast.succes("User inventory fetched successfully.");
      } else if (data.hasOwnProperty("error")) {
        setIsLoading(true);
        toast.error("Error fetching user inventory.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
      }
    });

    socket.emit("get pricelist");
    socket.on("pricelist", (price) => {
      let pricearray = Object.keys(price).map((key) => ({ [key]: price[key] }));
      setGetAllInventoryPrice(pricearray);
    });

    socket.on("user float", (floatValues) => {
      setGetBotFloatValue(floatValues);
    });

    return () => {
      socket.off("user inv");
      socket.off("user float");
    };
  }, [socket, userData]);

  console.log('isLoading:', isLoading);
  console.log('userInventory:', userInventory);
  console.log('getAllInventoryPrice:', getAllInventoryPrice);
  console.log('getBotFloatValue:', getBotFloatValue);
  console.log('socket:', socket);

  return {
    isLoading,
    userInventory,
    getAllInventoryPrice,
    getBotFloatValue,
    socket,
  };
};

export default useUserWebsocket;
