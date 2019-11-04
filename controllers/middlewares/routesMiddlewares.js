const homeRouter = require("../../routes/homeRouter")
const loginRouter = require("../../routes/loginRouter")
const registerRouter = require("../../routes/registerRouter")
const logoutRouter = require("../../routes/logoutRouter")
module.exports = function (app) {
    app.use("/", homeRouter)
    app.use("/login", loginRouter)
    app.use("/register", registerRouter)
    app.use("/logout", logoutRouter)
}