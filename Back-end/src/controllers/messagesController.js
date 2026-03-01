const createMessage = require("../services/messages/CreateMessage");

const sendMessage = async (req, res) => {
  const { user_id, username, message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ success: false, message: "Message can't be empty!" });
  }

  const result = await createMessage(user_id, username, message);
  if (!result.success) return res.status(500).json(result);
  res.status(201).json(result);
};

module.exports = { sendMessage };