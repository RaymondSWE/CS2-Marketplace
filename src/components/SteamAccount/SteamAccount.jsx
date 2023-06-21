import React, { useState } from "react";
import { FaSteam } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./SteamAccount.css";

const SteamAccount = (props) => {
  const [tradelink, setTradeLink] = useState("");
  const tradeUrl = "http://localhost:4000/api/user/addUserTradeLink";

  const tradeUrlPattern =
    /https:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[A-Za-z0-9]+/;

  const handleTradeLinkChange = (e) => {
    setTradeLink(e.target.value);
  };

  const handleTradeLinkUpdate = () => {
    const tradeData = {
      steamid64: props.response._json.steamid,
      tradelink: tradelink,
    };

    if (!tradeUrlPattern.test(tradelink)) {
      toast.error("Invalid Steam trade link", { theme: "colored" });
      return;
    }

    fetch(tradeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tradeData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { theme: "colored" });
        } else {
          toast.success("Trade Link added successfully!", { theme: "colored" });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className="modal fade"
      id="steamAccount"
      tabIndex="-1"
      aria-labelledby="steamAccountLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="steamAccountLabel">
              <FaSteam className="mr-2" />
              Steam Account
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container text-white text-center">
              <h6 className="gradientText">
                Connect your Steam trade link to your account!
              </h6>
              <img
                src={
                  props.response._json ? props.response._json.avatarfull : ""
                }
                width="70"
                height="70"
                className="userImage rounded-circle my-3"
                alt=""
              />
              <span className="accountName mt-0">
                {props.response.hasOwnProperty("displayName")
                  ? props.response.displayName
                  : "Not found"}
              </span>
              <div className="trade-url-instruction">
                <h6 className="gradientText mt-1 mb-2 d-block">
                  How to get a Steam trade URL?
                </h6>
                <span>
                  CSFairTrade requires a Steam trade URL for trading. The steam
                  trade URL can be obtained by clicking the "Click here to get
                  trade URL" button and you will be redirected to the Valve
                  website. Copy the URL and paste it below. Click "Apply" to
                  save your trade URL
                </span>
              </div>
              <div className="w-100 d-flex my-2">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Enter your Trade URL here"
                  onChange={(e) => setTradeLink(e.target.value)}
                ></input>
                <div className="text-left">
                  {" "}
                  {/* Add text-left here */}
                  <button
                    type="button"
                    className="btn gradient-button  my-0 ml-3 px-4 mr-2 my-sm-0 text-white"
                    onClick={handleTradeLinkUpdate}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="get-trade-url text-center">
                {props.response._json ? (
                  <a
                    href={`https://steamcommunity.com/profiles/${props.response._json.steamid}/tradeoffers/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn navbarBtn gradientText px-5 steamAccount-button">
                      Click here to get trade URL
                    </button>
                  </a>
                ) : (
                  <div className="error">Error: steamid is not available</div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="gradientText px-5 steamAccount-button"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteamAccount;
