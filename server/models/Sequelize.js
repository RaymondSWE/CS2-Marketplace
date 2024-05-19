const { Sequelize } = require("sequelize");

let sequelize;
function connectWithRetry() {
  console.log("Connecting to database...");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      dialectModule: require("mysql2"),
      logging: false,
    }
  );

  return sequelize
    .authenticate()
    .then(() => {
      ("[!] Database connected.");
    })
    .catch((err) => {
      console.error("[!] Error connecting to database: ", err);
      ("[!] Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

module.exports = sequelize;
