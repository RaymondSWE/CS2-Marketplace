// imports
const fs = require("fs");
const DatabaseIntegration = require("../config/DatabaseConfig");
const request = require("request");
const mysql = require("mysql");
const axios = require("axios");

const connection = mysql.createConnection(DatabaseIntegration);
// Import steamid from authroutes
const steamid = require("../routes/AuthRoutes");

function getInventory(req, res, next) {
  const steamID = req.params.steamID || req.user?._json?.steamid; // use the steamID from params or session
  const appID = 730;
  const contextID = 2;
  const apiKey = process.env.STEAM_MARKET_API_KEY; // Replace with your own Steam API key
  axios
    .get(
      `https://api.steamapis.com/steam/inventory/${steamID}/${appID}/${contextID}?api_key=${apiKey}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Error fetching player items" });
    });
}

module.exports = {
  getInventory,
};
