"use strict";

const config = require("../config/BotConfig");
const SteamUser = require("steam-user");
const SteamCommunity = require("steamcommunity");
const SteamTotp = require("steam-totp");
const TradeOfferManager = require("steam-tradeoffer-manager");
const GlobalOffensive = require("globaloffensive");
const fs = require("fs");

const Trade = require("./index"); 

Trade.prototype.initializeBotInstance = function (bot, id) {
  const client = new SteamUser({ dataDirectory: null });
  const csgo = new GlobalOffensive(client);
  const instance = {
    client,
    csgo,
    community: new SteamCommunity(),
    manager: new TradeOfferManager({
      steam: client,
      domain: config.domain,
      language: "en",
      cancelTime: 600000,
    }),
    login: {
      accountName: bot.accountName,
      password: bot.password,
      twoFactorCode: SteamTotp.getAuthCode(bot.twoFactorCode),
    },
    user: bot,
  };

  // identifiers
  instance.client.bot_id = id;
  instance.community.bot_id = id;
  instance.manager.bot_id = id;

 // console.log(`Bot instance for bot ${id} initialized`);


  return instance;
};

Trade.prototype.handleWebSession = function (instance) {
  instance.client.addListener("webSession", (sessionID, cookies) => {
    instance.manager.setCookies(cookies, (err) => {
      if (err) {
        console.error("Failed to set cookies:", err);
      }
    });
    instance.community.setCookies(cookies);
    instance.client.setPersona(
      SteamUser.EPersonaState.LookingToTrade,
      instance.user.personaName
    );
    // Initialize CS:GO
    instance.client.gamesPlayed([config.appID]);
    // Set isLoggedIn to true when a web session is established
    instance.isLoggedIn = true;
  });

  // Add loggedOff and disconnected event listeners to set isLoggedIn to false
  instance.client.on('loggedOff', () => {
    instance.isLoggedIn = false;
  });
  instance.client.on('disconnected', () => {
    instance.isLoggedIn = false;
  });
};


Trade.prototype.initializeBots = function (bot, id) {
  this.instances[id] = this.initializeBotInstance(bot, id);
  this.handleWebSession(this.instances[id]);

  // polldata
  if (fs.existsSync(`./polls/${id}.json`)) {
    this.instances[id].manager.pollData = JSON.parse(fs.readFileSync(`./polls/${id}.json`));
  }

  // login
  this.instances[id].client.logOn(this.instances[id].login);
};

module.exports = {
  initializeBotInstance: Trade.prototype.initializeBotInstance,
  handleWebSession: Trade.prototype.handleWebSession,
  initializeBots: Trade.prototype.initializeBots
};