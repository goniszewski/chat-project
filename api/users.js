const express = require("express");
const app = express();
const router = express.Router();
const user_service = require("../services/user-service");

router.get("/", user_service.get_users);

router.get("/:id", user_service.get_user);

router.get("/:id/messages", user_service.get_user_messages);

router.post("/:id", user_service.add_user);

router.put("/", user_service.update_user);

router.delete("/", user_service.delete_user);

module.exports = router;
