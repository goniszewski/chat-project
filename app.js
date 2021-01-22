require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const router = express.Router();
const db = require("./scripts/db_connect");

// API routes import
const usersRoute = require("./api/users");
const roomsRoute = require("./api/rooms");
const messagesRoute = require("./api/messages");

// API routes set
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);
app.use("/messages", messagesRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`[app.js] Server is running on port ${process.env.API_PORT}`);
});
