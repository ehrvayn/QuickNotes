const Connection = require("../../database/Connection");
const bcrypt = require("bcrypt");
const usersQuery = require("../../models/UsersQuery");

module.exports = async (username, password, firstname, lastname) => {
  const errors = [];

  if (!username || username.trim() === "") {
    errors.push("Username is required");
  } else if (username.length < 5) {
    errors.push("Username must be at least 5 characters");
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errors.push("Username can only contain letters and numbers");
  }

  if (!firstname || firstname.trim() === "") {
    errors.push("First name is required");
  } else if (!/^[a-zA-Z\s-]+$/.test(firstname)) {
    errors.push("First name can only contain letters, spaces, or hyphens");
  }

  if (!lastname || lastname.trim() === "") {
    errors.push("Last name is required");
  } else if (!/^[a-zA-Z]+$/.test(lastname)) {
    errors.push("Last name can only contain letters");
  }

  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  try {
    const { query: query2, values: values2 } = usersQuery.retrieve({ username });
    const result = await Connection(query2, values2);

    if (result.length > 0) {
      return { success: false, message: "Username is already taken!" };
    }

    const inputPasswordHash = await bcrypt.hash(password, 10);
    const { query: query1, values: values1 } = usersQuery.create(username, inputPasswordHash, firstname.trim(), lastname);
    await Connection(query1, values1);

    return { success: true, message: "You have successfully registered!" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Something went wrong" };
  }
};