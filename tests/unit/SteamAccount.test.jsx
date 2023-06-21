import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SteamAccount from "../../components/SteamAccount";
// this file is mocked in __mocks__ folder so that it doesn't make a real request to the server when testing  the component

jest.mock("node-fetch", () => jest.fn());

const mockFetch = require("node-fetch");

test("handleTradeLinkUpdate function works correctly", async () => {
  const mockResponse = {
    _json: {
      steamid: "1234567890",
      avatarfull: "avatar_url",
    },
    displayName: "Test User",
  };
  const tradeUrl = "http://localhost:4000/api/user/addUserTradeLink";
  const invalidTradeLink = "invalid_link";
  const validTradeLink =
    "https://steamcommunity.com/tradeoffer/new/?partner=1234567890&token=ABCDEFGH";

  mockFetch.mockResolvedValue({
    json: () =>
      Promise.resolve({
        success: true,
      }),
  });

  const { getByTestId } = render(<SteamAccount response={mockResponse} />);
});
