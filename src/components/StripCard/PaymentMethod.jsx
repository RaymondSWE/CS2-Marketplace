import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_live_51M7MaJC80eeCracaz0IiWmMxVBsHmHeyEKUpIzvmxTgp8NTkhJNNu4YkLVLLKuBfijIye6r5G8Uvup96EUYmaeJp00y8V1PYts",
);

export default function PaymentMethod() {
  const [clientSecret, setClientSecret] = useState("");
  // const getInventoryUrl = `${process.env.REACT_APP_API_URL}/api/payment/getInventory`;
  useEffect(() => {
    // instead of xl-tshirt it should be the product name which is being purchased from bot inventory

    fetch("${process.env.REACT_APP_API_URL}/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };
  /* Pass the resulting promise from loadStripe to the Elements provider.
  This allows the child components to access the Stripe service via the Elements consumer.
  Additionally, pass the client secret as an option to the Elements provider.*/
  return (
    <div className="app">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
