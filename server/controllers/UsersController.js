const dotenv = require("dotenv").config();
const request = require("request");
const { QueryTypes } = require("sequelize");
const User = require("../models/UsersModel");

const getAllUsersSteamid = async (req, res) => {
  try {
    const result = await User.findAll({ attributes: ["steamid64"] });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all users' Steam IDs" });
  }
};

const getAllUsersCount = async (req, res) => {
  try {
    const result = await User.count();
    res.send({ total_users: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get total users count" });
  }
};

const addUserTradeLink = async (req, res) => {

  // Validate input
  const { tradelink, steamid64 } = req.body;
  console.log('Received POST data:', req.body);

  if (!tradelink) {
    return res
      .status(400)
      .json({ error: "Error 400: Trade link is required/invalid" });
  }
  if (!steamid64) {
    return res
      .status(400)
      .json({ error: "Error 400: Steamid64 is required/invalid" });
  }

  try {
    const [updatedRowsCount] = await User.update(
      { tradelink },
      { where: { steamid64 } }
    );

    // if (updatedRowsCount === 0) {
    //   return res
    //     .status(404)
    //     .json({ error: "No user found with that Steam ID" });
    // }
    res.json({ message: "Trade link updated successfully" });
      console.log("Received tradelink:", tradelink);
      console.log("Received steamid64:", steamid64);  

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update trade link" });
  }
};

const getTradeLink = async (req, res) => {
  const steamid64 = req.params.steamid64;
  if (!steamid64) {
    return res.status(404).json({ error: "No Steam ID provided" });
  }

  try {
    const user = await User.findOne({
      where: { steamid64 },
      attributes: ["tradelink"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found with that Steam ID" });
    }
    res.json({ tradelink: user.tradelink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get trade link" });
  }
};
const addUserEmail = async (req, res) => {
  // Validate input
  const { email, steamid64 } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ error: "Error 400: Email is required/invalid" });
  }
  if (!steamid64) {
    return res
      .status(400)
      .json({ error: "Error 400: Steamid64 is required/invalid" });
  }

  try {
    const [updatedRowsCount] = await User.update(
      { email },
      { where: { steamid64 } }
    );

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ error: "No user found with that Steam ID" });
    }

    // Create a new Stripe customer and assign the customer ID to the user

    res.json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update email" });
  }
};

const getUserEmail = async (req, res) => {
  const steamid64 = req.params.steamid64;

  if (!steamid64) {
    return res.status(400).json({ error: "Steam ID is required" });
  }

  try {
    const user = await User.findOne({
      where: { steamid64 },
      attributes: ["email"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found with that Steam ID" });
    }

    const email = user.email;

    if (!email) {
      return res.status(400).json({ error: "User's email is null" });
    }

    res.json({ email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user's email" });
  }
};

const getUserEmailWithNull = async (req, res) => {
  const steamid64 = req.params.steamid64;

  if (!steamid64) {
    return res.status(400).json({ error: "Steam ID is required" });
  }

  try {
    const users = await User.findAll({
      where: { steamid64, email: null },
      attributes: ["email"],
    });

    if (users.length === 0) {
      return res.status(404).json({
        error: "No user found with that Steam ID or email is not null",
      });
    }

    res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user's email" });
  }
};

const getUserBalance = async (req, res) => {
  const steamid64 = req.params.steamid64;

  if (!steamid64) {
    return res.status(400).json({ error: "Steam ID is required" });
  }

  try {
    const user = await User.findOne({
      where: { steamid64 },
      attributes: ["balance"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found with that Steam ID" });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user's balance" });
  }
};

module.exports = {
  getAllUsersSteamid,
  getAllUsersCount,
  addUserTradeLink,
  getTradeLink,
  addUserEmail,
  getUserEmail,
  getUserEmailWithNull,
  getUserBalance,
};
