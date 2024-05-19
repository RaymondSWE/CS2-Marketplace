"use strict";

const config = require("../config/BotConfig");
const request = require("request");
const Trade = require("./index");

const API = "https://api.steamapis.com/market/items";
const saPrices = `${API}/${config.appID}?format=compact&compact_value=${config.SteamApisCompactValue}&api_key=${config.SteamApisKey}`;

/* 
  This function invokes getSteamapis function to get prices from SteamApis.
  It will make 3 retries if there is any error while fetching data.
  It will call the provided callback with data or error message if fails*/

Trade.prototype.getPrices = function getPrices(callback) {
  Trade.prototype.getSteamapis(3, (err, data) => {
    // 3 retries
    if (err) {
      return this.getPrices(callback);
    }
    // ("[!] Prices are updated.");
    return callback(data);
  });
};
/* 
  This function makes a request to the SteamApis API to get prices
  It will make retries if there is any error in the response */
Trade.prototype.getSteamapis = function getSteamapis(retries, callback) {
  request(saPrices, (error, response, body) => {
    const statusCode = response ? response.statusCode || false : false;
    if (error || response.statusCode !== 200) {
      if (retries > 0) {
        retries--;
        Trade.prototype.getSteamapis(retries, callback);
      } else {
        return callback({ error, statusCode });
      }
    } else {
      const items = JSON.parse(body);
      return callback(null, items);
    }
  });
};
