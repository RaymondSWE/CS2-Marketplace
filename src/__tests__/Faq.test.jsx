import React from "react";
import { render, screen } from "@testing-library/react";
import Faq from "../components/Faq/Faq";
import "@testing-library/jest-dom";

describe("Faq", () => {
  it("renders without crashing", () => {
    render(<Faq />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders all faq questions", () => {
    render(<Faq />);
    expect(
      screen.getByText("What are the steps involved in purchasing?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("How can I buy on CSFairTrade?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("How can I sell on CSFairTrade?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("How do I adjust the price for my listed items?"),
    ).toBeInTheDocument();
    expect(screen.getByText("How can I cancel my offers?")).toBeInTheDocument();
    expect(
      screen.getByText("Why am I not receiving a trade offer?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What is the CSFairTrade 2-Factor-Authorization?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("How do I deposit money to my CSFairTrade account?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Which payment methods are supported by CSFairTrade?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("How long does a withdrawal take?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Why do I have a payment and withdrawal limit?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Can I refund money which I have already deposited to my CSFairTrade account?",
      ),
    ).toBeInTheDocument();
  });

  it("renders all faq answers", () => {
    render(<Faq />);
    expect(
      screen.getByText(
        /CSFairTrade does not require you to have anactive Steam mobile authenticator./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To purchase an item on CSFairTrade, make sure you've logged into your account via Steam/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To sell your skins on CSFairTrade, first log in via your Steam account/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /To change the price of your listed items, click on "Withdraw Skins" from dropdown menu/,
      ),
    ).toBeInTheDocument();
  });
});
