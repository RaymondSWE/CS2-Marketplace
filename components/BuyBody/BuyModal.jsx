import React, { useState } from "react";
import { TiMessages } from "react-icons/ti";
import Deposit from "../Deposit/Deposit";
import BuySkinCard from "./BuySkinCard";
import Scrollbars from "react-custom-scrollbars-2";
import useUserSession from "../../hooks/useUserSession";
import "./BuyBody.css"; // import the CSS file
import ZenPayModal from "../zenpay/ZenPayModal";

const BuyModal = ({ state, total }) => {
  const handlePurchase = () => {
    // Your purchase handling logic here
  };
  const totalPrice = state.addCard.reduce(
    (total, skin) => total + skin.price,
    0
  );

  const { balance } = useUserSession(); // Get the balance from the useUserSession hook
  const [showDeposit, setShowDeposit] = useState(false);

  const handleToggleDeposit = () => {
    setShowDeposit(!showDeposit);
  };

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="buyModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Checkout Page
            </h5>
            <span className="balanceContainer">
              <span className="text-white">
                <TiMessages className="mr-2" style={{ fontSize: "1.5rem" }} /> $
                {balance}
              </span>
            </span>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="tab-content mt-3">
                <div
                  className="tab-pane fade show active"
                  id="check"
                  role="tabpanel"
                  aria-labelledby="check-tab"
                >
                  <Scrollbars style={{ height: "30vh" }}>
                    <div className="gridBox">
                      {state.addCard.map((content) => (
                        <BuySkinCard
                          key={content.id}
                          {...content}
                          disableUnselect
                        />
                      ))}
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
          <div className="totalAmountContainer">
            <div className="totalAmount gradientText">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
          <div className="modal-footer m-3">
            <button
              type="button"
              className=" gradientText  buy-modal-button my-2 mr-2 my-sm-0 text-white"
              disabled={state.addCard.length > 0 ? false : true}
              onClick={handleToggleDeposit}
            >
              Deposit
            </button>

            <button
              type="button"
              className="btn GradientBtn purchase-modal-button my-2 mr-2 my-sm-0 text-white"
              disabled={state.addCard.length > 0 ? false : true}
              onClick={handlePurchase}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
      {showDeposit && (
        <Deposit
          showModal={showDeposit}
          handleCloseDeposit={handleToggleDeposit}
        />
      )}
    </div>
  );
};

export default BuyModal;
