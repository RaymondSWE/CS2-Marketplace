const express = require("express");
const router = express.Router();
// import usercontroller
const userController = require("../controllers/UsersController");

router.get("/allUsersCount", userController.getAllUsersCount);
router.get("/allUsersSteamid", userController.getAllUsersSteamid);
router.post("/addUserTradeLink", userController.addUserTradeLink);
router.get("/getTradeLink/:steamid64", userController.getTradeLink);
router.post("/addUserEmail", userController.addUserEmail);
router.get("/getUserEmail/:steamid64", userController.getUserEmail);
router.get(
  "/getUserEmailWithNull/:steamid64",
  userController.getUserEmailWithNull
);
router.get("/balance/:steamid64", userController.getUserBalance);

module.exports = router;
