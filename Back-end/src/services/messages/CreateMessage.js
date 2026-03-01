const Connection = require("../../database/Connection");
const messagesQuery = require("../../models/MessagesQuery");

module.exports = async (user_id, username, message) => {
  try {
    const { query, values } = messagesQuery.create(user_id, username, message);
    await Connection(query, values);
    return { success: true, message: "Message sent successfully!" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Something went wrong" };
  }
};