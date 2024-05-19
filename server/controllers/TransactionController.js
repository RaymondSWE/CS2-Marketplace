const { QueryTypes, Op } = require("sequelize");
const dotenv = require("dotenv").config();
const request = require("request");
const sequelize = require("../models/Sequelize");

const Item = require("../models/ItemsModel");
const User = require("../models/UsersModel");
const Transaction = require("../models/TransactionModel");

async function createSaleTransaction(steamid64, assetid, callback) {
  try {
    // Find the user with the provided steamid64
    const user = await User.findOne({ where: { steamid64: steamid64 } });

    if (!user) {
      console.error("User not found:", steamid64);
      return callback(new Error("User not found"));
    }

    const transaction = await Transaction.create({
      userid: user.id,
      assetid: assetid,
      status: "completed", // Update this based on your needs
    });

    ("Transaction created successfully: ", transaction);
    callback(null, transaction);
  } catch (err) {
    console.error("Error creating transaction: ", err);
    callback(err);
  }
}

module.exports = {
  createSaleTransaction,
};
