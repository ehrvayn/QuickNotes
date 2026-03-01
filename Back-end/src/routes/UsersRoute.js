const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { register, login, deleteAccount, retrieve, updateUsername, updateFullname, updatePassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", authMiddleware, deleteAccount);
router.get("/retrieve/:id", authMiddleware, retrieve);
router.put("/update/username", authMiddleware, updateUsername);
router.put("/update/fullname", authMiddleware, updateFullname);
router.put("/update/password", authMiddleware, updatePassword);

module.exports = router;