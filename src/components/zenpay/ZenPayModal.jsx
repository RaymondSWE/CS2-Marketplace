import React from "react";
import "./ZenPayModal.css";
import { FaCreditCard } from "react-icons/fa";

const ZenPayModal = () => {
  return (
    <>
      <button
        className="btn navbarBtn my-2 mr-2 my-sm-0 text-white"
        data-toggle="modal"
        data-target="#zenPayModal"
      >
        <span>
          <FaCreditCard className="mr-2" style={{ color: "#85ffc4" }} />
        </span>
        <span className="navbarBtnGradientText">Fill Balance</span>
      </button>

      <div
        className="modal fade"
        id="zenPayModal"
        tabIndex="-1"
        aria-labelledby="zenPayModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="zenPayModalLabel">
                Fill Balance
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
              <div className="container text-white">
                {/* Your payment processing form and logic should be implemented here */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn Darkbtn shadow px-4 my-2 mr-2 my-sm-0 btn-block"
                data-dismiss="modal"
              >
                <span className="darkModeBtn">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZenPayModal;
