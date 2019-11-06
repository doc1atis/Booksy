const mongoose = require("mongoose")
const dbDebugger = require("debug")("app:dataBaseConnection");
module.exports = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Booksy", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        dbDebugger("app is connected to MONGO DB OLGY")
        console.log(process.env.MONGODB_URI);
    } catch (error) {
        dbDebugger("there was an error connecting to MONGO DB OLGY: ", error);
    }
}

