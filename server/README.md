
This project is a server for the CSFairTrade application, which allows users to trade, sell, and buy in-game items from various Steam games.


# Features
User authentication
- Item trading and listing
- Steam market integration
- User profiles
- Stripe payment integration

# API Routes

- /api/auth - Authentication routes
- /api/trade - Trade-related routes
- /api/user - User-related routes
- /api/market - Steam market routes
- /api/stripe - Stripe payment routes

# Socket.IO Events Documentation
This documentation describes the Socket.IO events in the provided code.

## Events Emitted by Server
1. site: Sends the site configuration object to the client.
2. user: Sends the user object to the client.
3. user inv: Sends the user inventory data to the client.
4. bot inv: Sends the specified bot's inventory data to the client.
5. bots inv: Sends the inventories of all bots to the client.
6. bots floats: Sends the float values of the bots' items to the client.
7. pricelist: Sends the current pricelist to the client.
8. rates: Sends the current rates for ignore, trash, user, and bot to the client.
9. offer status: Sends the status of the trade offer to the client.

## Events Received by Server
1. get user inv: Listens for an event containing a steamID64 parameter, fetches the user's inventory data, and emits the "user inv" event.
2. get bot inv: Listens for an event containing a bot_id parameter, fetches the specified bot's inventory data, and emits the "bot inv" event.
3. get bots inv: Listens for an event to fetch the inventories of all bots, and emits the "bots inv" and "bots floats" events.
4. get pricelist: Listens for an event to fetch the current pricelist and emits the "pricelist" event.
5. get rates: Listens for an event to fetch the current rates and emits the "rates" event.
6. get offer: Listens for an event containing trade offer data, validates the offer, and emits the "offer status" event.


## Production Deployment


The server was run on an IaaS provided by DigitalOcean.  To manage the application and keep it running over time, a Process Manager (PM2) was used. PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, reloads them without downtime, helps in facilitating common system admin tasks, and allows you to manage application logging, monitoring, and clustering. The server was deployed using Nginx as a reverse proxy. The server was also secured with an SSL certificate from Let's Encrypt. 


# Contributing
Feel free to submit issues and pull requests to improve the server code or to add new features.

