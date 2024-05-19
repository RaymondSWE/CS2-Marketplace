
const config = require("../config/BotConfig");
const Trade = require("./index");
const { updateUsersItemStatusForSale } = require("../controllers/UsersItemsController");
const { updateItemsAssetId } = require("../controllers/ItemsController");
const { data } = require("./handlers/offerHandlers");
const TradeOfferManager = require("steam-tradeoffer-manager");



Trade.prototype.addNewOfferListener = function addNewOfferListener() {
  this.botListen("manager", "newOffer", (offer) => {
    setTimeout(() => offer.decline(), 60000);
  });
};

Trade.prototype.addSentOfferChangedListener = function addSentOfferChangedListener() {
  this.botListen("manager", "sentOfferChanged", async (offer, oldState) => {
    if (
      offer.state ===
      TradeOfferManager.ETradeOfferState.CreatedNeedsConfirmation
    ) {
      // Timer set to 2 minutes (120000 milliseconds)
      setTimeout(() => {
        // If the offer is still active after 2 minutes, cancel it
        if (offer.state === TradeOfferManager.ETradeOfferState.Active) {
          offer.cancel((err) => {
            if (err) {
              console.log("Error cancelling offer:", err);
            } else {
              console.log("Successfully cancelled offer:", offer.id);
            }
          });
        }
      }, 120000);
    }

    if (
      offer.state === TradeOfferManager.ETradeOfferState.Accepted &&
      oldState !== TradeOfferManager.ETradeOfferState.Accepted
    ) {
      console.log(
        `User ${offer.partner.getSteamID64()} has accepted the trade offer with ID: ${
          offer.id
        }`
      );

      // Get user's asset IDs from the accepted offer
      const userAssetIds = offer.itemsToReceive.map((item) => item.assetid);
      console.log("Old asset ids:", userAssetIds); // Log the old asset ids

      // Fetch new asset IDs
      try {
        const receivedItems = await new Promise((resolve, reject) => {
          offer.getReceivedItems((err, items) => {
            if (err) {
              reject(err);
            } else {
              resolve(items);
            }
          });
        });

        const newAssetIds = receivedItems.map((item) => item.assetid);
        console.log("New asset ids:", newAssetIds); // Log the new asset ids

        // Update user item status for sale
        updateUsersItemStatusForSale(
          userAssetIds,
          newAssetIds,
          (error, result) => {
            if (error) {
              console.error("Error updating user items status:", error);
            } else {
              console.log("Successfully updated user items status:", result);
              updateItemsAssetId(userAssetIds, newAssetIds, (err, res) => {
                if (err) {
                  console.error("Error updating items assetid:", err);
                } else {
                  console.log("Successfully updated items assetid:", res);
                }
              });
            }
          }
        );
      } catch (err) {
        console.error("Error fetching received items:", err);
      }
    }

    if (
      offer.state === TradeOfferManager.ETradeOfferState.Countered &&
      oldState !== TradeOfferManager.ETradeOfferState.Countered
    ) {
      console.log(
        `User ${offer.partner.getSteamID64()} has sent a counter offer with ID: ${
          offer.id
        } - countering is not allowed, declining the offer.`
      );
      offer.decline(); // Decline the counter offer
    }
  });
};

Trade.prototype.addBotListeners = function addBotListeners() {
  this.addNewOfferListener();
  this.addSentOfferChangedListener();
};

module.exports = {
  addNewOfferListener: Trade.prototype.addNewOfferListener,
  addSentOfferChangedListener: Trade.prototype.addSentOfferChangedListener,
  addBotListeners: Trade.prototype.addBotListeners,
};

