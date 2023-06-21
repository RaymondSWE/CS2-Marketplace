// import React, { useContext, useState } from "react";
import "./SellBody.css";
import { FaAccusoft, FaInfoCircle, FaLockOpen, FaLock } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { CardState } from "./SellBody";
import "./SellBody.jsx";
import { useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { toast } from "react-toastify";

const SellSkinSelectedCard = (props) => {
  // const { buyData } = useContext(CardContext);
  let history = useNavigate();
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
    } else {
      toast.error("This item is not tradable.");
    }
  };

  return (
    <>
      <div className="gridBoxContent" id={`grid${props.assetid}`}>
        <div className="d-flex">
          <div className="price">${props.price}</div>
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
              src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.data.image}`}
              className="w-100"
              alt=""
            />
          </div>
          <div className="discount">
            <span className="discountPercent d-block itemName">
              {/* ${Math.floor(props.price - (props.price * 20) / 100)} */}
            </span>
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
            {/* 
            <span className="d-block text-grey font-p85rem m-0">
              FLOAT DISPLAY
            </span> */}
            <span className="d-block primaryTextColor font-p75rem m-0">
              {/* {props.float.paintwear.toFixed(4)} */}
            </span>
            {/* The problem is that all of the items have different amount of arrays which causes crash, its the category with "exterior" that has to be set */}
            {/* <span className="d-block text-grey font-p75rem">
              {props.tags[2].category}
            </span> */}

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
        {/* All Sell Modal */}
        <div
          className="modal fade"
          id={`infoModel${props.assetid}`}
          tabIndex="-1"
          aria-labelledby="sellModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" id="itemDetailsForUser">
              <div className="modal-header p-0">
                <a href="#div-1" className="modal-title" id="itemDetails">
                  ITEM DETAILS
                </a>
                <span className="balanceContainer"></span>
                <button
                  type="button"
                  className="close"
                  style={{ padding: "2rem" }}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => history("/sell")}
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
                        {/* {props.hasOwnProperty("market_actions") === true
                          ? console.log()
                          : console.log(props.name)} */}
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
                              <FiShare2 className="darkModeBtn mx-3" />
                            </span>
                            <span className="darkModeBtn">Inspect</span>
                          </button>
                        </a>
                        <img
                          src={`https://steamcommunity-a.akamaihd.net/economy/image/${props.data.image}`}
                          className="w-100 mx-2 my-4"
                          alt=""
                        />
                      </div>
                      <div className="col-md-6 px-3">
                        <h5>
                          <IoStar
                            className=" mx-2"
                            style={{ marginTop: "-1.5%" }}
                          />
                          {props.data.market_hash_name
                            .split(" ")
                            .map((word, index) =>
                              word === "StatTrak™" ? (
                                <span className="Stattrak-gradientText">
                                  StatTrak™{" "}
                                </span>
                              ) : (
                                word + " "
                              )
                            )}
                        </h5>

                        <div className="mt-4 mx-3">
                          <h6 className="d-block mb-0 labelHead">Price</h6>
                          <span className="gradientText labelValue">
                            ${props.price}
                          </span>
                          {/* <span className='colorPrimary mx-2 labelExtra'>
                            {`${(
                              props.prices.latest - props.prices.avg
                            ).toFixed(2)}%`}
                          </span> */}
                        </div>
                        <div className="mt-3 mx-3">
                          <h6 className="d-block mb-0 labelHead">
                            Suggested Price
                          </h6>
                          <span className="gradientText labelValue">
                            {/* ${props.prices.median.toFixed(2)} */}
                          </span>
                        </div>
                        {/* <div className='mt-3 mx-3'>
                          <h6 className='d-block mb-0 labelHead'>Trade lock</h6>
                          <span className='gradientText labelValue'>1d</span>
                        </div> */}
                        {/* <div className="mt-3 mx-3">
                            <h6 className="d-block mb-0 labelHead">Item location</h6>
                            <span className="gradientText labelValue">DMarket NFT Blockchain</span>
                        </div> */}
                        {/* <div className='mt-3 mx-3'>
                          <h6 className='d-block mb-0 labelHead'>Pattern</h6>
                          <span className='gradientText labelValue'>926</span>
                        </div> */}
                        <div className="mt-3 mx-3">
                          <h6 className="d-block mb-0 labelHead">Item type</h6>
                          <span className="gradientText labelValue">
                            {props.item_type.name}
                          </span>
                        </div>
                        {/* <div className='mt-3 mx-3'>
                          <h6 className='d-block mb-0 labelHead'>
                            Owner’s Blockchain NFT ID
                          </h6>
                          <span className='gradientText labelValue'>
                            0791ff1adeef7c00b81e62117fd380455b5a
                          </span>
                        </div> */}
                        <div className="mt-3 mx-3">
                          <h6 className="d-block mb-0 labelHead">Float</h6>
                          {/* <span className="gradientText labelValue">{props.float.paintwear.toFixed(4)}</span> */}
                        </div>
                      </div>
                    </div>
                  </section>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellSkinSelectedCard;
