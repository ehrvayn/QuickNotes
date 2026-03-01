const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (id, favorite) => {
  try {
    const queryObj = notesQuery.addToFavorites(id, favorite);
    const result = await Connection(queryObj.text, queryObj.values);
    return {
      success: true,
      message: favorite ? "Added to favorites!" : "Removed from favorites!",
      note: result[0],
    };
  } catch (err) {
    console.log("Error: ", err);
    return false;
  }
};
