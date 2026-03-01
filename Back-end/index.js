const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRoute = require("./src/routes/UsersRoute.js");
const notesRoute = require("./src/routes/NotesRoute.js");
const messagesRoute = require("./src/routes/MessagesRoute.js");

app.use("/messages", messagesRoute);
app.use("/users", usersRoute);
app.use("/notes", notesRoute);

app.get("/", (req, res) => {
  res.send("Damnson");
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
