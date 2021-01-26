require("dotenv").config({ path: "../config/.env" });
const mongoose = require("mongoose");

const db = mongoose.connect(
  process.env.MONGO_SERVER,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) =>
    console.log((err = !null ? "connection successful" : "error: " + err))
);

module.exports = db;
