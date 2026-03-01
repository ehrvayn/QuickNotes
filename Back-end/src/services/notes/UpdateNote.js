const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (id, title, body) => {
  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (body === undefined || body === null) {
    errors.push("Body is required");
  }

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  try {
    const queryObj = notesQuery.updateNote(id, title, body);
    const result = await Connection(queryObj.text, queryObj.values);

    if (!result || result.length === 0) {
      return { success: false, message: "Note not found or no changes made" };
    }

    return {
      success: true,
      message: "Note has been Updated!",
      note: result[0],
    };
  } catch (err) {
    console.error("Error creating note: ", err);
    return { success: false, message: "Server error while creating note" };
  }
};
