"use strict";

const config = require("../config/BotConfig");
const async = require("async");
const fs = require("fs");
const Trade = require("./index");

const SteamUser = require("steam-user");
const SteamCommunity = require("steamcommunity");
const SteamTotp = require("steam-totp");
const TradeOfferManager = require("steam-tradeoffer-manager");
const GlobalOffensive = require("globaloffensive");
const { insertBots } = require("../controllers/BotController");
const {
  updateUsersItemStatusForSale,
} = require("../controllers/UsersItemsController");
const { updateItemsAssetId } = require("../controllers/ItemsController");
const { data } = require("./handlers/offerHandlers");
const { initializeBotInstance, handleWebSession, initializeBots } = require('./botInitialization');
const { setupPollDataSaver, setupItemListeners } = require('./botEvents');
const { startBots, startBot, reloadBotSessions, getBot, botConfirmation, botListen, startFloatChecker  } = require('./botOperation');
const {addNewOfferListener, addSentOfferChangedListener, addBotListeners} = require('./botListeners');
Trade.prototype.initializeBotInstance = initializeBotInstance;
Trade.prototype.handleWebSession = handleWebSession;
Trade.prototype.initializeBots = initializeBots;

Trade.prototype.setupPollDataSaver = setupPollDataSaver;
Trade.prototype.setupItemListeners = setupItemListeners;
Trade.prototype.startBots = startBots;
Trade.prototype.startBot = startBot;
Trade.prototype.reloadBotSessions = reloadBotSessions;
Trade.prototype.getBot = getBot;
Trade.prototype.botConfirmation = botConfirmation;
Trade.prototype.botListen = botListen;
Trade.prototype.startFloatChecker = startFloatChecker;

Trade.prototype.addNewOfferListener = addNewOfferListener;
Trade.prototype.addSentOfferChangedListener = addSentOfferChangedListener;
Trade.prototype.addBotListeners = addBotListeners;




