const express = require("express");
const app = express();
const UsersRoutes = require("../routes/UsersRoutes");
const {
  getBotInventory,
  getBotsInventories,
} = require("./handlers/botHandlers");
const { getOffer } = require("./handlers/offerHandlers");
const { getUserInventory } = require("./handlers/userHandlers");
app.use("/steamid", UsersRoutes);
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.DOMAIN_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Extract steamid64 from data base.
// import the sharedsession middleware
const sharedsession = require("express-socket.io-session");
// import the TradeBot class and the configuration object
const TradeBot = require("./index");
const config = require("../config/BotConfig");
// Create a new instance of the TradeBot class and pass the socket.io instance
const Trade = new TradeBot({ io });

let onlineUsers = 0;
// Export a function that will be called when a new socket connection is established
module.exports = (socket) => {
  // check if user is logged in by checking if the user object exists in the session
  let userObject = false;
  if (
    typeof socket.handshake.session.passport !== "undefined" &&
    typeof socket.handshake.session.passport.user !== "undefined" &&
    typeof socket.handshake.session.passport.user.id !== "undefined"
  ) {
    userObject = socket.handshake.session.passport.user;
  }
  // Emit the site configuration to the client
  socket.emit("site", config.site);
  // Emit the user object to the client
  socket.emit("user", userObject);

  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);
  // ineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
    // ("Online users: ", onlineUsers);
  });

  // Listen for the "get user inv" event
  // Replace the existing "get user inv" event listener with a call to getUserInventory
  getUserInventory(socket, Trade, config);
  getBotInventory(socket, Trade, config);
  getBotsInventories(socket, Trade, config);

  socket.on("withdraw", (data) => {
    // ("Withdraw request data: ", data);
    const { bot_id, steamID64, assetid, tradeUrl } = data;
    // (`Received data from client: `, data);
    console.log("Received data from client: ", data);


    if (
      !tradeUrl ||
      tradeUrl.indexOf("steamcommunity.com/tradeoffer/new/") === -1 ||
      tradeUrl.indexOf("?partner=") === -1 ||
      tradeUrl.indexOf("&token=") === -1
    ) {
      return socket.emit("withdraw status", {
        error: "Invalid or missing trade link!",
        status: false,
      });
    }


    Trade.processWithdrawal(
      { bot_id, steamID64, assetid, tradeUrl },
      (err, result) => {
        if (err) {
          socket.emit("withdraw status", {
            error: err,
            status: false,
          });
        } else {
          // Create the offer here
          try {
            console.log(result);
            const offer = result.bot.manager.createOffer(tradeUrl);
            offer.addMyItem(result.item);

            // Other code to handle the offer...
          } catch (error) {
            console.error("Failed to create the trade offer: ", error);
            socket.emit("withdraw status", {
              error: "Failed to create the trade offer.",
              status: false,
            });
          }
        }
      }
    );
  });

  socket.on("get pricelist", () => {
    socket.emit("pricelist", Trade.getPriceList());
  });

  socket.on("get rates", () => {
    socket.emit("rates", {
      ignore: Trade.getIgnorePrice(),
      trash: Trade.getTrashPrice(),
      user: Trade.getUserRates(),
      bot: Trade.getBotRates(),
    });
  });

  getOffer(socket, Trade);
};
