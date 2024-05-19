import React from "react";
import BuyBody from "../BuyBody/BuyBody";
import SellBody from "../SellBody/SellBody";
import "./ExchangeBody.css";

const ExchangeBody = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <BuyBody />
        </div>
        <div className="col-md-4">
          <SellBody />
        </div>
      </div>
    </>
  );
};

export default ExchangeBody;
