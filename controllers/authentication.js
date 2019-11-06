const passport = require("passport");
const expressSession = require("express-session")
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const User = require("../models/UserModel")
const loginConfig = {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: "log in successfully olgy",
    failureFlash: "failed to log in olgy"
}

module.exports = {
    register: async (req, res) => {
        try {
            const user = new User({ username: req.body.username })
            await User.register(user, req.body.password)
            passport.authenticate("local")(req, res, function () {
                req.flash("message", "you are registered olgy b")
                res.redirect("/");
            });
        } catch (error) {
            console.log(error);
            res.redirect("/register")
        }
    },
    login: () => {
        return passport.authenticate("local", loginConfig)
    },
    runPassport: (app) => {
        app.use(
            expressSession({
                secret: process.env.SESSION_SECRET,
                resave: true,
                saveUninitialized: true
            })
        );
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }
}