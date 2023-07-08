import React, { useState, useEffect } from "react";
import "./Deposit.css";
import {
  FaGooglePay,
  FaCreditCard,
  FaPaypal,
  // Add other icons here as required
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";

const PaymentOptions = [
  { name: "Google Pay", icon: <FaGooglePay /> },
  { name: "Credit/Debit Card", icon: <FaCreditCard /> },
  { name: "PayPal", icon: <FaPaypal /> },
  // Include other options as required
];

const Deposit = ({ handleCloseDeposit, showModal }) => {
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PaymentOptions[0]);
  const [showDeposit, setShowDeposit] = useState(false);

  const toggleDeposit = () => {
    handleCloseDeposit();
  };

  useEffect(() => {
    setFee(amount > 0 ? amount * 0.05 + 0.3 : 0);
  }, [amount]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAmountOptionClick = (value) => {
    setAmount(value);
  };

  const handlePaymentOptionClick = (option) => {
    setPaymentMethod(option);
  };

  const handleSubmit = () => {
    // You would call your API here to process the deposit
    alert(
      `Amount: ${amount}\nBonus: ${fee}\nPayment Method: ${paymentMethod.name}`,
    );
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseDeposit}
      className="deposit-component"
      overlayClassName="Overlay"
    >
      <div className="close-button">
        <AiOutlineClose className="close-icon" onClick={toggleDeposit} />
      </div>
      <div className="form-section">
        <div>
          <label className="gradientText" htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        <div>
          <div className="amount-options">
            {[1, 5, 10, 20, 50, 100].map((value) => (
              <div
                key={value}
                onClick={() => handleAmountOptionClick(value)}
                className="amount-option"
              >
                ${value}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="gradientText">Payment Method:</label>
          <div className="payment-options">
            {PaymentOptions.map((option, index) => (
              <div
                className={`payment-option ${
                  paymentMethod.name === option.name ? "selected" : ""
                }`}
                key={index}
                onClick={() => handlePaymentOptionClick(option)}
                data-testid={option.name}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="summary-section">
        <label className="gradientText">Summary:</label>
        <p>
          Payment Method:{" "}
          <span className="gradientText">{paymentMethod.name}</span> <br />
          Amount: <span className="gradientText"> ${amount}</span>
          <br />
          Fee:{" "}
          <span className="gradientText">
            + ${parseFloat(fee).toFixed(2)}
          </span>{" "}
          <br />
          <br />
        </p>
        <div className="mt-4">
          {" "}
          <span className="total-label">Total: </span> <br />{" "}
          <span className="text-grey total">
            ${parseFloat(amount) + parseFloat(fee)}
          </span>
        </div>
        <br />
        <button onClick={handleSubmit}>
          <span className="gradientText">Confirm</span>
        </button>
      </div>
    </Modal>
  );
};

export default Deposit;
