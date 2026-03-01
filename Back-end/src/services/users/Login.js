const Connection = require("../../database/Connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersQuery = require("../../models/UsersQuery");

module.exports = async (username, password) => {
  try {
    const { query, values } = usersQuery.login(username);
    const result = await Connection(query, values);

    if (result.length > 0) {
      const user = result[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        return { success: true, message: "Login Successful!", token };
      } else {
        return { success: false, message: "Password is Incorrect!" };
      }
    } else {
      return { success: false, message: "Username is incorrect!" };
    }
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Something went wrong" };
  }
};