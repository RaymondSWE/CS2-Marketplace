import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import PaymentCard from "./PaymentCard";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51M7MaJC80eeCracaJLY2hyVkdlEiEgc4OJcnkTT5ikkYSa4cZU3yA51S5yhKkHYdgsarJNN3uEMP08MQxNaE41IX00pX6NmJx6"
);

export default function CheckoutPop() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#1750d3",
      colorBackground: "#1c1d2c",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentCard />
        </Elements>
      )}
    </div>
  );
}
