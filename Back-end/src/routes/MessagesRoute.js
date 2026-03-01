const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { sendMessage } = require("../controllers/messagesController");

router.post("/send", authMiddleware, sendMessage);

module.exports = router;