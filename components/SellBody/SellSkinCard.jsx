// import React, { useContext, useState } from "react";
import "./SellBody.css";
import { FaAccusoft, FaInfoCircle, FaLockOpen, FaLock } from "react-icons/fa";
import { CardState } from "./SellBody";

const SellSkinCard = (props) => {
  const {
    state: { addCard },
    dispatch,
  } = CardState();

  const selectCard = (id) => {
    return dispatch({
      type: "ADD_TO_CARD",
      payload: props,
    });
  };

  const removeCard = (id) => {
    return dispatch({
      type: "REMOVE_FROM_CARD",
      payload: props,
    });
  };

  const handleClick = () => {
    if (props.data.tradable === 1) {
      if (addCard.some((p) => p.assetid === props.assetid)) {
        removeCard(props.assetid);
      } else {
        selectCard(props.assetid);
      }
    }
  };

  return (
    <>
      <div className="gridBoxContent" id={props.assetid} onClick={handleClick}>
        <div className="d-flex">
          <div className="price">${props.price}</div>
          <div className="info ml-auto">
            <FaInfoCircle />
          </div>
        </div>
        <div className="text-center">
          <img
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.data.image}`}
            className="w-75"
            alt=""
          />
        </div>

        <div className="discount">
          <FaAccusoft className="cardIcon d-block" />
          <span className="d-block primaryTextColor font-09rem">
            {props.data.market_hash_name
              .split(" ")
              .map((word, index) =>
                word === "StatTrak™" ? (
                  <span className="Stattrak-gradientText">StatTrak™ </span>
                ) : (
                  word + " "
                )
              )}
          </span>
          {/* <span className="d-block text-grey font-p85rem m-0">FLOAT</span> */}
          <span className="d-block primaryTextColor font-p75rem m-0">
            {/* {props.float.paintwear.toFixed(4)} */}
          </span>

          <div className="d-flex">
            {/* <div className="text-grey ratingValue">{props.ratingValue}</div> */}
            <div
              className="text-grey ratingValue font-p85rem"
              style={{
                color: props.item_wear === "FN" ? "D2D2D2" : "CF6A32",
              }}
            >
              {props.item_wear}
            </div>
            <div
              className={`text-grey ml-auto ${
                props.data.tradable === 1 ? "unlockIcon" : "lock-Icon"
              }`}
            >
              {props.data.tradable === 1 ? <FaLockOpen /> : <FaLock />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellSkinCard;
