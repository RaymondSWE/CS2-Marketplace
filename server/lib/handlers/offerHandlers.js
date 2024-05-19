const config = require("../../config/BotConfig");
const {
  updateUsersItemsListedPrices,
} = require("../../controllers/UsersItemsController");

const getOffer = (socket, Trade) => {
  socket.on("get offer", (data) => {
    socket.emit("offer status", {
      error: null,
      status: 4,
    });
    const link = data.tradelink;
    const offerData = data;
    const listedPrice = parseFloat(data.listedPrice) || {};
    if (
      link.indexOf("steamcommunity.com/tradeoffer/new/") === -1 ||
      link.indexOf("?partner=") === -1 ||
      link.indexOf("&token=") === -1
    ) {
      socket.emit("offer status", {
        error: "Invalid trade link!",
        status: false,
      });
    } else {
      Trade.validateOffer(offerData, listedPrice, (err, success) => {
        ("Offer validation status: ", success);
        if (err) {
          console.error("Offer validation error: ", err);
          socket.emit("offer status", {
            error:
              err.message ||
              "An unknown error occurred during offer validation.",
            status: false,
          });
        } else {
          socket.emit("offer status", {
            error: null,
            status: success ? 1 : false,
          });

          if (success) {
            if (typeof config.bots[offerData.bot_id] === "undefined") {
              offerData.bot_id = Object.keys(config.bots)[0];
            }
            const Bot = Trade.getBot(offerData.bot_id);
            const offer = Bot.manager.createOffer(offerData.tradelink);

            offer.addTheirItems(
              offerData.user.map((assetid) => ({
                assetid,
                appid: config.appID,
                contextid: config.contextID,
                amount: 1,
              }))
            );

            if (offerData.bot.length) {
              offer.addMyItems(
                offerData.bot.map((assetid) => ({
                  assetid,
                  appid: config.appID,
                  contextid: config.contextID,
                  amount: 1,
                }))
              );
            }

            offer.setMessage(config.tradeMessage);

            offer.getUserDetails((detailsError, me, them) => {
              if (detailsError) {
                console.error("Error in getUserDetails: ", detailsError);
                socket.emit("offer status", {
                  error:
                    detailsError.message ||
                    "An error occurred while retrieving user details.",
                  status: false,
                });
              } else if (me.escrowDays + them.escrowDays > 0) {
                socket.emit("offer status", {
                  error:
                    "You must have 2FA enabled, we do not accept trades that go into Escrow.",
                  status: false,
                });
              } else {
                ("Preparing to send offer: ", offer);
                offer.send((errSend, status) => {
                  if (errSend) {
                    console.error("Error in send: ", errSend);
                    let userFriendlyError =
                      errSend.message || "An unknown error occurred.";

                    if (errSend.eresult === 20) {
                      userFriendlyError =
                        "The Steam item server is currently unavailable. Please try again later.";
                    }

                    socket.emit("offer status", {
                      error: userFriendlyError,
                      status: false,
                    });
                  } else {
                    ("[!!!!!] Sent a trade: ", data);
                    (
                      "Offerdata data from offerhandler: " + data.listedPrice
                    );
                    (
                      "Offerdata listedprice from offerhandler: " +
                        JSON.stringify(offerData.listedPrice)
                    );

                    updateUsersItemsListedPrices(
                      offerData.user,
                      offerData.listedPrice,
                      (error) => {
                        if (error) {
                          console.error(
                            "Error updating user items prices: ",
                            error
                          );
                        } else {
                          ("User items prices updated successfully");
                        }
                      }
                    );

                    if (status === "pending") {
                      socket.emit("offer status", {
                        error: null,
                        status: 2,
                      });
                      Trade.botConfirmation(
                        data.bot_id,
                        offer.id,
                        (errConfirm) => {
                          if (errConfirm) {
                            console.error(
                              "Error in botConfirmation: ",
                              errConfirm
                            );
                            socket.emit("offer status", {
                              error:
                                errConfirm.message ||
                                "An unknown error occurred during bot confirmation.",
                              status: false,
                            });
                          } else {
                            socket.emit("offer status", {
                              error: null,
                              status: 3,
                              offer: offer.id,
                              sentItems: offerData.user,
                            });
                          }
                        }
                      );
                    } else {
                      socket.emit("offer status", {
                        error: null,
                        status: 3,
                        offer: offer.id,
                        sentItems: offerData.user,
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    }
  });
};

module.exports = {
  getOffer,
};
