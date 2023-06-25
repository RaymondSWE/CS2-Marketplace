import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import {
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
  FaRegCreditCard,
  FaShoppingCart,
} from "react-icons/fa";
import Scrollbars from "react-custom-scrollbars-2";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "${process.env.REACT_APP_API_URL}/",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <button
        className="btn navbarBtn my-2 mr-2 my-sm-0 text-white"
        data-toggle="modal"
        data-target="#paymentModal"
      >
        <span>
          <FaCreditCard className="mr-2" style={{ color: "#85ffc4" }} />
        </span>
        <span className="navbarBtnGradientText">Fill Balance</span>
      </button>
      {/* All Model bodies are Here */}

      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="buyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="buyModalLabel">
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
                <form id="payment-form" onSubmit={handleSubmit}>
                  <PaymentElement
                    id="payment-element"
                    options={paymentElementOptions}
                  />

                  <div className="btn-container">
                    <button
                      type="button"
                      className="btn Darkbtn shadow px-4 my-2 mr-2 my-sm-0 btn-block"
                      data-dismiss="modal"
                    >
                      <span className="darkModeBtn">Close</span>
                    </button>

                    <button
                      disabled={isLoading || !stripe || !elements}
                      id="submit"
                      className="btn GradientBtn my-2 px-4 mr-2 my-sm-0 text-white btn-block"
                    >
                      <span
                        id="button-text"
                        className="text-white GradientBtnWhite"
                      >
                        {isLoading ? (
                          <div className="spinner" id="spinner"></div>
                        ) : (
                          "Pay now"
                        )}
                      </span>
                    </button>
                    {/* Show any error or success messages */}
                  </div>
                  {message && (
                    <div
                      id="payment-message"
                      className="text-center my-3"
                      style={{ color: "#fe87a1" }}
                    >
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
