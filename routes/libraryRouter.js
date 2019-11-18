const express = require("express");
const auth = require("../controllers/authentication");
const { olgyPass } = require("./buyRouter");
const router = express.Router();
router.get("/", auth.isLoggedIn, async (req, res) => {
  // send new book here by using res.locals in webhooks
  if (olgyPass.code === process.env.END_POINT_SECRET) {
    req.user.purchases.push(olgyPass.book);
    await req.user.save();
    return res.status(200).render("library", {
      purchasedBooks: req.user.purchases,
      chargeMessage: "payment successful"
    });
  }
  res.status(200).render("library", {
    purchasedBooks: req.user.purchases,
    chargeMessage: null
  });
});
router.get("/download/:id", auth.isLoggedIn, (req, res) => {
  res.send(`I will download the book with id: ${req.params.id}`);
});
module.exports = router;
