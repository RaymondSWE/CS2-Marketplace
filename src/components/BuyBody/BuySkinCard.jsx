import React from "react";
import "./BuyBody.css";
import "../Banner/SkinPreview.css";
import { FaAccusoft, FaInfoCircle, FaLockOpen, FaLock } from "react-icons/fa";
import { CardState } from "./BuyBody";

const BuySkinCard = (props) => {
  const {
    state: { addCard },
    dispatch,
  } = CardState();

  // Select Card
  const selectCard = (id) => {
    return dispatch({
      type: "ADD_TO_CARD",
      payload: props,
    });
  };

  // Remove Card
  const removeCard = (id) => {
    return dispatch({
      type: "REMOVE_FROM_CARD",
      payload: props,
    });
  };

  // Calculate discount
  const calculateDiscount = (listedPrice, marketPrice) => {
    const discount =
      ((parseFloat(listedPrice) - parseFloat(marketPrice)) /
        parseFloat(marketPrice)) *
      100;
    return discount.toFixed(2);
  };
  const discountPercentage = calculateDiscount(props.listed_price, props.price);

  return (
    <>
      <div
        className={`gridBoxContent ${
          props.disableUnselect ? "disableSelect" : ""
        }`}
        id={props.assetid}
        onClick={() =>
          props.disableUnselect
            ? null // Do nothing when disableUnselect is true
            : addCard.some((p) => p.assetid === props.assetid)
            ? removeCard(props.assetid)
            : selectCard(props.assetid)
        }
      >
        <div className="d-flex">
          <div className="price">${props.listed_price}</div>
          <div className="info ml-auto">
            <FaInfoCircle />
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
          <div
            className={`discount ${
              discountPercentage < 0 ? "discountGreen" : "discountRed"
            }`}
          >
            {discountPercentage}%
          </div>
          <FaAccusoft className="cardIcon d-block" />
          <span className="d-block primaryTextColor font-09rem m-0">
            {props.market_hash_name
              .split(" ")
              .map((word, index) =>
                word === "StatTrak™" ? (
                  <span className="Stattrak-gradientText">StatTrak™ </span>
                ) : (
                  word + " "
                )
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
    </>
  );
};

export default BuySkinCard;
