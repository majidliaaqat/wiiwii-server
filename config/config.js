const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
// mongoose.set('debug', true)
const config = mongoose.connection;

module.exports = config;
