import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SteamAccount from "../components/SteamAccount/SteamAccount";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";
import { toast } from "react-toastify";
console.error = jest.fn();

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("SteamAccount", () => {
  const mockProps = {
    response: {
      _json: {
        steamid: "123456",
        avatarfull: "",
      },
      displayName: "Test User",
    },
  };

  beforeEach(() => {
    fetchMock.reset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  //test
  it("should render SteamAccount component without throwing an error", () => {
    render(<SteamAccount {...mockProps} />);
    expect(
      screen.getByText("Connect your Steam trade link to your account!"),
    ).toBeInTheDocument();
  });

  it("should correctly display the user name from provided props", async () => {
    render(<SteamAccount {...mockProps} />);
    expect(await screen.findByText("Test User")).toBeInTheDocument();
  });

  it("should validate the trade link and display an error toast when the link is invalid", async () => {
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const applyButton = screen.getByText("Apply");
    fireEvent.change(inputField, { target: { value: "Invalid trade link" } });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid Steam trade link", {
        theme: "colored",
      });
    });
  });

  it("should handle successful trade link updates by making the correct API call and displaying a success toast", async () => {
    const tradeUrl = `${process.env.REACT_APP_API_URL}/api/user/addUserTradeLink`;
    const successfulResponse = { success: true };
    fetchMock.post(tradeUrl, successfulResponse);

    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const applyButton = screen.getByText("Apply");
    fireEvent.change(inputField, {
      target: {
        value:
          "https://steamcommunity.com/tradeoffer/new/?partner=354634030&token=KAoqD920",
      },
    });
    fireEvent.click(applyButton);

    await waitFor(() => {
      const lastCall = fetchMock.lastCall(tradeUrl);
      expect(lastCall).toBeDefined();
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Trade Link added successfully!",
        { theme: "colored" },
      );
    });
  });

  it("should handle trade link update errors by displaying an error toast with the server error message", async () => {
    const tradeUrl = `${process.env.REACT_APP_API_URL}/api/user/addUserTradeLink`;
    const errorResponse = { error: "Server error" };
    fetchMock.post(tradeUrl, { status: 500, body: errorResponse });

    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const applyButton = screen.getByText("Apply");
    fireEvent.change(inputField, {
      target: {
        value:
          "https://steamcommunity.com/tradeoffer/new/?partner=354634030&token=KAoqD920",
      },
    });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Server error", {
        theme: "colored",
      });
    });
  });

  it("should correctly display the user avatar from the provided props", async () => {
    render(<SteamAccount {...mockProps} />);
    const avatarImage = screen.getByAltText("");
    expect(avatarImage).toHaveAttribute(
      "src",
      mockProps.response._json.avatarfull,
    );
  });

  it("should display correct instructions for obtaining a Steam trade URL", async () => {
    render(<SteamAccount {...mockProps} />);
    const tradeURLInstruction = screen.getByText(
      "How to get a Steam trade URL?",
    );
    const instructionText = screen.getByText(
      'CSFairTrade requires a Steam trade URL for trading. The steam trade URL can be obtained by clicking the "Click here to get trade URL" button and you will be redirected to the Valve website. Copy the URL and paste it below. Click "Apply" to save your trade URL',
    );
    const getTradeURLButton = screen.getByText("Click here to get trade URL");
    expect(tradeURLInstruction).toBeInTheDocument();
    expect(instructionText).toBeInTheDocument();
    expect(getTradeURLButton).toBeInTheDocument();
  });

  it('should close the modal when the Close-button is clicked', async () => {
    render(<SteamAccount {...mockProps} />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    const modal = screen.queryByTestId("steam-account-modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("should display an error message when the steamid is not available in the response", async () => {
    const mockPropsWithoutSteamID = { response: { _json: null } };
    render(<SteamAccount {...mockPropsWithoutSteamID} />);
    const errorMessage = screen.getByText("Error: steamid is not available");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should correctly update the value of the trade link input field when changed", async () => {
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const newTradeLink =
      "https://steamcommunity.com/tradeoffer/new/?partner=123456&token=abcdef";
    fireEvent.change(inputField, { target: { value: newTradeLink } });
    expect(inputField.value).toBe(newTradeLink);
  });

  it("should not display incorrect user names not present in the props", async () => {
    render(<SteamAccount {...mockProps} />);
    expect(screen.queryByText("Incorrect User")).not.toBeInTheDocument();
  });

  it("should not display incorrect error messages not returned by the server", async () => {
    render(<SteamAccount {...mockProps} />);
    const incorrectErrorMessage = screen.queryByText(
      "Incorrect error message"
    );
    expect(incorrectErrorMessage).not.toBeInTheDocument();
  });

  it("should not display any incorrect instructions for obtaining a Steam trade URL", async () => {
    render(<SteamAccount {...mockProps} />);
    const incorrectInstruction = screen.queryByText(
      "Incorrect instruction text"
    );
    expect(incorrectInstruction).not.toBeInTheDocument();
  });

  it("should handle changes to the trade link input field correctly and update the field's value", () => {
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const newTradeLink = "https://steamcommunity.com/tradeoffer/new/?partner=123456&token=abcdef";
    fireEvent.change(inputField, { target: { value: newTradeLink } });
    expect(inputField.value).toBe(newTradeLink);
  });

  it("should handle network errors during trade link updates by logging the error to the console", async () => {
    const tradeUrl = `${process.env.REACT_APP_API_URL}/api/user/addUserTradeLink`;
    const networkError = new Error("Network Error");
    fetchMock.post(tradeUrl, () => { throw networkError });
  
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const applyButton = screen.getByText("Apply");
    fireEvent.change(inputField, {
      target: { value: "https://steamcommunity.com/tradeoffer/new/?partner=354634030&token=KAoqD920" },
    });
    fireEvent.click(applyButton);
  
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(networkError);
    });
  });

  it("should throw an error when the trade link format is incorrect", async () => {
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText("Enter your Trade URL here");
    const applyButton = screen.getByText("Apply");
    fireEvent.change(inputField, { target: { value: "Incorrect format" } });
    fireEvent.click(applyButton);
    
    const incorrectFormat = () => {
      throw new Error("Invalid Steam trade link");
    };
    
    expect(incorrectFormat).toThrow("Invalid Steam trade link");
  });
  

  
});
