const { validateOffer } = require("../lib/tradeValidator");

describe("validateOffer", () => {
  it("should validate offer correctly", (done) => {
    const mockTrade = {
      getInventory: jest
        .fn()
        .mockImplementation((steamID64, appID, contextID, callback) => {
          callback(null, [
            {
              assetid: "mockAssetId",
              item_type: "mockItemType",
              data: { market_hash_name: "mockMarketHashName" },
            },
          ]);
        }),
      getPrice: jest.fn().mockReturnValue(1),
    };
    const listedPrice = {
      mockAssetId: 1,
    };
    const object = {
      user: ["mockAssetId"],
      bot: [],
      steamID64: "mockSteamID64",
    };

    validateOffer(mockTrade, object, listedPrice, (err, result) => {
      expect(err).toBe(null);
      expect(result).toBe(true);
      done();
    });
  });
});
