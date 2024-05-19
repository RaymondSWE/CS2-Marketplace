// Import dependencies
const { QueryTypes, Op } = require("sequelize");
const dotenv = require("dotenv").config();
const request = require("request");
const sequelize = require("../models/Sequelize");

// Import models
const Item = require("../models/ItemsModel");
const User = require("../models/UsersModel");
const UsersItems = require("../models/UsersItemsModel");

async function insertUserItems(steamid64, assetids) {
  try {
    // Find the user with the provided steamid64
    const user = await User.findOne({ where: { steamid64: steamid64 } });

    if (!user) {
      console.error("User not found:", steamid64);
      return;
    }

    for (const assetid of assetids) {
      // Fetch the item details from the Items table
      const item = await Item.findOne({ where: { assetid: BigInt(assetid) } });
      if (item) {
        const [userItem, created] = await UsersItems.findOrCreate({
          where: {
            steamid64: steamid64,
            assetid: assetid,
          },
          defaults: {
            userid: user.id, // Set the userid from the users table
            steamid64: steamid64,
            assetid: assetid,
            status: "available",
          },
        });

        // Update the item status if the item already exists
        // ("item", item);
        if (!created) {
          await updateItemStatus(
            steamid64,
            assetid,
            item.marketable,
            item.tradable
          );
        }
      } else {
        console.error(
          `Item with assetid ${assetid} not found in the Items table`
        );
      }
    }
  } catch (err) {
    console.error("Error inserting user item:", err);
  }
}
async function updateItemStatus(steamid64, assetid, marketable, tradable) {
  try {
    // Check the current status of the item
    const currentItem = await UsersItems.findOne({
      where: { steamid64: steamid64, assetid: assetid },
    });

    if (!currentItem) {
      console.error("Item not found:", assetid);
      return;
    }

    // Don't update the status if it's "for_sale"
    if (currentItem.status === "for_sale") {
      ("Item is for sale, not updating status");
      return;
    }

    // Find the user with the provided steamid64
    const user = await User.findOne({ where: { steamid64: steamid64 } });

    if (!user) {
      console.error("User not found:", steamid64);
      return;
    }

    // Update the status and userid in the UsersItems table
    await UsersItems.update(
      { status: "available", userid: user.id }, // Set the userid from the users table
      { where: { steamid64: steamid64, assetid: assetid } }
    );
  } catch (err) {
    console.error("Error updating item status:", err);
  }
}

async function updateUsersItemsListedPrices(userAssetIds, listedPrices) {
  try {
    // Iterate through userAssetIds and update each item with the respective price
    for (const assetid of userAssetIds) {
      await UsersItems.update(
        { listed_price: listedPrices[assetid] },
        { where: { assetid: assetid } }
      );
    }
    return "User items prices updated successfully";
  } catch (err) {
    ("Error updating user items prices: ", err);
    throw err;
  }
}

function updateUsersItemStatusForSale(userAssetIds, newAssetIds, callback) {
  // Ensure that userAssetIds and newAssetIds have the same length
  if (userAssetIds.length !== newAssetIds.length) {
    callback(
      new Error("The lengths of userAssetIds and newAssetIds do not match.")
    );
    return;
  }

  // Iterate through userAssetIds and update each item's status to "for_sale" and its assetid
  let pendingUpdates = userAssetIds.length;
  for (let i = 0; i < userAssetIds.length; i++) {
    const oldAssetId = userAssetIds[i];
    const newAssetId = newAssetIds[i];

    UsersItems.update(
      { status: "for_sale", assetid: newAssetId },
      { where: { assetid: oldAssetId } }
    )
      .then(() => {
        pendingUpdates--;
        if (pendingUpdates === 0) {
          callback(null, "User items status updated successfully for sale");
        }
      })
      .catch((err) => {
        ("Error updating user items status for sale: ", err);
        callback(err);
      });
  }
}

async function processAcceptedTrade(userAssetIds, listedPrices) {
  try {
    await updateUsersItemStatusForSale(
      userAssetIds,
      listedPrices,
      (err, result) => {
        if (err) {
          ("Error updating user items status for sale:", err);
        } else {
          ("User items status updated successfully for sale");
        }
      }
    );
  } catch (err) {
    console.error("Error processing accepted trade:", err);
  }
}
async function getUsersForSaleItems(steamid64) {
  const query = `
    SELECT 
      i.assetid, i.market_hash_name, i.marketable, i.tradable, i.item_wear, i.image, i.price, i.inspect, i.classid, i.instanceid, ui.status, ui.listed_price
    FROM items i
    JOIN usersitems ui ON i.assetid = ui.assetid
    JOIN users u ON ui.userid = u.id
    WHERE ui.status = 'for_sale' AND u.steamid64 = :steamid64

  `;

  const result = await sequelize.query(query, {
    replacements: { steamid64 },
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
// Use this instead of botitemsforsale, unecssary to have duplicated table with same information
async function getAllItemsForSale() {
  const query = `
    SELECT 
      i.assetid, i.market_hash_name, i.marketable, i.tradable, i.image, i.price, i.inspect, i.classid, i.instanceid, i.paintwear, i.paintindex, i.paintseed, ui.status, ui.listed_price
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

module.exports = {
  insertUserItems,
  updateItemStatus,
  updateUsersItemsListedPrices,
  updateUsersItemStatusForSale,
  processAcceptedTrade,
  getUsersForSaleItems,
  getAllItemsForSale,
};
