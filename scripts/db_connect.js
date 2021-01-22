require("dotenv").config({ path: "../config/.env" });
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We've made contact with a database!");
});

module.exports = db;
