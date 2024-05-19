const { insertItems } = require("../../controllers/ItemsController");
const { insertUserItems } = require("../../controllers/UsersItemsController");

const getUserInventory = async (socket, Trade, config) => {
  socket.on("get user inv", async (steamID64) => {
    try {
      const data = await getInventory(
        steamID64,
        config.appID,
        config.contextID
      );
      // console.log("Inventory data: ", data);


      // Emit the inventory data to the client
      socket.emit("user inv", { error: null, items: data });

      // Insert items into the database
      await insertItems(data);

      // Extract assetids from data object
      const assetids = [];
      for (const item of Object.values(data)) {
        assetids.push(parseInt(item.assetid));
      }

      // // Log assetids
      // ("assetids: ", assetids);

      // Insert useritems into the usersitem table
      await insertUserItems(steamID64, assetids);
    } catch (error) {
      console.error("Error handling user inventory:", error);
      socket.emit("user inv", { error: error.message || error, items: null });
    }
  });

  async function getInventory(steamID64, appID, contextID) {
    return new Promise((resolve, reject) => {
      Trade.getInventory(steamID64, appID, contextID, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};

module.exports = {
  getUserInventory,
};
