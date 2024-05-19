const { insertItems } = require("../../controllers/ItemsController");
const { insertBotItems } = require("../../controllers/BotsItemsController");
const { findBotIdBySteamId } = require("../../controllers/BotController");
const { updateItemsFloatData } = require("../../controllers/ItemsController");

const getBotInventory = async (socket, Trade, config) => {
  socket.on("get bot inv", async (id) => {
    Trade.getInventory(
      config.bots[id].steamID64,
      config.appID,
      config.contextID,
      async (err, data) => {
        socket.emit("bot inv", { error: err, items: data });
      }
    );
  });
};

const getBotsInventories = async (socket, Trade, config) => {
  socket.on("get bots inv", () => {
    const params = Object.keys(config.bots).map((index) => {
      const bot = config.bots[index];
      return {
        id: index,
        steamID64: bot.steamID64,
        appID: config.appID,
        contextID: config.contextID,
      };
    });

    Trade.getInventories(params, async (data) => {
      socket.emit("bots inv", data);

      const floatValues = Trade.getFloatValues();
      socket.emit("bots floats", floatValues);

      const botInventories = Object.entries(data).map(([botName, botData]) => ({
        ...botData,
        name: botName,
        steamID64: config.bots[botName].steamID64,
      }));
      // ("botdata: ", botInventories);

      // Process bot inventories
      for (const botData of botInventories) {
        await processBotInventories(botData);
      }
    });
  });

  async function processBotInventories(botData) {
    if (botData.error === null) {
      const { items, name, steamID64 } = botData;
      await insertItems(items);

      // ("Bot name: ", name);
      // ("Bot data: ", botData);
      // ("Bot steamid: ", steamID64);

      const botId = await findBotIdBySteamId(steamID64);
      if (botId) {
        // (
        //   "Inserting bot items for bot:",
        //   steamID64,
        //   "with items:",
        //   items
        // );
        await insertBotItems(steamID64, items);

        await insertBotItems(steamID64, items);
        const floatValues = Trade.getFloatValues();
        // ("Updating float values for bot:", name);
        // ("Float values:", floatValues);
        updateItemsFloatData(floatValues);
      } else {
        console.error("Bot id not found for bot name:", name);
      }
    }
  }
};

module.exports = {
  getBotInventory,
  getBotsInventories,
};
