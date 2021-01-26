const express = require("express");
const app = express();
const router = express.Router();
const sockets_service = require("../services/sockets-service");

router.get("/", sockets_service.socket_con);

// router.post("/", sockets_service.socket_connection);

module.exports = router;
