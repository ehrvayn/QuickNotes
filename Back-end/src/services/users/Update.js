const Connection = require("../../database/Connection");
const usersQuery = require("../../models/UsersQuery");
const bcrypt = require("bcrypt");

module.exports = async (id, type, value1, value2) => {
  try {
    let query, values;

    if (type === "username") {
      ({ query, values } = usersQuery.updateUsername(id, value1));
    } else if (type === "fullname") {
      ({ query, values } = usersQuery.updateFullname(id, value1, value2));
    } else if (type === "password") {
      const hashedPassword = await bcrypt.hash(value1, 10);
      ({ query, values } = usersQuery.updatePassword(id, hashedPassword));
    }

    await Connection(query, values);
    return { success: true, message: "Updated successfully!" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Something went wrong" };
  }
};