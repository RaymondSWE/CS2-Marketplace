const { DataTypes, QueryTypes } = require("sequelize");
const sequelize = require("./Sequelize");
const Bots = require("./BotsModel");
const Item = require("./ItemsModel");

const BotsItem = sequelize.define(
  "botsitem",
  {
    botid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    assetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

BotsItem.belongsTo(Bots, { foreignKey: "botid" }); // Added foreign key relationship
BotsItem.belongsTo(Item, { foreignKey: "assetid" }); // Added foreign key relationship

module.exports = BotsItem;
