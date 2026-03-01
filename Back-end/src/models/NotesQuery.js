const notesQuery = {
  retrieve: (userId) => {
    return {
      text: `SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC`,
      values: [userId],
    };
  },
  create: (title, body, userId) => {
    return {
      text: `INSERT INTO notes (title, body, user_id) VALUES ($1, $2, $3) RETURNING *`,
      values: [title, body, userId],
    };
  },
  deleteNote: (id) => {
    return {
      text: `DELETE FROM notes WHERE id = $1`,
      values: [id],
    };
  },
  deleteAllNotes: (userId) => {
    return {
      text: `DELETE FROM notes WHERE user_id = $1`,
      values: [userId],
    };
  },
  updateNote: (id, title, body) => {
    return {
      text: `UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *`,
      values: [title, body, id],
    };
  },
  addToFavorites: (id, favorite) => {
    return {
      text: `UPDATE notes SET favorite = $1 WHERE id = $2 RETURNING *`,
      values: [favorite, id],
    };
  },
};

module.exports = notesQuery;
