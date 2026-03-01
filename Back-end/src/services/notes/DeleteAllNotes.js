const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (userId) => {
  try {
    const queryObj = notesQuery.deleteAllNotes(userId);
    const result = await Connection(queryObj.text, queryObj.values);
    return {
      success: true,
      message: "All Notes has been Deleted!",
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
