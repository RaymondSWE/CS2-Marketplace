const { updatePrices } = require("../lib/tradeInitializer");
const { updateItemsPrices } = require("../controllers/ItemsController");

jest.mock("../controllers/ItemsController", () => {
  return {
    updateItemsPrices: jest.fn(),
  };
});

describe("updatePrices", () => {
  it("should call updateItemsPrices with correct prices", async () => {
    const mockTrade = {
      getPrices: jest.fn((callback) => callback("mockPrices")),
    };

    await updatePrices(mockTrade);

    expect(updateItemsPrices).toHaveBeenCalledWith("mockPrices");
  });

  it("should handle errors correctly", async () => {
    const mockTrade = {
      getPrices: jest.fn((callback) => callback("mockPrices")),
    };

    updateItemsPrices.mockImplementationOnce(() => {
      throw new Error("updateItemsPrices error");
    });

    console.error = jest.fn();

    await updatePrices(mockTrade);

    expect(console.error).toHaveBeenCalledWith(
      "Failed to update items prices:",
      new Error("updateItemsPrices error")
    );
  });
});
