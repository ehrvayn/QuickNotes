const messagesQuery = {
  create: (user_id, username, message) => ({
    query: "INSERT INTO messages (user_id, username, message) VALUES ($1, $2, $3) RETURNING *",
    values: [user_id, username, message],
  }),
};

module.exports = messagesQuery;