import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { FaMedrt, FaShoppingCart } from "react-icons/fa";
import { ImMagicWand } from "react-icons/im";
import { TbArrowsRightLeft } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { CardState } from "./BuyBody";
import "./BuyBody.css";
import BuyModal from "./BuyModal";

import BuySkinSelectedCard from "./BuySkinSelectedCard";
import BuySkinCard from "./BuySkinCard";
import { useMatch, useResolvedPath } from "react-router-dom";

const BuyCard = () => {
  // Card State
  const { state } = CardState();
  const [total, setTotal] = useState();

  // Total Sum of Price In  Real Time
  localStorage.setItem("buyTotal", total);
  useEffect(() => {
    setTotal(
      state.addCard
        .reduce((acc, curr) => acc + Number(curr.price), 0)
        .toFixed(2),
    );
  }, [state.addCard]);

  // Check Which Page is Active
  let resolvedPath = useResolvedPath();
  let activePage = useMatch({ path: resolvedPath.pathname });

  const renderSkins = () => {
    return state.buyData.map((skin, id) => (
      <div key={id}>
        <BuySkinSelectedCard {...skin} />
      </div>
    ));
  };

  return (
    <>
      {/* Main Container of Skins */}
      <Scrollbars style={{ height: "50vh" }}>
        <div className="gridBox">{renderSkins()}</div>
      </Scrollbars>

      {/* Price And Quantity */}
      <PriceAndQuantity activePage={activePage} state={state} total={total} />

      {/* Selected Card Show */}
      <SelectedCardShow state={state} />

      {/* Button Section */}
      <ButtonSection activePage={activePage} state={state} />

      {/* All Model bodies are Here */}
      <BuyModal state={state} total={total} />
    </>
  );

  function PriceAndQuantity({ activePage, state, total }) {
    return activePage.pathname === "/buy" ? (
      <BuyPriceAndQuantity state={state} total={total} />
    ) : (
      <ExchangePriceAndQuantity state={state} total={total} />
    );
  }

  function BuyPriceAndQuantity({ state, total }) {
    return (
      <div className="my-2">
        <span className="gradientText font-2halfrem">
          $ <span id="buyTotal">{total}</span>
        </span>
        <span className="gradientText mx-1">( {state.addCard.length} )</span>
        <span className="primaryTextColor mx-2">
          In case of purchase you'll be asked to pay
        </span>
        <span className="gradientText">${total}</span>
      </div>
    );
  }

  function ExchangePriceAndQuantity({ state, total }) {
    return (
      <div className="my-2">
        <span className="gradientText font-2halfrem">
          $ <span id="buyTotal">{total}</span>
        </span>
        <span className="gradientText mx-1">( {state.addCard.length} )</span>
        <span className="primaryTextColor mx-2">
          In case of Exchange you'll get $ <span id="difference">0.00</span>
          on your balance which can only be used for buying items on
          CSFairTrade.
        </span>
        <span className="gradientText">${total}</span>
      </div>
    );
  }

  function SelectedCardShow({ state }) {
    return state.addCard.length > 0 ? (
      <SelectedCardWithContent state={state} />
    ) : (
      <SelectedCardNoContent />
    );
  }

  function SelectedCardWithContent({ state }) {
    return (
      <Scrollbars style={{ height: "30vh" }}>
        <div className="gridBox">
          {state.addCard.map((content, id) => (
            <div key={id}>
              <BuySkinCard {...content} />
            </div>
          ))}
        </div>
      </Scrollbars>
    );
  }

  function SelectedCardNoContent() {
    return (
      <div className="gridBox">
        <div className="" id="addGridID"></div>
      </div>
    );
  }

  function ButtonSection({ activePage, state }) {
    return activePage.pathname === "/buy" ? (
      <BuyButtonSection state={state} />
    ) : (
      <ExchangeButtonSection state={state} />
    );
  }

  function BuyButtonSection({ state }) {
    return (
      <button
        className="btn Darkbtn"
        disabled={state.addCard.length > 0 ? false : true}
        data-toggle="modal"
        data-target="#buyModal"
      >
        <span>
          <FaShoppingCart className="mr-2" />
        </span>
        <span className="darkModeBtn ">Buy</span>
      </button>
    );
  }
  function ExchangeButtonSection({ state }) {
    return (
      <div className="my-3">
        <button
          className="btn Darkbtn my-2 mr-2 my-sm-0"
          disabled={state.addCard.length > 0 ? false : true}
          data-toggle="modal"
          data-target="#exchangeModal"
        >
          <span>
            <TbArrowsRightLeft className="mr-2" />
          </span>
          <span className="darkModeBtn">Exchange</span>
        </button>
      </div>
    );
  }
};

export default BuyCard;
