const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.DOMAIN_BACKEND}/api/auth/steam/return`,
      realm: `${process.env.DOMAIN_BACKEND}/`,
      apiKey: process.env.API_KEY,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

router.get("/steam", passport.authenticate("steam"), (req, res) => {
  res.redirect(process.env.DOMAIN_ORIGIN);
});

router.get("/logout", authController.logout);

router.get(
  "/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  async (req, res) => {
    req.session.user = req.user;
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    await authController.saveUserInformation(req.session.user);
    // console.log("req.session.user", req.session.user);
    res.redirect(process.env.DOMAIN_ORIGIN);
  }
);

router.get("/user", (req, res) => {
  req.session.user
    ? res.json(req.session.user)
    : res.json({ error: "No user data, endpoint: auth/user" });
});

router.get("/steamid", (req, res) => {
  req.session.user
    ? res.json({ steamid: req.session.user._json.steamid })
    : res.json({ error: "No user is logged in" });
});

router.get("/", (req, res) => {
  res.status(200).send(req.session.user);
});

router.get("/isLoggedIn", authController.logout, authController.isLoggedIn);

module.exports = router;
