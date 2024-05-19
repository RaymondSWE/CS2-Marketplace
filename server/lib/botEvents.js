

"use strict";


const fs = require("fs");

const Trade = require("./index"); 

Trade.prototype.setupPollDataSaver = function (id) {
  this.instances[id].manager.on("pollData", (data) => {
    console.log(`Received poll data for bot: ${id}`);
    if (!fs.existsSync(`./polls`)) {
      fs.mkdir("./polls", (err) => {
        if (err) {
          console.log(`Error creating directory: ${err}`);
        } else {
          console.log("Created directory './polls'");
        }
      });
    }

    if (!fs.existsSync(`./polls/bot_${id}.json`)) {
      fs.writeFile(`./polls/bot_${id}.json`, JSON.stringify(data), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`Saved poll data for bot ${id}`);
        }
      });
    }
  });
};

Trade.prototype.setupItemListeners = function (id) {
  this.instances[id].csgo.on("itemAcquired", (item) => {
    console.log(`Bot ${id} acquired item: ${item}`);
    this.floats[item.itemid] = {
      defindex: item.defindex,
      paintindex: item.paintindex,
      rarity: item.rarity,
      quality: item.quality,
      paintwear: item.paintwear,
      paintseed: item.paintseed,
    };
  });

  this.instances[id].csgo.on("inspectItemInfo", (item) => {
    console.log(`Bot ${id} inspected item: ${item}`);
    this.floats[item.itemid] = {
      defindex: item.defindex,
      paintindex: item.paintindex,
      rarity: item.rarity,
      quality: item.quality,
      paintwear: item.paintwear,
      paintseed: item.paintseed,
    };
  });

  this.instances[id].csgo.on("itemChanged", (oldItem, newItem) => {
    console.log(`Item changed for bot ${id}: old item ${oldItem}, new item ${newItem}`);
    this.floats[newItem.itemid] = {
      defindex: newItem.defindex,
      paintindex: newItem.paintindex,
      rarity: newItem.rarity,
      quality: newItem.quality,
      paintwear: newItem.paintwear,
      paintseed: newItem.paintseed,
    };
  });
};

module.exports = {
  setupItemListeners: Trade.prototype.setupItemListeners,
  setupPollDataSaver: Trade.prototype.setupPollDataSaver
};
