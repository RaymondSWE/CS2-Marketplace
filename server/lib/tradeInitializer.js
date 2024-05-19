const { updateItemsPrices } = require("../controllers/ItemsController");

function initializeTradeBot(trade) {
  trade.updatePrices();
  setInterval(() => trade.updatePrices(), 60 * 1000 * 15);

  trade.startBots(() => {
    trade.addBotListeners();
    setInterval(() => trade.reloadBotSessions(), 3600000);
  });
}

function updatePrices(trade) {
  trade.getPrices(async (prices) => {
    trade.prices = prices;
    try {
      await updateItemsPrices(prices);
      console.log("Items prices updated successfully");
    } catch (error) {
      console.error("Failed to update items prices:", error);
    }
  });
}

module.exports = {
  initializeTradeBot,
  updatePrices,
};
