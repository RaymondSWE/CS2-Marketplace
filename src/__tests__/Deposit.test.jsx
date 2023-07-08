import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Deposit from "../components/Deposit/Deposit";
import "@testing-library/jest-dom";
import { FaGooglePay, FaCreditCard, FaPaypal } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement(document.body);

describe("Deposit", () => {
  const handleCloseDepositMock = jest.fn();

  it("renders without crashing", () => {
    render(
      <Deposit handleCloseDeposit={handleCloseDepositMock} showModal={true} />,
    );
    expect(screen.getByText("Amount:")).toBeInTheDocument();
    expect(screen.getByText("Payment Method:")).toBeInTheDocument();
    expect(screen.getByText("Summary:")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });

  it("renders all payment methods", () => {
    render(
      <Deposit handleCloseDeposit={handleCloseDepositMock} showModal={true} />,
    );
    expect(screen.getByTestId("Google Pay")).toBeInTheDocument();
    expect(screen.getByTestId("Credit/Debit Card")).toBeInTheDocument();
    expect(screen.getByTestId("PayPal")).toBeInTheDocument();
  });

  it("renders all pre-set amounts", () => {
    render(
      <Deposit handleCloseDeposit={handleCloseDepositMock} showModal={true} />,
    );
    [1, 5, 10, 20, 50, 100].forEach((value) => {
      expect(screen.getByText(`$${value}`)).toBeInTheDocument();
    });
  });

  it("renders Confirm button", () => {
    render(
      <Deposit handleCloseDeposit={handleCloseDepositMock} showModal={true} />,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("changes amount input on amount option click", () => {
    render(
      <Deposit handleCloseDeposit={handleCloseDepositMock} showModal={true} />,
    );
    const amountOption = screen.getByText("$1");
    fireEvent.click(amountOption);
    const amountInput = screen.getByLabelText("Amount:");
    expect(amountInput.value).toBe("1");
  });

  // TODO:: Add more tests as per the implementation of your component
});
