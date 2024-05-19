"use strict";

const config = require("../config/BotConfig");
const async = require("async");
const tradeInitializer = require("./tradeInitializer.js");
const tradeOperations = require("./tradeOperations");
const tradeValidator = require("./tradeValidator.js");
const { updateItemsPrices } = require("../controllers/ItemsController");
const { getBotAssetIds } = require("../controllers/BotsItemsController");

// Custom Error classes
class InvalidPriceError extends Error {}

function Trade(params) {
  this.prices = {};
  this.floats = {};
  this.instances = [];

  this.io = params.io || false;

  try {
    this.initializeTradeBot();
  } catch (error) {
    console.error("Failed to initialize the trade bot: ", error);
  }
}

Trade.prototype.initializeTradeBot = function () {
  tradeInitializer.initializeTradeBot(this);
};

Trade.prototype.updatePrices = function () {
  tradeInitializer.updatePrices(this);
};

Trade.prototype.getPriceList = function () {
  return this.prices;
};

Trade.prototype.getFloatValues = function () {
  return this.floats;
};

Trade.prototype.getPrice = function (name, rateType, itemType) {
  const price = this.prices[name] * config.rates[rateType][itemType.name] || 0;
  if (price <= config.rates.ignoreItemsBelow) {
    return 0;
  }
  return price;
};

Trade.prototype.getUserRates = function () {
  return config.rates.user;
};

Trade.prototype.getBotRates = function () {
  return config.rates.bot;
};

Trade.prototype.getTrashPrice = function () {
  return config.rates.trashPriceBelow;
};

Trade.prototype.getIgnorePrice = function () {
  return config.rates.ignoreItemsBelow;
};

Trade.prototype.validateOffer = function (object, listedPrice, callback) {
  tradeValidator.validateOffer(this, object, listedPrice, callback);
};

Trade.prototype.verifyUserItems = function (obj, callback) {
  tradeValidator.verifyUserItems(this, obj, callback);
};

Trade.prototype.verifyBotItems = function (obj, callback) {
  tradeValidator.verifyBotItems(this, obj, callback);
};

Trade.prototype.processWithdrawal = function (data, callback) {
  tradeOperations.processWithdrawal(this, data, callback);
};

module.exports = Trade;

try {
  require("./bots");
  require("./inv");
  require("./prices");
} catch (error) {
  console.error("Failed to load required modules: ", error);
}
