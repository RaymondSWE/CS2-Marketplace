const { DataTypes } = require("sequelize");
const sequelize = require("./Sequelize");
const User = require("./UsersModel");
const Item = require("./ItemsModel");

const Transaction = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  buyerUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // name of Target model
      key: "id", // key in Target model that we're referencing
    },
  },
  sellerUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // name of Target model
      key: "id", // key in Target model that we're referencing
    },
  },
  assetId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "items", // name of Target model
      key: "assetid", // key in Target model that we're referencing
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    defaultValue: "pending",
  },
});

Transaction.belongsTo(User, { as: "buyer", foreignKey: "buyerUserId" });
Transaction.belongsTo(User, { as: "seller", foreignKey: "sellerUserId" });
Transaction.belongsTo(Item, { foreignKey: "assetId", targetKey: "assetid" }); // added targetKey to define the specific field in the associated model

module.exports = Transaction;
