const dbConnection = require("./dbConnection")
const startupDebugger = require("debug")("app:startup");
const startupMiddlewares = require("./middlewares/startupMiddlewares")
const routesMiddlewares = require("./middlewares/routesMiddlewares")
dbConnection()
module.exports = function (app) {
    startupDebugger("the app started");
    startupMiddlewares(app)
    routesMiddlewares(app)

}