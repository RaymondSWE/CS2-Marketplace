const express = require("express");
const router = express.Router();

// // controller
const MarketController = require("../controllers/MarketController");

// routes
router.get("/getAllPrices", MarketController.getAllItemPrices);

module.exports = router;
