import { useState, useEffect } from "react";
import axios from "axios";

const useUserSession = () => {
  const [userSteamId, setUserSteamId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState(null);
  const [tradeLink, setTradeLink] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const [itemsForSale, setItemsForSale] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchAllUsersCount();
  }, []);

  useEffect(() => {
    if (userSteamId) {
      fetchUserBalance();
      fetchUserEmail();
      fetchUserTradeLink();
    }
  }, [userSteamId]);
  //Test idk
  const fetchUserData = async () => {
    const user = `${process.env.REACT_APP_API_URL}/api/auth/user`;

    try {
      const res = await axios.get(user, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_DOMAIN,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        withCredentials: true,
        responseType: "json",
      });
      console.log("User data:", res.data);

      setUserSteamId(res.data.id);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchUserBalance = async () => {
    const userBalance = `${process.env.REACT_APP_API_URL}/api/user/balance/${userSteamId}`;

    try {
      const res = await axios.get(userBalance);
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Failed to fetch user balance:", error);
    }
  };

  const fetchUserEmail = async () => {
    const userEmail = `${process.env.REACT_APP_API_URL}/api/user/getUserEmail/${userSteamId}`;

    try {
      const res = await axios.get(userEmail);
      setEmail(res.data.email);
    } catch (error) {
      console.error("Failed to fetch user email:", error);
    }
  };

  const fetchUserTradeLink = async () => {
    const userTradeLink = `${process.env.REACT_APP_API_URL}/api/user/getTradeLink/${userSteamId}`;

    try {
      const res = await axios.get(userTradeLink);
      setTradeLink(res.data.tradelink);
    } catch (error) {
      console.error("Failed to fetch user trade link:", error);
    }
  };

  const fetchAllUsersCount = async () => {
    const allUsersCount = `${process.env.REACT_APP_API_URL}/api/user/allUsersCount`;

    try {
      const res = await axios.get(allUsersCount);
      setTotalUsers(res.data.total_users);
    } catch (error) {
      console.error("Failed to fetch total users count:", error);
    }
  };

  const fetchUserItems = async () => {
    const userItemsUrl = `${process.env.REACT_APP_API_URL}/api/useritems/for_sale/${userSteamId}`;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/useritems/for_sale/${userSteamId}`,
      );
      setUserItems(res.data);
    } catch (error) {
      console.error("Failed to fetch user items:", error);
    }
  };

  const fetchItemsForSale = async () => {
    const itemsForSaleUrl = `${process.env.REACT_APP_API_URL}/api/useritems/for_sale`;

    try {
      const res = await axios.get(itemsForSaleUrl);
      setItemsForSale(res.data);
    } catch (error) {
      console.error("Failed to fetch items for sale:", error);
    }
  };

  return {
    userSteamId,
    balance,
    email,
    tradeLink,
    totalUsers,
    fetchUserItems,
    userItems,
    fetchItemsForSale,
  };
};

export default useUserSession;
