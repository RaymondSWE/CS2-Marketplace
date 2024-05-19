const config = require("../config/BotConfig");

// This function processes a withdrawal from a trade.
// It retrieves the bot associated with the trade, verifies the bot's existence,
// loads the bot's inventory, verifies the item to be withdrawn exists and is tradable,
// and then attempts to send the trade offer.

function processWithdrawal(trade, data, callback) {
  const bot = trade.getBot(data.bot_id);
  console.log(`Checking bot id: ${data.bot_id}`);

  if (!bot) {
    console.error(`Bot with id ${data.bot_id} was not found.`);
    return callback("Bot not found.");
  }

  console.log("Bot found: ", bot);

  bot.manager.loadInventory(
    config.appID,
    config.contextID,
    true,
    (err, inventory) => {
      if (err) {
        console.error("Error loading bot inventory: " + err);
        return callback("Error loading bot inventory: " + err);
      }

      // Create a map of assetIds to items for quicker lookup.
      const itemMap = inventory.reduce((map, item) => {
        map[item.assetid] = item;
        return map;
      }, {});
      console.log("Checking item with assetid: " + data.assetid);

      const item = itemMap[data.assetid];
      console.log(
        "bot comparison inventory: " + Object.keys(itemMap).join(", ")
      );

      if (!item) {
        console.error("Item not found in the bot's inventory.");
        return callback("Item not found in the bot's inventory.");
      }

      console.log(item);

      // Check if item is tradable
      if (!item.tradable) {
        console.error("Item is not tradable.");
        return callback("Item is not tradable.");
      }

      callback(null, { bot, item });

      let offer;
      try {
        offer = bot.manager.createOffer(data.tradeUrl);
      } catch (error) {
        console.error("Failed to create the trade offer: ", error);
        return callback("Failed to create the trade offer.");
      }

      offer.addMyItem(item);


      console.log("Sending offer: ", offer);

      offer.getUserDetails((detailsError, me, them) => {
        if (detailsError) {
          console.error("Error in getUserDetails: ", detailsError);
          callback(
            detailsError.message ||
              "An error occurred while retrieving user details."
          );
        } else if (me.escrowDays + them.escrowDays > 0) {
          callback(
            "You must have 2FA enabled, we do not accept trades that go into Escrow."
          );
        } else {
          offer.send((errSend, status) => {
            if (errSend) {
              console.error(
                "Failed to send the trade offer: " + errSend.message
              );
              callback("Failed to send the trade offer: " + errSend.message);
            } else {
              callback(null, `Trade offer sent! Status: ${status}`);
              if (status === "pending") {
                trade.botConfirmation(data.bot_id, offer.id, (errConfirm) => {
                  if (errConfirm) {
                    console.error("Error in botConfirmation: ", errConfirm);
                  }
                });
              }
            }
          });
        }
      });
    }
  );
}

module.exports = {
  processWithdrawal,
};
