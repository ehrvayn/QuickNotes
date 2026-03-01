const Connection = require("../../database/Connection");
const usersQuery = require("../../models/UsersQuery");

module.exports = async (id) => {
  try {
    const { query, values } = usersQuery.delete(id);
    await Connection(query, values);
    return { success: true, message: "Account deleted successfully!" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Something went wrong" };
  }
};