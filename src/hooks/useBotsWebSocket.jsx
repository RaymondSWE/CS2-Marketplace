import { useState, useEffect } from "react";
import io from "socket.io-client";

const useBotsWebsocket = () => {
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [botInventories, setBotInventories] = useState({});
  const [getBotInventoriesPrice, setGetBotInventoriesPrice] = useState({});
  const [getBotFloatValue, setGetBotFloatValue] = useState({});

  useEffect(() => {
    const newSocket = io("http://139.59.179.67:80");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const getInventory = () => {
      socket.emit("get bots inv");
      socket.on("bots inv", (data) => {
        if (data) {
          setBotInventories(data.bot_1.items);
        }
      });
    };

    const getFloat = () => {
      socket.emit("bots floats");
      socket.on("bots floats", (data) => {
        if (data) {
          let floatArray = Object.keys(data).map((key) => ({
            [key]: data[key],
          }));
          setGetBotFloatValue(floatArray);
          setIsLoading(true);
        }
      });
    };

    const getPrice = () => {
      socket.emit("get pricelist");
      socket.on("pricelist", (price) => {
        if (price) {
          let pricearray = Object.keys(price).map((key) => ({
            [key]: price[key],
          }));
          setGetBotInventoriesPrice(pricearray);
          setIsLoading(true);
        }
      });
    };

    getInventory();
    getFloat();
    getPrice();

    return () => {
      socket.off("bots inv");
      socket.off("bots floats");
      socket.off("pricelist");
    };
  }, [socket]);

  return {
    isLoading,
    botInventories,
    getBotInventoriesPrice,
    getBotFloatValue,
  };
};

export default useBotsWebsocket;
