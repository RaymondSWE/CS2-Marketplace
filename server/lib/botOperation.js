const config = require("../config/BotConfig");
const async = require("async");
const Trade = require("./index");


Trade.prototype.startBots = function startBots(done) {
  let count = 0;
  async.eachOfSeries(config.bots, (bot, id, callback) => {
    count += 1;
    this.startBot(bot, id, count, callback);
  }, () => {
    console.log("[!] All bots online.");
    if (typeof done === "function") {
      done();
    }
  });
};


Trade.prototype.startBot = function (bot, id, count, callback) {
  this.initializeBots(bot, id);
  this.setupPollDataSaver(id);
  this.setupItemListeners(id);

  // authenticated
  console.log(`Bot (${id}) has been logged-in.`);
  setTimeout(() => {
    if (count >= Object.keys(config.bots).length) {
      return this.startFloatChecker(id, () => callback());
    }
    console.log("Waiting until floats are checked before authenticating the second bot.");
    this.startFloatChecker(id, () => {
      console.log("Waiting 30 seconds before authenticating another bot to avoid Steam cooldowns.");
      return setTimeout(() => {
        callback();
      }, 30000);
    });
  }, 15000);
};




Trade.prototype.reloadBotSessions = function reloadBotSessions() {
  const self = this;
  Object.keys(self.instances).forEach((id) => {
    self.instances[id].client.webLogOn();
  });
};

Trade.prototype.getBot = function getBot(id) {
  return this.instances[id];
};

Trade.prototype.botConfirmation = function botConfirmation(
  id,
  offerid,
  callback
) {
  const bot = this.instances[id];
  bot.community.acceptConfirmationForObject(
    bot.user.identitySecret,
    offerid,
    callback
  );
};

Trade.prototype.botListen = function botListen(obj, listen, fn) {
  const self = this;
  Object.keys(self.instances).forEach((id) => {
    self.instances[id][obj].on(listen, fn);
  });
};

Trade.prototype.startFloatChecker = function startFloatChecker(
  instanceID,
  done
) {
  const self = this;
  const instance = self.instances[instanceID];
  // Fetch instance inventory
  Trade.prototype.getInventory(
    config.bots[instanceID].steamID64,
    config.appID,
    config.contextID,
    (err, items) => {
      if (err) {
        console.error(
          "[FloatChecker:Error]",
          `Could not get inventory for "${instanceID}", can't set floats. Error details:`,
          err
        );
        return done();
      }

      if (!items || !Object.keys(items).length) {
        console.log(
          "[FloatChecker:Error]",
          `Could not get items for "${instanceID}", empty inventory?`
        );
        return done();
      }
      console.log(
        "[FloatChecker:Progress]",
        `Starting to acquire floats for bot "${instanceID}". This can take a while if you have a lot of items.`,
        {
          steamid: config.bots[instanceID].steamID64,
        } // Log the sitename and steamid
      );

      const csgo = instance.csgo;
      // Go through all inventory items and inspect them for float values (paint wear)
      // Once all items have been checked, we callback and continue with the next bot
      async.eachOfSeries(
        items,
        (item, assetid, itemCallback) => {
          // Check if we already have inspected the item
          if (typeof self.floats[assetid] !== "undefined" || !item.inspect) {
            return itemCallback();
          }
          csgo.inspectItem(item.inspect);
          setTimeout(itemCallback, 3000);
        },
        () => {
          console.log(
            "[FloatChecker:Progress]",
            `Done floats for bot "${instanceID}".`
          );
          return done();
        }
      );
    }
  );
};

module.exports = {
  startBots: Trade.prototype.startBots,
  startBot: Trade.prototype.startBot,
  reloadBotSessions: Trade.prototype.reloadBotSessions,
  getBot: Trade.prototype.getBot,
  botConfirmation: Trade.prototype.botConfirmation,
  botListen: Trade.prototype.botListen,
  startFloatChecker: Trade.prototype.startFloatChecker,
};


