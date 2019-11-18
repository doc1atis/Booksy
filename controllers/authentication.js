const passport = require("passport");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const MongoDbStore = require("connect-mongo")(expressSession);
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const Pass = require("password-validator");
const User = require("../models/UserModel");
const store = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  autoReconnect: true
});
// password validation options
const passwordSchema = new Pass();
passwordSchema
  .is()
  .min(10)
  .is()
  .max(110)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .has()
  .symbols();

module.exports = {
  register: async (req, res) => {
    let errorType;
    try {
      if (req.body.username.length < 8) {
        errorType = "usernameError";
        throw new Error("username must be at least 8 characters");
      }
      const isValidPassword = passwordSchema.validate(req.body.password);
      if (!isValidPassword) {
        errorType = "passwordError";
        throw new Error(
          "password must be at least 10 character long and must  contain uppercase letter,digit,special character"
        );
      }

      const user = new User({ username: req.body.username });
      await User.register(user, req.body.password);
      passport.authenticate("local")(req, res, function() {
        req.flash("successMessage", "successfully registered");
        res.redirect("/");
      });
    } catch (error) {
      res.render("register", {
        errorMess: error.message,
        errorType,
        oldInputs: req.body
      });
    }
  },
  login: () => {
    return passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: "Invalid Password Or Username",
      successFlash: "Login Successfully"
    });
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
