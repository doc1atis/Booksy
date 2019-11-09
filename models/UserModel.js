const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }]
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
