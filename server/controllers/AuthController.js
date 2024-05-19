const User = require("../models/UsersModel");

const isLoggedIn = (req, res) => {
  // Set user property to null if it exists
  if (req.session.user) {
    req.session.user = null;
  }
  return res.status(200).send({ status: !!req.session.user });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error destroying session." });
    }

    res.clearCookie("connect.sid", { path: "/" });
    res.status(200).send({ message: "Successfully destroyed session." });
  });
};

const saveUserInformation = async (user) => {
  try {
    const { steamid, personaname, avatar, loccountrycode } = user._json;

    const [userInstance, created] = await User.findOrCreate({
      where: { steamid64: steamid },
      defaults: {
        personaname,
        steamid64: steamid,
        avatar,
        countrycode: loccountrycode,
        balance: 0,
      },
    });

    if (created) {
      (
        `[!] MySQL Insertion: Inserted ${userInstance.dataValues} rows`
      );
    } else {
      ("User already exists in the database");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  isLoggedIn,
  logout,
  saveUserInformation,
};
