const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");
const User = require("./UsersModel");
const Item = require("./ItemsModel");

const UsersItems = sequelize.define(
  "usersitems",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    steamid64: {
      type: DataTypes.STRING(644),
      allowNull: false,
    },
    assetid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    listed_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("available", "sold", "for_sale"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

UsersItems.belongsTo(User, { foreignKey: "userid" }); // Added foreign key relationship
UsersItems.belongsTo(Item, { foreignKey: "assetid" }); // Added foreign key relationship

module.exports = UsersItems;
