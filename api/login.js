const express = require("express");
const app = express();
const router = express.Router();

const login_service = require("../services/login-service");

router.post("/", login_service.log_user);

module.exports = router;
