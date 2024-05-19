import React from "react";
import "./BuyBody.css";
import { FaAccusoft, FaInfoCircle, FaLockOpen, FaLock } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { CardState } from "./BuyBody";

import { useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { toast } from "react-toastify";

const BuySkinSelectedCard = (props) => {
  let history = useNavigate();

  const {
    state: { addCard },
    dispatch,
  } = CardState();

  // SelectCard Function

  const selectCard = (id) => {
    return dispatch({
      type: "ADD_TO_CARD",
      payload: props,
    });
  };
  console.log(props);

  // Removed Function
  const removeCard = (id) => {
    return dispatch({
      type: "REMOVE_FROM_CARD",
      payload: props,
    });
  };

  // Calculate the discount percentage
  const calculateDiscount = (listedPrice, marketPrice) => {
    const discount =
      ((parseFloat(listedPrice) - parseFloat(marketPrice)) /
        parseFloat(marketPrice)) *
      100;
    return discount.toFixed(2);
  };

  const discountPercentage = calculateDiscount(props.listed_price, props.price);

  const handleClick = () => {
    if (props.tradable === 1) {
      if (addCard.some((p) => p.assetid === props.assetid)) {
        removeCard(props.assetid);
      } else {
        selectCard(props.assetid);
      }
    } else {
      toast.error("This item is not tradable.");
    }
  };

  return (
    <>
      <div
        className="gridBoxContent"
        id={`buyGrid${props.assetid}`}
        data-testid={`buyGrid${props.assetid}`}
      >
        <div className="d-flex">
          <div className="price">${props.listed_price}</div>
          <div
            className="info ml-auto"
            data-toggle="modal"
            data-target={`#infoModel${props.assetid}`}
          >
            <FaInfoCircle />
          </div>
        </div>
        <div id={props.assetid} onClick={handleClick}>
          <div
            className={
              addCard.some((p) => p.assetid === props.assetid)
                ? "d-block "
                : "d-none"
            }
          >
            <div className="selectBox">
              <span className="selecttext">Selected</span>
            </div>
          </div>

          <div className="text-center">
            <img
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.image}`}
              className="w-100 mx-2 my-4"
              alt=""
            />
          </div>

          <div className="discount">
            <div className="discount">
              <span
                className={`d-block itemName ${
                  discountPercentage < 0 ? "discountGreen" : "discountRed"
                }`}
              >
                {discountPercentage}%
              </span>
            </div>
            <FaAccusoft className="cardIcon d-block " />
            <span className="d-block primaryTextColor font-09rem">
              {props.market_hash_name
                .split(" ")
                .map((word, index) =>
                  word === "StatTrak™" ? (
                    <span className="Stattrak-gradientText">StatTrak™ </span>
                  ) : (
                    word + " "
                  ),
                )}
            </span>

            <span className="d-block primaryTextColor font-p75rem ">
              {parseFloat(props.paintwear).toFixed(4)}
            </span>
            <div className="d-flex">
              <div className="text-grey ratingValue font-p85rem ">
                {props.item_wear}
              </div>
              <div
                className={`text-grey ml-auto ${
                  props.tradable === 1 ? "unlockIcon" : "lock-Icon"
                }`}
              >
                {props.tradable === 1 ? <FaLockOpen /> : <FaLock />}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Inspection of weapon */}
      <div
        className="modal fade"
        id={`infoModel${props.assetid}`}
        tabIndex="-1"
        aria-labelledby="sellModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content" id="itemDetails">
            <div className="modal-header p-0">
              <a
                href="#div-1"
                className="modal-title gradientText"
                id="itemDetails"
              >
                ITEM DETAILS
              </a>
              <span className="balanceContainer"></span>
              <button
                type="button"
                className="close"
                style={{ padding: "2rem" }}
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => history("/buy")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Scrollbars style={{ height: "40vh", overflowX: "hide" }}>
                <section
                  id="div-1"
                  style={{
                    width: "100%",
                    height: "400px",
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={
                          props.hasOwnProperty("inspect") === true
                            ? props.inspect
                            : "/"
                        }
                      >
                        <button className="btn shareBtn btn-block my-4 mr-2 my-sm-0">
                          <span>
                            <FiCamera className="darkModeBtn mx-3" />
                          </span>
                          <span className="gradientBtn">Inspect</span>
                        </button>
                      </a>
                      <img
                        src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.image}`}
                        className="w-100 mx-2 my-4"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 px-3 ">
                      <h5>
                        <IoStar
                          className=" mx-2 "
                          style={{ marginTop: "-1.5%" }}
                        />
                        {props.market_hash_name
                          .split(" ")
                          .map((word, index) =>
                            word === "StatTrak™" ? (
                              <span className="Stattrak-gradientText">
                                StatTrak™{" "}
                              </span>
                            ) : (
                              word + " "
                            ),
                          )}
                      </h5>

                      <div className="my-4 mx-4 ">
                        <div className="mb-2">
                          <h6 className="d-block  labelHead">
                            Steam Market Price
                          </h6>
                          <span className="gradientText labelValue">
                            ${props.price}
                          </span>
                        </div>
                        <div className="mb-2">
                          <h6 className="d-block  labelHead">Paintindex</h6>
                          <span className="gradientText labelValue">
                            {props.paintindex}
                          </span>
                        </div>
                        <h6 className="d-block  labelHead">Paintseed</h6>
                        <span className="gradientText labelValue">
                          {props.paintseed}
                        </span>

                        <h6 className="d-block  labelHead">Suggested Price</h6>
                        <span className="gradientText labelValue">
                          {/* ${props.prices.median.toFixed(2)} */}
                        </span>

                        <h6 className="d-block  labelHead">Exterior</h6>
                        <span className="gradientText labelValue">
                          {props.item_wear}
                        </span>

                        <h6 className="d-block labelHead">Float</h6>
                        <span className="gradientText labelValue">
                          {" "}
                          {parseFloat(props.paintwear).toFixed(4)}
                        </span>

                        <h6 className="d-block labelHead">Tradable</h6>
                        <span className="gradientText labelValue">
                          {props.tradable === 1 ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySkinSelectedCard;
