const config = require("../config/BotConfig");
const async = require("async");

// Custom Error classes
class InvalidPriceError extends Error {}

// This function validates a trade offer.
// It checks the price list and the inventory of both the user and bot,
// ensuring the values are correct and that all items exist in the respective inventories.
// If the user's total value is less than the bot's, it returns an error.
function validateOffer(trade, object, listedPrice, callback) {
  let userValue = 0;
  let botValue = 0;
  let userCount = 0;
  let botCount = 0;

  if (!listedPrice && Object.keys(listedPrice).length > 0) {
    return callback(
      "Listed price must have at least one Item with an associated positive integer value"
    );
  }

  for (const key in listedPrice) {
    const price = listedPrice[key];
    if (typeof price !== "number" || price < 0.1 || price > 1000) {
      return callback(
        `Invalid price for assetid ${key}. Items below 0.1$ are not allowed and items above 1000$ are not allowed.`
      );
    }
  }

  const obj = object;
  obj.user = obj.user.filter(Boolean);
  obj.bot = obj.bot.filter(Boolean);

  if (!obj.user.length) {
    return callback("(╯°□°）╯︵ ┻━┻ How about no?");
  }

  verifyUserItems(trade, obj, (err, results) => {
    if (err) {
      return callback(err);
    }

    userValue = results.userValue;
    userCount = results.userCount;

    if (obj.bot.length) {
      verifyBotItems(trade, obj, (botErr, botResults) => {
        if (botErr) {
          return callback(botErr);
        }

        botValue = botResults.botValue;
        botCount = botResults.botCount;

        if (
          parseFloat(userValue.toFixed(2)) < parseFloat(botValue.toFixed(2))
        ) {
          return callback("You do not have enough value!");
        }
        return callback(null, true);
      });
    } else {
      return callback(null, true);
    }
  });
}

// This function verifies the user's items in a trade.
// It retrieves the user's inventory, and for each item in the trade,
// it checks the item's price and adds it to the user's total value.
function verifyUserItems(trade, obj, callback) {
  let userValue = 0;
  let userCount = 0;

  trade.getInventory(
    obj.steamID64,
    config.appID,
    config.contextID,
    (err, data) => {
      if (err) {
        return callback(
          new Error(
            "Could not verify users inventory contents for the trade. Please try again later!"
          )
        );
      }
      const userInventory = data;
      async.forEach(
        Object.keys(userInventory),
        (index, cb) => {
          const item = userInventory[index];
          if (obj.user.indexOf(item.assetid) !== -1) {
            const price = trade.getPrice(
              item.data.market_hash_name,
              "user",
              item.item_type
            );
            userCount += 1;
            if (config.rates.trashPriceBelow >= price) {
              userValue += price * config.rates.user.trash;
            } else {
              userValue += price;
            }
          }
          cb();
        },
        (err) => {
          if (err) {
            return callback(
              new Error("Some items were not found in users inventory!")
            );
          }
          callback(null, { userValue, userCount });
        }
      );
    }
  );
}

// This function verifies the bot's items in a trade.
// It retrieves the bot's inventory, and for each item in the trade,
// it checks the item's price and adds it to the bot's total value.
function verifyBotItems(trade, obj, callback) {
  let botValue = 0;
  let botCount = 0;

  if (typeof config.bots[obj.bot_id] === "undefined") {
    return callback(new Error("Invalid bot ID."));
  }
  trade.getInventory(
    config.bots[obj.bot_id].steamID64,
    config.appID,
    config.contextID,
    (err, data) => {
      if (err) {
        return callback(
          new Error(
            "Could not verify inventory contents for the trade. Please try again later!"
          )
        );
      }
      const botInventory = data;
      async.forEach(
        Object.keys(botInventory),
        (index, cb) => {
          const item = botInventory[index];
          if (obj.bot.indexOf(item.assetid) !== -1) {
            const price = trade.getPrice(
              item.data.market_hash_name,
              "bot",
              item.item_type
            );
            botCount += 1;
            if (config.rates.trashPriceBelow >= price) {
              botValue += price * config.rates.bot.trash;
            } else {
              botValue += price;
            }
            if (price === 0) {
              return cb(
                new InvalidPriceError(
                  "Could not get a price for item(s). Trade has been cancelled."
                )
              );
            }
          }
          cb();
        },
        (cbError) => {
          if (cbError) {
            return callback(cbError);
          }
          if (botCount !== obj.bot.length) {
            return callback(
              new Error("Some items were not found in bots inventory!")
            );
          }
          callback(null, { botValue, botCount });
        }
      );
    }
  );
}

module.exports = {
  validateOffer,
  verifyUserItems,
  verifyBotItems,
};
