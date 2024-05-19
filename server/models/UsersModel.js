const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");

const User = sequelize.define(
  "user",
  {
    steamid64: {
      type: DataTypes.STRING(644),
      allowNull: false,
    },
    personaname: {
      type: DataTypes.STRING(644),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(644),
      allowNull: false,
    },
    countrycode: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(644),
      allowNull: true,
    },
    tradelink: {
      type: DataTypes.STRING(644),
      allowNull: true,
    },
    stripeid: {
      type: DataTypes.STRING(644),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
