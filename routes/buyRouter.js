const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Book } = require("../models/BookModel");
const router = express.Router();
const endpointSecret = process.env.END_POINT_SECRET;
let olgyPass = {};
// post /buy
router.post("/", express.json(), async (req, res) => {
  // look for the book in data base, by using req.body.bookID
  const book = await Book.findById(req.body.bookID);
  olgyPass.book = book;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: book.title,
        description: "a nice book",
        amount: book.price * 100,
        currency: "usd",
        quantity: 1
      }
    ],
    success_url: `${req.protocol}://${req.get("host")}/library`,
    cancel_url: `${req.protocol}://${req.get("host")}/buy/cancel`
  });
  res.status(200).json({ sessionId: session.id });
});
// to make webhook works.
// this route is triggered when the user pays on stripe payment processing site
// bodyParser.raw({ type: "application/json" }),
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    let event;
    // stripe created a signature using my endpointSecret and sends the signature in the request header
    const signature = req.headers["stripe-signature"];
    try {
      // validate the signature using the endpoint secret
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      // safely ship products here,query database
      // find user by id and update his purchases property
      olgyPass.code = process.env.END_POINT_SECRET;
      console.log("you hit session olgy charge.succeeded");
    }
    res.status(200).json({ received: true });
  }
);
router.get("/success", (req, res) => {
  if (olgyPass === process.env.END_POINT_SECRET) {
    return res.send("olgy payment was successfull");
  }
  res.redirect("/access-denied");
});
router.get("/cancel", (req, res) => {
  res.send("olgy payment was cancelled");
});
// export olgyPass here
exports.buyRouter = router;
exports.olgyPass = olgyPass;
