const getNotes = require("../services/notes/RetrieveNote");
const createNote = require("../services/notes/CreateNote");
const updateNote = require("../services/notes/UpdateNote");
const deleteNote = require("../services/notes/DeleteNote");
const deleteAllNotes = require("../services/notes/DeleteAllNotes");
const addToFavorites = require("../services/notes/AddToFavorites");

const retrieveNotes = async (req, res) => {
  const userId = req.params.userId;
  const result = await getNotes(userId);
  if (!result.success) return res.status(500).json(result);
  res.status(200).json(result);
};

const addNote = async (req, res) => {
  const { title, body, userId } = req.body;
  const result = await createNote(title, body, userId);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
};

const editNote = async (req, res) => {
  const { title, body, id } = req.body;
  const result = await updateNote(id, title, body);
  if (!result.success) return res.status(result.message.includes("Server") ? 500 : 400).json(result);
  res.status(200).json(result);
};

const favoriteNote = async (req, res) => {
  const id = req.params.id;
  const { favorite } = req.body;
  const result = await addToFavorites(id, favorite);
  if (!result.success) return res.status(500).json(result);
  res.status(200).json(result);
};

const removeNote = async (req, res) => {
  const id = req.params.id;
  const result = await deleteNote(id);
  if (!result.success) return res.status(result.message.includes("Server") ? 500 : 400).json(result);
  res.status(200).json(result);
};

const removeAllNotes = async (req, res) => {
  const userId = req.params.userId;
  const result = await deleteAllNotes(userId);
  if (!result.success) return res.status(result.message.includes("Server") ? 500 : 400).json(result);
  res.status(200).json(result);
};

module.exports = { retrieveNotes, addNote, editNote, favoriteNote, removeNote, removeAllNotes };