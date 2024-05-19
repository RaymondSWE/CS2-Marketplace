"use strict";

module.exports = {
  appID: 730, // 730 - CS:GO
  contextID: 2, 
  bots: {
    bot_1: {
      siteName: "Bot_1", 
      accountName: process.env.USERNAME_STEAMBOT1, // bot_1 username
      password: process.env.PASSWORD_STEAMBOT1, // bot_1  password
      twoFactorCode: process.env.TWOFACTORYCODE_STEAMBOT1, // shared_secret value
      identitySecret: process.env.IDENTITYSECRET_STEAMBOT1, // identity_secret value
      steamID64: "76561199425314389", // SteamID64 of bot account can be found here: "https://steamid.io/"
      personaName: "CSGO Trade BOT 1", // Nickname for bot account, will change on restart
    },
  },
  steamApiKey: process.env.STEAM_API_KEY, // Your Steam API key, get it here: https://steamcommunity.com/dev/apikey
  SteamApisKey: process.env.STEAM_APIS_KEY, // Your SteamApis.com key, get it here: https://steamapis.com
  SteamApisCompactValue: "safe_ts.last_30d", // Use safe price calculated from 30 days of data, more info: https://steamapis.com/developers (Market Items - Optional Query Parameters "compact_value")
  site: {
    header: "CSFairTrade", 
    steamGroup: "#",
    copyrights: "Copyright © CSFairTrade 2022", 
  },
  domain: process.env.DOMAIN_FRONTEND, //(no http:// & no www & no /)
  website: process.env.DOMAIN_ORIGIN, // Website URL(do not add / at the end)
  websitePort: process.env.HTTPS_PORT, 
  tradeMessage:
    "Trade offer from CSFairTrade | Please decline if you did not request this offer or the offer looks invalid.", // Quite obvious // Add a tracking number which should be saved in db too
  rates: {
    ignoreItemsBelow: 0.05, // Ignore items below this price (price * rate < ignoreItemsBelow) - shows (Too Low) for user
    trashPriceBelow: 0.2, // Items below this price are considered trash, the trash rate modifier will be applied
    // Items
    user: {
      key: 1,
      knife: 0.95,
      rare_skin: 0.95,
      weapon: 0.9,
      misc: 0.85,
      trash: 0.7,
    },
    bot: {
      key: 1.05,
      knife: 1,
      rare_skin: 1,
      weapon: 0.95,
      misc: 0.9,
      trash: 0.8,
    },
  },
};
