const homeRouter = require("../../routes/homeRouter")
const loginRouter = require("../../routes/loginRouter")
const registerRouter = require("../../routes/registerRouter")
const logoutRouter = require("../../routes/logoutRouter")
const contactRouter = require("../../routes/contactRouter")

module.exports = function (app) {
    app.use("/", homeRouter)
    app.use("/login", loginRouter)
    app.use("/register", registerRouter)
    app.use("/logout", logoutRouter)
    app.use("/contact", contactRouter)
}