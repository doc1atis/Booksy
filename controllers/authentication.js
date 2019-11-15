const passport = require("passport");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const MongoDbStore = require("connect-mongo")(expressSession);
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const User = require("../models/UserModel");
const store = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  autoReconnect: true
});
const loginConfig = {
  successRedirect: "/",
  failureRedirect: "/login",
  successFlash: "log in successfully olgy",
  failureFlash: "failed to log in olgy"
};

module.exports = {
  register: async (req, res) => {
    try {
      const user = new User({ username: req.body.username });
      await User.register(user, req.body.password);
      passport.authenticate("local")(req, res, function() {
        req.flash("message", "you are registered olgy");
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  },
  login: () => {
    return passport.authenticate("local", loginConfig);
  },
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  },
  runPassport: app => {
    app.use(
      expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
          secure: false,
          maxAge: 365 * 24 * 60 * 60 * 1000
        }
      })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }
};
