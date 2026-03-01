const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { retrieveNotes, addNote, editNote, favoriteNote, removeNote, removeAllNotes } = require("../controllers/notesController");

router.get("/getNotes/:userId", authMiddleware, retrieveNotes);
router.post("/addNote", authMiddleware, addNote);
router.post("/updateNote", authMiddleware, editNote);
router.post("/addToFavorite/:id", authMiddleware, favoriteNote);
router.post("/deleteNote/:id", authMiddleware, removeNote);
router.post("/deleteAllNotes/:userId", authMiddleware, removeAllNotes);

module.exports = router;