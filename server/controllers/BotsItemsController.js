const dotenv = require("dotenv").config();
const { QueryTypes } = require("sequelize");
const BotsItem = require("../models/BotsItemModel");
const Bots = require("../models/BotsModel");
const sequelize = require("../models/Sequelize");
const Items = require("../models/ItemsModel");
const { bots } = require("../config/BotConfig");

async function insertBotItems(steamId64, items) {
  (
    "insertBotItems called with steamId64:",
    steamId64,
    "and items:",
    items
  );

  try {
    // Find the bot's id using the bot's steam id64
    const bot = await Bots.findOne({ where: { steamid64: steamId64 } });

    if (!bot) {
      console.error("Bot not found for steam id64:", steamId64);
      return;
    }

    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const item = items[key];

        try {
          const [botItem, created] = await BotsItem.findOrCreate({
            where: { assetid: BigInt(item.assetid), botid: bot.id },
          });

          if (created) {
            ("New bot item created:", botItem);
          } else {
            // ("Bot item already exists:", botItem);
          }
        } catch (err) {
          console.error("Error inserting bot item:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error finding the bot:", err);
  }
}
async function getBotItems(botId) {
  const query = `
  SELECT i.*, ui.listed_price
  FROM items i
  JOIN botsitems bi ON i.assetid = bi.assetid
  JOIN bots b ON bi.botid = b.id
  LEFT JOIN usersitems ui ON i.assetid = ui.assetid
  WHERE b.id = :botId
`;

  const result = await sequelize.query(query, {
    replacements: { botId },
    type: QueryTypes.SELECT,
  });

  // Convert the price to a number
  const formattedResult = result.map((item) => {
    return {
      ...item,
      price: parseFloat(item.price),
    };
  });

  return formattedResult;
}

async function getBotItemsForSale(botId) {
  const query = `
    SELECT 
      i.assetid, i.market_hash_name, i.marketable, i.tradable, i.image, i.price, i.item_wear, i.inspect, i.classid, i.instanceid, i.paintwear, i.paintindex, i.paintseed, ui.status, ui.listed_price
    FROM items i
    JOIN usersitems ui ON i.assetid = ui.assetid
    JOIN users u ON ui.userid = u.id
    WHERE ui.status = 'for_sale'
  `;

  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  // Convert the price to a number
  const formattedResult = result.map((item) => {
    return {
      ...item,
      price: parseFloat(item.price),
    };
  });

  return formattedResult;
}

async function getBotAssetIds(botName) {
  const query = `
  SELECT bi.assetid
  FROM botsitems bi
  JOIN bots b ON bi.botid = b.id
  WHERE b.name = :botName
  `;

  const result = await sequelize.query(query, {
    replacements: { botName },
    type: QueryTypes.SELECT,
  });

  return result.map((item) => item.assetid);
}

module.exports = {
  insertBotItems,
  getBotItems,
  getBotItemsForSale,
  getBotAssetIds,
};
