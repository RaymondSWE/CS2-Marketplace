import { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Modal from "react-modal";
import useUserSession from "../../hooks/useUserSession";
import useUserWebsocket from "../../hooks/useUserWebSocket";
import { FaLockOpen, FaLock } from "react-icons/fa";

import "./WithdrawSkinsModal.css";

const WithdrawSkinsModal = ({ handleCloseWithdraw, showModal }) => {
  const { userSteamId, fetchUserItems, userItems, tradeLink } =
    useUserSession();
  const [start, setStart] = useState(0);
  const { socket } = useUserWebsocket(); // use the custom hook

  useEffect(() => {
    (async () => {
      // console.log('User Steam ID:', userSteamId);
      await fetchUserItems();
      // console.log('Items for Sale:', userItems);
    })();
  }, [userSteamId, fetchUserItems]);

  const toggleWithdraw = () => {
    handleCloseWithdraw();
  };

  const handleItemOptionClick = (assetid) => {
    /// Emit the withdraw event with the steamID64 and assetid
    socket.emit("withdraw", {
      steamID64: userSteamId,
      assetid: assetid,
      bot_id: "bot_1",
      tradeUrl: tradeLink,
    });

    if (!tradeLink) {
      toast.error("Trade link is not defined. Please set your trade link first.");
      return;
    }
    

    console.log("Steam ID in handleItemOptionClick: ", userSteamId);
    console.log("Asset ID in handleItemOptionClick: ", assetid);
    console.log("Bot ID in handleItemOptionClick: ", "bot_1");
    console.log("Trade link in handleItemOptionClick: ", tradeLink);
    socket.on("withdraw status", (data) => {
      if (data.error) {
        toast.error(`Error withdrawing item: ${data.error}`);
        console.log(assetid);
      } else {
        toast.success(`Withdraw successful: ${data.message}`);
        // Update your UI accordingly
      }
    });
  };

  const scroll = (direction) => {
    const newStart = start + (direction === "right" ? 3 : -3);
    setStart(Math.max(0, Math.min(newStart, userItems.length - 6)));
  };

  const getSkinNameWithStattrak = (name) => {
    return name.split(" ").map((word, index) =>
      word === "StatTrak™" ? (
        <span key={index} className="Stattrak-gradientText">
          StatTrak™{" "}
        </span>
      ) : (
        word + " "
      ),
    );
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseWithdraw}
        className="withdraw-component"
        overlayClassName="Overlay"
      >
        <div className="close-button">
          <AiOutlineClose className="close-icon" onClick={toggleWithdraw} />
        </div>
        <div className="form-section">
          <h2 className="title gradientText">Withdraw Skins</h2>
          <div className="navigation-buttons">
            <button
              className="arrow-button left"
              onClick={() => scroll("left")}
            >
              <AiOutlineLeft />
            </button>
            <button
              className="arrow-button right"
              onClick={() => scroll("right")}
            >
              <AiOutlineRight />
            </button>
          </div>
          <div className="items-options">
            {userItems.length > 0 ? (
              userItems.slice(start, start + 6).map((item) => (
                <div key={item.assetid} className="item-option">
                  <div
                    className={`item-lock-icon ${
                      item.tradable === 1 ? "unlockIcon" : "lock-Icon"
                    }`}
                  >
                    {item.tradable === 1 ? <FaLockOpen /> : <FaLock />}
                  </div>
                  <img
                    src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.image}`}
                    alt={item.market_hash_name}
                  />
                  <div className="item-info">
                    <span className="item-name gradientText">
                      {getSkinNameWithStattrak(item.market_hash_name)}
                    </span>
                  </div>
                  <span className="item-price">
                    Steam Price:{" "}
                    <span className="price gradientText">${item.price}</span>
                  </span>
                  <span className="item-listed-price">
                    Listed for:{" "}
                    <span className="price gradientText">
                      ${item.listed_price}
                    </span>
                  </span>
                  {item.tradable ? (
                    <button
                      onClick={() => handleItemOptionClick(item.assetid)}
                      className="withdraw-button gradientText"
                    >
                      Withdraw
                    </button>
                  ) : (
                    <button disabled className="withdraw-button gradientText">
                      Withdraw
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-items-message">
                No items available for withdrawal.
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithdrawSkinsModal;
