const createUser = require("../services/users/Register");
const deleteUser = require("../services/users/Delete");
const retrieveUser = require("../services/users/Retrieve");
const updateUser = require("../services/users/Update");
const loginUser = require("../services/users/Login");

const register = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  const result = await createUser(username, password, firstname, lastname);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  if (!result.success) return res.status(401).json(result);
  res.status(200).json(result);
};

const deleteAccount = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, message: "ID is required" });
  const result = await deleteUser(id);
  if (!result.success) return res.status(400).json(result);
  res.status(200).json(result);
};

const retrieve = async (req, res) => {
  const { id } = req.params;
  const result = await retrieveUser(id);
  if (!result.success) return res.status(404).json(result);
  res.status(200).json(result);
};

const updateUsername = async (req, res) => {
  const { id, username } = req.body;
  if (!id || !username) return res.status(400).json({ success: false, message: "ID and username are required" });
  const result = await updateUser(id, "username", username);
  if (!result.success) return res.status(400).json(result);
  res.status(200).json(result);
};

const updateFullname = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  if (!id || !firstname || !lastname) return res.status(400).json({ success: false, message: "ID, first name and last name are required" });
  const result = await updateUser(id, "fullname", firstname, lastname);
  if (!result.success) return res.status(400).json(result);
  res.status(200).json(result);
};

const updatePassword = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) return res.status(400).json({ success: false, message: "ID and password are required" });
  const result = await updateUser(id, "password", password);
  if (!result.success) return res.status(400).json(result);
  res.status(200).json(result);
};

module.exports = { register, login, deleteAccount, retrieve, updateUsername, updateFullname, updatePassword };