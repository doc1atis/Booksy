const express = require("express");
require("dotenv").config();
const startUp = require("./controllers/startup");
const portDebugger = require("debug")("app:portConnection");
const app = express();
startUp(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  portDebugger("app is listening on port ", port);
});
