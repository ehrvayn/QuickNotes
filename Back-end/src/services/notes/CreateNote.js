const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (title, body, userId) => {
  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (!body) {
    errors.push("Body is required");
  }

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  try {
    const queryObj = notesQuery.create(title, body, userId);
    const result = await Connection(queryObj.text, queryObj.values);

    return {
      success: true,
      message: "Note added successfully!",
      note: result[0],
    };
  } catch (err) {
    console.error("Error creating note: ", err);
    return { success: false, message: "Server error while creating note" };
  }
};