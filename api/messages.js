const express = require("express");
const app = express();
const router = express.Router();
const message_service = require("../services/message-service");

router.get("/", message_service.get_messages);

router.get("/:id", message_service.get_message);

router.post("/:id", message_service.add_message);

router.put("/", message_service.update_message);

router.delete("/", message_service.delete_message);

module.exports = router;
