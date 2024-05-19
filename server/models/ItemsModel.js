const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");

const Item = sequelize.define(
  "item",
  {
    assetid: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    appid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contextid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    classid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    instanceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    item_type_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_wear: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    inspect: {
      type: DataTypes.STRING(1028),
      allowNull: true,
    },
    background: {
      type: DataTypes.STRING(1028),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(1028),
      allowNull: false,
    },
    tradable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    marketable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    market_hash_name: {
      type: DataTypes.STRING(1028),
      allowNull: true,
    },
    item_type: {
      type: DataTypes.STRING(1028),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    paintindex: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paintwear: {
      type: DataTypes.DECIMAL(20, 17),
      allowNull: true,
    },
    paintseed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Item;
