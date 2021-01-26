const express = require("express");
const app = express();
const router = express.Router();
const room_service = require("../services/room-service");

router.get("/", room_service.get_rooms);

router.get("/:id", room_service.get_room);

router.get("/:id/messages", room_service.get_room_messages);

router.post("/:id", room_service.add_room);

router.post("/:id/set-operator", room_service.set_operator);

router.post("/:id/set-user", room_service.set_user);

router.put("/", room_service.update_room);

router.delete("/", room_service.delete_room);

module.exports = router;
