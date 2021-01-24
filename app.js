require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const db = require("./scripts/db_connect");
const sockets = require("./services/sockets-service");
const bodyParser = require("body-parser");

// Add middlewares
app.use(cors());
app.use(bodyParser());

// API routes import
const usersRoute = require("./api/users");
const roomsRoute = require("./api/rooms");
const messagesRoute = require("./api/messages");
const loginRoute = require("./api/login");
const connectRoute = require("./api/connect");

// API routes set
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);
app.use("/messages", messagesRoute);
app.use("/connect", connectRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`[app.js] Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
