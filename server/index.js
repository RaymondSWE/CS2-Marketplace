// imports
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const DatabaseIntegration = require("./config/DatabaseConfig");
const fs = require("fs");
const mysql = require("mysql");
const https = require("https");
const sharedsession = require("express-socket.io-session");
const TradeBot = require("./lib/index");
const config = require("./config/BotConfig");
const app = express();

// imports for routes
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UsersRoutes");
const BotsItemsRoutes = require("./routes/BotsItemsRoutes");
const itemsRoutes = require("./routes/ItemsRoutes");
const usersItemsRoutes = require("./routes/UsersItemsRoutes");

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

app.use(
  cors({
    // CORS setup
    origin: process.env.DOMAIN_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// session setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sessionMiddleware = session({
  secret: process.env.SECRET,
  name: "CSFairTrade",
  saveUninitialized: true,
  resave: true,
  sameSite: "none",
  cookie: {
    maxAge: 3600000,
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
});
app.use(sessionMiddleware);

// middleware for settting headers and mock data
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.DOMAIN_ORIGIN);
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes
const configUrl = "/api/";
app.use(configUrl + "auth", authRoutes);
app.use(configUrl + "user/", userRoutes);
app.use(configUrl + "botitems/", BotsItemsRoutes);
app.use(configUrl + "items/", itemsRoutes);
app.use(configUrl + "useritems/", usersItemsRoutes);

// Database setup
const db = mysql.createConnection(DatabaseIntegration);
console.log(`[!] Database: ${process.env.DB_NAME}`);
console.log(`[!] Database port: ${process.env.DB_PORT}`);
console.log(`[!] Database user: ${process.env.DB_USER}`);

// Server setup
const setupServer = async () => {
  let credentials;
  if (process.env.NODE_ENV === "production") {
    credentials = {
      key: await fs.promises.readFile(
        "./etc/letsencrypt/api.csfairtrade.com/private.key",
        "utf8"
      ),
      cert: await fs.promises.readFile(
        "./etc/letsencrypt/api.csfairtrade.com/certificate.crt",
        "utf8"
      ),
      ca: await fs.promises.readFile(
        "./etc/letsencrypt/api.csfairtrade.com/ca_bundle.crt",
        "utf8"
      ),
    };
    console.log("PRODUCTION MODE");
    app.use(morgan("combined")); // Morgan setup for logging
  } else {
    credentials = {
      key: await fs.promises.readFile(
        "./etc/letsencrypt/localhost/localhost-key.pem",
        "utf8"
      ),
      cert: await fs.promises.readFile(
        "./etc/letsencrypt/localhost/localhost.pem",
        "utf8"
      ),
    };
    console.log("DEVELOPMENT MODE");

  }
  const server = https.createServer(credentials, app);
  server.listen(config.websitePort, () => {
    console.log(`[!] Backend/API domain  ${process.env.DOMAIN_BACKEND}`);
    console.log(`[!] DOMAIN/Frontend origin  ${process.env.DOMAIN_ORIGIN}`);
  });
  return server;
};

setupServer()
  .then((server) => {
    // Sockets
    const io = require("socket.io")(server, {
      cors: {
        origin: process.env.DOMAIN_ORIGIN,
        methods: ["GET", "POST"],
      },
    });
    const socketEvents = require("./lib/socket");
    io.use(sharedsession(sessionMiddleware));
    io.on("connection", socketEvents);
  })
  .catch((err) => {
    console.error("Error setting up server:", err);
    process.exit(1);
  });
