const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (id) => {
  try {
    const queryObj = notesQuery.deleteNote(id);
    const result = await Connection(queryObj.text, queryObj.values);
    return {
      success: true,
      message: "Note has been Deleted!",
      note: result[0],
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      success: false,
      message: "Server error while deleting note",
    };
  }
};
