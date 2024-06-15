# CSFairTrade

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/RaymondSWE/CSFairTrade/actions)
[![GitHub stars](https://img.shields.io/github/stars/RaymondSWE/CSFairTrade)](https://github.com/RaymondSWE/CSFairTrade/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/RaymondSWE/CSFairTrade)](https://github.com/RaymondSWE/CSFairTrade/network)
[![GitHub license](https://img.shields.io/github/license/RaymondSWE/CSFairTrade)](https://github.com/RaymondSWE/CSFairTrade/blob/main/LICENSE)

Welcome to **CSFairTrade**, a full-stack application enabling users to trade, sell, and buy in-game items from CS2 (Counter-Strike 2). This platform provides a secure and seamless trading experience using modern web technologies.


## 🛠️ Tech Stack

- **Frontend:** React, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Real-time Communication:** Socket.IO
- **Deployment:** Vercel

## 📋 Features

- User authentication via Steam
- Item trading and listing
- Steam market integration
- User profiles
- Stripe payment integration

## 🔧 API Routes

- `/api/auth` - Authentication routes
- `/api/trade` - Trade-related routes
- `/api/user` - User-related routes
- `/api/market` - Steam market routes
- `/api/stripe` - Stripe payment routes

## 🔄 Socket.IO Events

### Emitted by Server

- `site`: Sends the site configuration object to the client.
- `user`: Sends the user object to the client.
- `user inv`: Sends the user inventory data to the client.
- `bot inv`: Sends the specified bot's inventory data to the client.
- `bots inv`: Sends the inventories of all bots to the client.
- `bots floats`: Sends the float values of the bots' items to the client.
- `pricelist`: Sends the current pricelist to the client.
- `rates`: Sends the current rates for ignore, trash, user, and bot to the client.
- `offer status`: Sends the status of the trade offer to the client.

### Received by Server

- `get user inv`: Fetches the user's inventory data.
- `get bot inv`: Fetches the specified bot's inventory data.
- `get bots inv`: Fetches the inventories of all bots.
- `get pricelist`: Fetches the current pricelist.
- `get rates`: Fetches the current rates.
- `get offer`: Validates and processes trade offers.

## 🏗️ Deployment

The server was deployed on DigitalOcean using PM2 for process management and Nginx as a reverse proxy. The application was secured with an SSL certificate from Let's Encrypt.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for visiting CSFairTrade! Don't forget to ⭐ this repository if you find it useful.
