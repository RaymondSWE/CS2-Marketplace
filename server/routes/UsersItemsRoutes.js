const express = require("express");
const router = express.Router();
const {
  getUsersForSaleItems,
  getAllItemsForSale,
} = require("../controllers/UsersItemsController");

router.get("/for_sale", async (req, res) => {
  try {
    const itemsForSale = await getAllItemsForSale();

    res.status(200).json(itemsForSale);
  } catch (error) {
    console.error("Error fetching items for sale:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching items for sale" });
  }
});

router.get("/for_sale/:steamid64", async (req, res) => {
  try {
    const steamid64 = req.params.steamid64;
    const userItems = await getUsersForSaleItems(steamid64);

    res.status(200).json(userItems);
  } catch (error) {
    console.error("Error fetching user items:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user items" });
  }
});

module.exports = router;
