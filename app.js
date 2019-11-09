const express = require("express");
const startUp = require("./controllers/startup")
const portDebugger = require("debug")("app:portConnection")
const app = express();
startUp(app)
app.get("/homey", (req, res) => {
  res.render("homey")
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  portDebugger("app is listening on port ", port);
});   
