const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/ItemsController");

router.get("/getAllItems", async (req, res) => {
  try {
    const items = await itemsController.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

router.get("/getLowestPricedItems", async (req, res) => {
  try {
    const items = await itemsController.getLowestPricedItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lowest priced items" });
  }
});

router.get("/getMostExpensiveItems", async (req, res) => {
  try {
    const items = await itemsController.getMostExpensiveItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching most expensive items" });
  }
});

module.exports = router;
