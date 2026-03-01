const Connection = require("../../database/Connection");
const usersQuery = require("../../models/UsersQuery");

module.exports = async (id) => {
  try {
    const { query, values } = usersQuery.retrieveById(id);
    const result = await Connection(query, values);

    if (result.length > 0) {
      return { success: true, user: result[0] };
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (err) {
    return { success: false, message: "Something went wrong" };
  }
};