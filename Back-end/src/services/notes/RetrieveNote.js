const Connection = require("../../database/Connection");
const notesQuery = require("../../models/NotesQuery");

module.exports = async (userId) => {
  try {
    const queryObj = notesQuery.retrieve(userId);
    const result = await Connection(queryObj.text, queryObj.values);

    return { 
      success: true, 
      notes: result 
    };
  } catch (err) {
    console.error("Error retrieving notes: ", err);
    return { 
      success: false, 
      message: "Something went wrong while fetching notes" 
    };
  }
};