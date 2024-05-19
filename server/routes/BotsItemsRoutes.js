const express = require("express");
const router = express.Router();
const { getBotItems } = require("../controllers/BotsItemsController");
const { getBotItemsForSale } = require("../controllers/BotsItemsController");

router.get("/:botId", async (req, res) => {
  try {
    const botId = req.params.botId;
    const botItems = await getBotItems(botId);

    res.status(200).json(botItems);
  } catch (error) {
    console.error("Error fetching bot items:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bot items" });
  }
});

router.get("/forsale/:botId", async (req, res) => {
  try {
    const botId = req.params.botId;
    const botItems = await getBotItemsForSale(botId);

    res.status(200).json(botItems);
  } catch (error) {
    console.error("Error fetching bot items for sale:", error);
    res.status(500).json({ message: "Error fetching bot items for sale" });
  }
});

module.exports = router;
