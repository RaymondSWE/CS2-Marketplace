# CSFairTrade

CSFairTrade is a full-stack trading platform developed for the CS:GO market, a market valued at over 1 billion euros. The platform provides users with the ability to buy and sell in-game skins.

## Technology Stack

CSFairTrade uses a modern web technology stack including:

- Frontend: React.js
- Backend: Node.js, Express.js
- Data management: MySQL
- Real-time bidirectional communication: Socket.IO
- Data display and manipulation: HTTPS requests

This application follows the MVC (Model-View-Controller) architecture.

## User Authentication

User authentication is facilitated through the Steam API's OAuth 2.0 to simplify the user registration process. User data is stored in a session and saved in the database upon signing in via Steam.

## Platform

CSFairTrade offers an interface for users to manage their inventories directly within the platform. This includes fetching the user's inventory data, obtaining data from all bots, and accessing the current price list. Despite API request limitations from Steam, a solution has been engineered to store and display the data using MySQL. The database is currently hosted on Azure.

## Deployment

Hosted on Vercel, main branch will push to prod.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have npm installed.

## Available Scripts

In the project directory, you can run:

- npm start: Runs the app in the development mode.
- npm run build: Builds the app for production to the build folder.
- npm test: Runs the Jest test runner in a terminal.
- npm run test:coverage: Runs the Jest test runner and produces a coverage report.
