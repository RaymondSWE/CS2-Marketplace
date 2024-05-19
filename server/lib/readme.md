# Event-driven architecture
The websocket code uses event-driven architecture to handle different WebSocket events, such as "get user inv", "get bot inv", "get bots inv", "withdraw", "get pricelist", and "get rates". Each event has its own event handler function that is responsible for handling the event and performing the necessary actions.
This code for sockets also follows prototype and module patterns.



## Bots

1. `initializeBotInstance`: Creates and returns a bot instance.
2. `handleWebSession`: Sets up the web session for a bot instance.
3. `initializeBots`: Initializes bots by calling the above two functions.
4. `setupPollDataSaver`: Sets up a listener to save poll data.
5. `setupItemListeners`: Sets up listeners for item-related events.
6. `startBots`: Starts all bots by calling `startBot` for each bot.
7. `startBot`: Starts a bot and calls `initializeBots`, `setupPollDataSaver`, and `setupItemListeners`.
8. `addNewOfferListener` and `addSentOfferChangedListener`: Two new functions to handle specific offer events, called by `addBotListeners`.


## Prices
1. getPrices: Invokes the getSteamapis function to fetch prices from SteamApis, retries up to 3 times if there is an error, and calls the provided callback with the data or an error message.
2. getSteamapis: Makes a request to the SteamApis API to retrieve prices, handling retries if there is an error in the response.

## inv.js
1. getInventory: Retrieves inventory data for a Steam user by making a request to the SteamApis API, handling retries, filtering and processing the items, and calling the provided callback with the inventory data or an error message.
2. getInventories: Retrieves inventories for multiple Steam users by calling getInventory for each user and organizing the data into an object, and calls the provided callback with the inventories.

## tradeInitializer.js
1. initializeTradeBot: Initializes the trade bot by updating prices, scheduling regular price updates, starting bots, and setting up bot listeners.
2. updatePrices: Retrieves prices using the getPrices function, updates the trade bot's prices, and updates the items' prices using the updateItemsPrices function from the ItemsController

## tradeOperations.js
1. processWithdrawal: Processes a withdrawal from a trade by verifying the bot associated with the trade, loading the bot's inventory, verifying the item to be withdrawn, and sending the trade offer if all checks pass.


## tradeValidator.js
1. validateOffer: Validates a trade offer by checking the price list, the user's and bot's inventory, ensuring correct values, and existence of items. If the user's total value is less than the bot's, it returns an error.
2. verifyUserItems: Verifies the user's items in a trade by retrieving the user's inventory, checking item prices, and calculating the user's total value.
3. verifyBotItems: Verifies the bot's items in a trade by retrieving the bot's inventory, checking item prices, and calculating the bot's total value.
## index.js
1. Trade: Constructor function for the Trade object, initializes properties and calls initializeTradeBot function.
2. initializeTradeBot: Initializes the trade bot by calling initializeTradeBot from tradeInitializer.
3. updatePrices: Updates prices by calling updatePrices from tradeInitializer.
4. getPriceList: Returns the price list.
5. getFloatValues: Returns the float values.
6. getPrice: Returns the price of an item based on its name, rate type, and item type.
7. getUserRates: Returns the user rates.
8. getBotRates: Returns the bot rates.
9. getTrashPrice: Returns the trash price.
10. getIgnorePrice: Returns the ignore price.
11. validateOffer: Calls validateOffer from tradeValidator to validate a trade offer.
12. verifyUserItems: Calls verifyUserItems from tradeValidator to verify the user's items in a trade.
13. verifyBotItems: Calls verifyBotItems from tradeValidator to verify the bot's items in a trade.
14. processWithdrawal: Calls processWithdrawal from tradeOperations to process a withdrawal from a trade.



## botHandler.js
1. getBotInventory: Handles the "get bot inv" event from the socket. Retrieves the bot's inventory using Trade.getInventory and emits the inventory data to the client.
2. getBotsInventories: Handles the "get bots inv" event from the socket. Retrieves the inventories of all bots using Trade.getInventories and emits the inventories data to the client. It also processes each bot's inventory by inserting items into the database and updating float values.
3. processBotInventories: Processes a bot's inventory by inserting items into the database, inserting bot items, and updating float values.

## offerHandlers.js
1. getOffer: Handles the "get offer" event from the socket. Validates the offer data using Trade.validateOffer and performs various actions based on the validation result. If the offer is valid, it creates an offer using Bot.manager.createOffer and sends the offer. It also updates the user's items' listed prices using updateUsersItemsListedPrices.
userHandlers.js
2. getUserInventory: Handles the "get user inv" event from the socket. Retrieves the user's inventory using Trade.getInventory, emits the inventory data to the client, inserts the items into the database, and inserts user items into the usersitem table.

## socket.js
Imports the necessary modules and sets up the express app and socket.io server.
Defines the Trade instance using TradeBot and the configuration object.
Initializes the onlineUsers count and emits it to the clients.
Defines the event listeners for "disconnect", "get user inv", "get bot inv", "get bots inv", "withdraw", "get pricelist", and "get rates".
Calls the respective handler functions for each event.
Exports a function that is called when a new socket connection is established.
