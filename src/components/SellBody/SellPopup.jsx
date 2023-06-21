import React, { useState, useContext, useEffect, useRef } from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import { CardContext } from "./SellBody";
import "./SellBody.css";
import { CardState } from "./SellBody";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellPopup from "./SellPopup";
import { FaAccusoft, FaInfoCircle, FaLockOpen, FaLock } from "react-icons/fa";
import { Form, InputGroup } from "react-bootstrap";
import useUserSession from "../../hooks/useUserSession";

const SellAsk = (props) => {
  const socket = io("http://localhost:80");
  const FETCH_USERSTEAMID_FROM_SESSION =
    "http://localhost:4000/api/auth/steamid";
  const FETCH_USER_OBJECT_FROM_SESSION = "http://localhost:4000/api/auth/user";
  const sellAskModalRef = useRef(null);
  const [listedPrice, setListedPrice] = useState({});

  const {
    state: { addCard },
  } = useContext(CardContext);
  const selectedItem = addCard.length > 0 ? addCard[0] : {};
  const [prices, setPrices] = useState({});
  const [fee, setFee] = useState(0);
  const [receive, setReceive] = useState(0);
  const [tradelink, setTradelink] = useState("");
  const [userData, setUserData] = useState(null);
  const [userSteamid, setUserSteamid] = useState(null);
  const [botInventorySelected, setBotInventorySelected] = useState([]);

  useEffect(() => {
    fetchUserSteamid();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserSteamid = async () => {
    try {
      const res = await axios.get(FETCH_USERSTEAMID_FROM_SESSION, {
        withCredentials: true,
      });
      setUserSteamid(res.data.steamid);
      fetchTradelink(res.data.steamid);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(FETCH_USER_OBJECT_FROM_SESSION, {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTradelink = (steamid) => {
    const FETCH_TRADELINK =
      "http://localhost:4000/api/user/getTradeLink/" + steamid;
    fetch(FETCH_TRADELINK)
      .then((res) => res.json())
      .then((data) => {
        setTradelink(data.tradelink);
      });
  };

  const handlePriceChange = (event, assetid) => {
    const { value } = event.target;

    if (value === "") {
      // Remove the assetid from the prices state if the input value is empty
      setPrices((prevPrices) => {
        const newPrices = { ...prevPrices };
        delete newPrices[assetid];
        return newPrices;
      });
      return;
    }

    // Check if the value is a valid number with at most two decimal places
    const regex = /^\d+(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      return;
    }

    // Update prices state
    setPrices((prevPrices) => ({
      ...prevPrices,
      [assetid]: value,
    }));

    // Calculate total price, fee, and receive amount
    let totalPrice = parseFloat(value);
    for (let key in prices) {
      if (key !== assetid) {
        totalPrice += parseFloat(prices[key]);
      }
    }

    const newFee = (totalPrice * 0.04).toFixed(2);
    const newReceive = (totalPrice - newFee).toFixed(2);

    // Update fee and receive state
    setFee(newFee);
    setReceive(newReceive);
  };

  const userAssetIds = addCard.map((item) => item.assetid);
  const [showPopup, setShowPopup] = useState(false);

  const handleProceedClick = (addCard) => {
    if (!tradelink) {
      toast.error("Please set your trade link first.");
      return;
    }

    // Check if any listed price is empty or missing
    let emptyPrice = false;
    for (const assetid of userAssetIds) {
      if (!prices[assetid]) {
        emptyPrice = true;
        break;
      }
    }

    if (emptyPrice) {
      toast.error("Please enter a listed price for all items.");
      return;
    }

    socket.emit("get offer", {
      user: userAssetIds,
      bot: botInventorySelected,
      bot_id: "76561199425314389",
      steamID64: userSteamid,
      tradelink: tradelink,
      listedPrice: prices,
    });

    // Add a listener for the "offer status" event
    socket.on("offer status", (statusData) => {
      if (statusData.status === 3) {
        toast.success("Trade offer sent successfully!");
        setShowPopup(true); // Show the popup when trade is successful

        // Close the modal
        sellAskModalRef.current.classList.remove("show");
        sellAskModalRef.current.style.display = "none";
        document.body.classList.remove("modal-open");
        const modalBackdrops =
          document.getElementsByClassName("modal-backdrop");
        if (modalBackdrops.length > 0) {
          document.body.removeChild(modalBackdrops[0]);
        }
      } else if (statusData.error) {
        toast.error(`Error: ${statusData.error}`);
      }
    });
  };

  return (
    <>
      <div
        ref={sellAskModalRef}
        className="modal fade"
        id="sellAsk"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="model-header" id="sellModalHeader">
              <h5
                className="model-title primaryTextColor"
                id="sellmodelLabel"
              ></h5>
              <span className="balanceContainer"></span>
              <button
                type="button"
                className="close mx-3"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="gridBoxContent">
                <section>
                  <figure>
                    <figcaption>
                      <h4 className="m-3">Enlist items for sale</h4>
                    </figcaption>
                  </figure>
                  <div
                    className="gridBoxContent"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, 250px)",
                      gridAutoFlow: "row",
                    }}
                  >
                    {addCard.length > 0 ? (
                      addCard.map((skin, index) => (
                        <div key={index} className="gridBoxContent m-3">
                          <div className="d-flex">
                            <div className="price">
                              ${skin.price.toFixed(2)}
                            </div>
                            <div className="info ml-auto">
                              <FaInfoCircle />
                            </div>
                          </div>
                          <div className="text-center">
                            <img
                              src={`https://steamcommunity-a.akamaihd.net/economy/image/${skin.data.image}`}
                              className="w-75"
                              alt=""
                            />
                          </div>
                          <div className="discount">
                            <FaAccusoft className="cardIcon d-block" />
                            <span className="d-block primaryTextColor font-09rem">
                              {skin.data.market_hash_name
                                .split(" ")
                                .map((word, index) =>
                                  word === "StatTrak™" ? (
                                    <span className="Stattrak-gradientText">
                                      ST{" "}
                                    </span>
                                  ) : (
                                    word + " "
                                  )
                                )}
                            </span>
                            <div className="d-flex">
                              <div
                                className="text-grey ratingValue font-p85rem"
                                style={{
                                  color:
                                    skin.item_wear === "FN"
                                      ? "D2D2D2"
                                      : "CF6A32",
                                }}
                              >
                                {skin.item_wear}
                              </div>
                              <div
                                className={`text-grey ml-auto ${
                                  skin.data.tradable === 1
                                    ? "unlockIcon"
                                    : "lock-Icon"
                                }`}
                              >
                                {skin.data.tradable === 1 ? (
                                  <FaLockOpen />
                                ) : (
                                  <FaLock />
                                )}
                              </div>
                            </div>
                          </div>

                          <Form.Control
                            type="text"
                            value={prices[skin.assetid] || ""}
                            onChange={(event) =>
                              handlePriceChange(event, skin.assetid)
                            }
                            placeholder="Enter listed price"
                            className="mb-2 mt-3"
                            pattern="^\d+(\.\d{1,2})?$"
                            required
                          />
                        </div>
                      ))
                    ) : (
                      <p>No skins selected.</p>
                    )}
                  </div>
                  <div className="text-center m-0 gradientText text-center">
                    <label>4% fee: ${fee}</label>
                    <br />
                    <label>You will receive: ${receive}</label>
                  </div>
                </section>
              </div>
            </div>
            <div className="model-footer text-center m-3 mb-4">
              <button
                type="button"
                className="btn Darkbtn shadow px-4 my-2 mr-2 my-sm-0"
                data-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                Close
              </button>
              <button
                className="btn GradientBtn my-2 px-4 mr-2 my-sm-0 text-white"
                onClick={handleProceedClick}
              >
                <span className="text-white GradientBtnWhite">
                  Confirm to sell
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellAsk;
