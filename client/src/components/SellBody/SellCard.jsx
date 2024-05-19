import React, { useEffect, useState } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { MdOutlineInventory } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { BsLightningChargeFill, BsHeartHalf } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { CardState } from "./SellBody";
import "./SellBody.css";
import SellSkinSelectedCard from "./SellSkinSelectedCard";
import SellSkinCard from "./SellSkinCard";
import SellAsk from "./SellPopup";

const SellCard = () => {
  const { state } = CardState();
  const [total, setTotal] = useState();

  // Check if buttons should be disabled
  const buttonsDisabled = state.addCard.length === 0;

  localStorage.setItem("sellTotal", total);
  useEffect(() => {
    setTotal(
      state.addCard
        .reduce((acc, curr) => acc + Number(curr.price), 0)
        .toFixed(2),
    );
  }, [state.addCard]);

  let resolvedPath = useResolvedPath();
  let activePage = useMatch({ path: resolvedPath.pathname });
  return (
    <>
      <SellAsk />
      <Scrollbars style={{ height: "50vh" }}>
        <div className="gridBox">
          {state.sellData.length !== 0 ? (
            state.sellData.map((content, id) => (
              <div key={id}>
                <SellSkinSelectedCard {...content} />
              </div>
            ))
          ) : (
            <h6 className="error text-danger">
              To view your inventory, please log in
            </h6>
          )}
        </div>
      </Scrollbars>
      {activePage.pathname === "/sell" ? (
        <div className="my-2 text-right">
          <span className="gradientText font-2halfrem">
            $ <span id="sellTotal">{total}</span>
          </span>
          <span className="primaryTextColor mx-2">Sell now and get :</span>
          <span className="gradientText mx-1">({state.addCard.length})</span>
          <span className="gradientText">${total}</span>
        </div>
      ) : (
        <div className="my-2 text-right">
          <span className="primaryTextColor mx-2">
            The price of items for exchange is :
          </span>
          <span className="gradientText mx-1">({state.addCard.length})</span>
          <span className="gradientText font-2halfrem">
            $ <span id="sellTotal">{total}</span>
          </span>
        </div>
      )}
      <div className="">
        {state.addCard.length > 0 ? (
          <>
            <Scrollbars style={{ height: "20vh" }}>
              <div className="gridBox">
                {state.addCard.map((content, id) => (
                  <SellSkinCard key={id} {...content} />
                ))}
              </div>
            </Scrollbars>
          </>
        ) : (
          <div className="gridBoxEmpty">
            <div className="gridBoxContent h-15vh" id="addGridID"></div>
          </div>
        )}
      </div>
      <div className="my-3 mt-5">
        {activePage.pathname === "/sell" ? (
          <>
            <button
              className="btn GradientBtn my-2 mr-2 my-sm-0 text-white"
              disabled={buttonsDisabled}
            >
              <span>
                <MdOutlineInventory className="mr-2" />
              </span>
              <span className="text-white GradientBtnWhite">Withdraw</span>
            </button>

            <button
              className="btn GradientBtn my-2 mr-2 my-sm-0 text-white"
              data-toggle="modal"
              data-target="#sellAsk"
              disabled={buttonsDisabled}
            >
              <span>
                <BiTimeFive className="mr-2" />
              </span>
              <span className="text-white GradientBtnWhite">Sell | Ask</span>
            </button>

            <button
              className="btn Darkbtn my-2 mr-2 my-sm-0"
              data-toggle="model"
              data-target="#sellmodel"
              disabled={buttonsDisabled}
            >
              <span>
                <BsLightningChargeFill className="mr-2" />
              </span>
              <span className="darkModeBtn">Quick sell</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="btn GradientBtn my-2 mr-2 my-sm-0 text-white"
              disabled={buttonsDisabled}
            >
              <span>
                <MdOutlineInventory className="mr-2" />
              </span>
              <span className="text-white GradientBtnWhite">Withdraw</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SellCard;
