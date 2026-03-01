const usersQuery = {
  retrieve: ({ username }) => ({
    query: "SELECT * FROM users WHERE username = $1",
    values: [username],
  }),
  retrieveById: (id) => ({
    query: "SELECT id, username, firstname, lastname FROM users WHERE id = $1",
    values: [id],
  }),
  create: (username, password, firstname, lastname) => ({
    query: "INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)",
    values: [username, password, firstname, lastname],
  }),
  updateUsername: (id, username) => ({
    query: "UPDATE users SET username = $1 WHERE id = $2",
    values: [username, id],
  }),
  updatePassword: (id, password) => ({
    query: "UPDATE users SET password = $1 WHERE id = $2",
    values: [password, id],
  }),
  updateFullname: (id, firstname, lastname) => ({
    query: "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3",
    values: [firstname, lastname, id],
  }),
  delete: (id) => ({
    query: "DELETE FROM users WHERE id = $1",
    values: [id],
  }),
  login: (username) => ({
    query: "SELECT * FROM users WHERE username = $1",
    values: [username],
  }),
};

module.exports = usersQuery;