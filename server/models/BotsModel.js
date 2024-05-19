const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");
const Bots = sequelize.define(
  "bots",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    steamid64: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Bots;
