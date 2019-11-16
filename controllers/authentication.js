const passport = require("passport");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const MongoDbStore = require("connect-mongo")(expressSession);
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const JOI = require("@hapi/joi");
const passwordComplexity = require("joi-password-complexity");
const User = require("../models/UserModel");
const store = new MongoDbStore({
  mongooseConnection: mongoose.connection,
  autoReconnect: true
});
const loginConfig = {
  successRedirect: "/",
  failureRedirect: "/login",
  successFlash: "log in successfully",
  failureFlash: "invalid password or username"
};
// password validation options
const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3
};
// form validation options
function validateForm(formBody) {
  const formSchema = {
    username: JOI.string()
      .min(8)
      .max(20)
      .required(),
    password: JOI.string().required()
  };
  JOI.validate(formBody, formSchema);
  JOI.validate(
    formBody.password,
    new passwordComplexity(complexityOptions),
    function(err, value) {
      if (err) {
        throw err;
      }
    }
  );
}
module.exports = {
  register: async (req, res) => {
    try {
      validateForm(req.body);
      const user = new User({ username: req.body.username });
      await User.register(user, req.body.password);
      passport.authenticate("local")(req, res, function() {
        req.flash("successMessage", "successfully registered");
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      req.flash("errorMessage", error);
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
