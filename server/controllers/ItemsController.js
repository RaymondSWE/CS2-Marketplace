const dotenv = require("dotenv").config();
const request = require("request");
const { QueryTypes } = require("sequelize");
const User = require("../models/UsersModel");
const { Op } = require("sequelize");
const {
  getLowestPricedItems,
  getMostExpensiveItems,
} = require("../services/ItemsService");

const Item = require("../models/ItemsModel");

async function insertItems(items) {
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const item = items[key];
      const itemData = item.data;

      try {
        await Item.findOrCreate({
          where: { assetid: BigInt(item.assetid) },
          defaults: {
            appid: item.appid,
            contextid: item.contextid,
            classid: item.classid,
            instanceid: item.instanceid,
            amount: item.amount,
            item_type_value: item.item_type.value,
            item_wear: item.item_wear,
            inspect: item.inspect,
            background: itemData.background,
            image: itemData.image,
            tradable: itemData.tradable === 1,
            marketable: itemData.marketable === 1,
            market_hash_name: itemData.market_hash_name,
            item_type: item.item_type.name.toLowerCase(),
            color: itemData.color,
            paintindex: item.paintindex,
            paintwear: item.paintwear,
          },
        });
      } catch (err) {
        console.error("Error inserting item:", err);
      }
    }
  }
}
//TODO:: If there exist an with with floatdata, then skip it
async function updateItemsFloatData(floatData) {
  for (const assetid in floatData) {
    if (floatData.hasOwnProperty(assetid)) {
      const floatItemData = floatData[assetid];

      try {
        await Item.update(
          {
            paintindex: floatItemData.paintindex,
            paintwear: floatItemData.paintwear,
            paintseed: floatItemData.paintseed,
          },
          {
            where: {
              assetid: BigInt(assetid),
              [Op.or]: [
                { paintindex: null },
                { paintwear: null },
                { paintseed: null },
              ],
            },
          }
        );
      } catch (err) {
        console.error("Error updating item float data:", err);
      }
    }
  }
}

async function getAllItems() {
  try {
    const items = await Item.findAll();
    return items;
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
}
async function updateItemsPrices(prices) {
  const items = await getAllItems();

  for (const item of items) {
    const market_hash_name = item.market_hash_name;
    const classid = item.classid;
    const price = prices[market_hash_name];

    if (price && price > 0) {
      // Add this condition
      try {
        // Update the price for items with the same market_hash_name or classid
        await Item.update(
          { price },
          {
            where: {
              [Op.or]: [
                { market_hash_name: market_hash_name },
                { classid: classid },
              ],
            },
          }
        );
        // (`Price for ${market_hash_name} updated to ${price}`);
      } catch (error) {
        console.error(`Failed to update price for ${market_hash_name}:`, error);
      }
    }
  }
}

function updateItemsAssetId(oldAssetIds, newAssetIds, callback) {
  // Ensure that oldAssetIds and newAssetIds have the same length
  if (oldAssetIds.length !== newAssetIds.length) {
    callback(
      new Error("The lengths of oldAssetIds and newAssetIds do not match.")
    );
    return;
  }

  // Iterate through oldAssetIds and update each item's assetid
  let pendingUpdates = oldAssetIds.length;
  for (let i = 0; i < oldAssetIds.length; i++) {
    const oldAssetId = oldAssetIds[i];
    const newAssetId = newAssetIds[i];

    Item.update({ assetid: newAssetId }, { where: { assetid: oldAssetId } })
      .then(() => {
        pendingUpdates--;
        if (pendingUpdates === 0) {
          callback(null, "Items assetid updated successfully");
        }
      })
      .catch((err) => {
        ("Error updating items assetid: ", err);
        callback(err);
      });
  }
}

module.exports = {
  insertItems,
  updateItemsFloatData,
  updateItemsPrices,
  getAllItems,
  getLowestPricedItems,
  getMostExpensiveItems,
  updateItemsAssetId,
};
