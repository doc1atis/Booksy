const homeRouter = require("../../routes/homeRouter");
const loginRouter = require("../../routes/loginRouter");
const registerRouter = require("../../routes/registerRouter");
const logoutRouter = require("../../routes/logoutRouter");
const contactRouter = require("../../routes/contactRouter");
const libraryRouter = require("../../routes/libraryRouter");
const uploadRouter = require("../../routes/uploadRouter");
const categoryRouter = require("../../routes/categoryRouter");
const downloadRouter = require("../../routes/downloadRouter");
const { buyRouter } = require("../../routes/buyRouter");
const allBooksRouter = require("../../routes/allBooksRouter");

module.exports = function(app) {
  app.use("/", homeRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/logout", logoutRouter);
  app.use("/contact", contactRouter);
  app.use("/library", libraryRouter);
  app.use("/upload", uploadRouter);
  app.use("/category", categoryRouter);
  app.use("/download", downloadRouter);
  app.use("/buy", buyRouter);
  app.use("/allbooks", allBooksRouter);
};
