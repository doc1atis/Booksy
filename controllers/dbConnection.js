const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:dataBaseConnection");
module.exports = async function() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || process.env.MONGO_DB_ATLAS_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    dbDebugger("app is connected to MONGO DB OLGY");
  } catch (error) {
    dbDebugger("there was an error connecting to MONGO DB OLGY: ", error);
  }
};
