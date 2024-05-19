const dotenv = require("dotenv").config();
const request = require("request");
const { QueryTypes } = require("sequelize");
const Bots = require("../models/BotsModel");

const { bots } = require("../config/BotConfig");

async function insertBots() {
  for (const [botId, botConfig] of Object.entries(bots)) {
    // Extract the bot's steamID64 and siteName from the configuration
    const { steamID64, siteName } = botConfig;

    // Check if the bot already exists in the database
    const existingBot = await Bots.findOne({ where: { steamid64: steamID64 } });

    if (!existingBot) {
      // If the bot does not exist, insert a new record
      await Bots.create({
        steamid64: steamID64,
        name: botId,
      });
      (
        `Inserted bot ${botId} with steamID64 ${steamID64} and name ${siteName}`
      );
    } else {
      (
        `Bot ${botId} with steamID64 ${steamID64} already exists in the database`
      );
    }
  }
}
insertBots().catch((error) => {
  console.error("Error inserting bots:", error);
});

async function findBotIdBySteamId(steamId) {
  try {
    const bot = await Bots.findOne({ where: { steamid64: steamId } });

    if (!bot) {
      console.error("Bot not found for steam id:", steamId);
      return null;
    }

    return bot.id;
  } catch (err) {
    console.error("Error finding the bot by steam id:", err);
    return null;
  }
}

module.exports = {
  insertBots,
  findBotIdBySteamId,
};
