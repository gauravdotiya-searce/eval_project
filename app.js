const express = require("express");
const app = express();
const http = require("http");
const db = require("./models/db");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user");

const morgan = require("morgan");
const path = require("path");

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "pages")));

app.get("/", (req, res, next) => {
  res.sendFile("./pages/index.html", { root: __dirname });
});
app.get("/login", (req, res, next) => {
  res.sendFile("./pages/login.html", { root: __dirname });
});

app.use(errorHandler); //Middleware to handle errors produced in the server
app.use("/api/users/", userRoutes);

io.on("connection", (socket) => {
  console.log("user-connected");
  socket.on("fetch-notes", async () => {
    const notes = await db.Note.findAll({ include: db.User }); //Returns all notes
    io.sockets.emit("return-notes", notes);
  });

  socket.on("fetch-user-notes", async (user_id) => {
    const notes = await db.Note.findAll({ where: { user_id } }); //Returns all notes of a particular user
    socket.emit("return-user-notes", notes);
  });

  socket.on("submit-new-note", async (data) => {
    const { title, content, user_id } = data;
    if (user_id) {
      const note = await db.Note.create({ title, content, user_id }); //Create new note
      await note.save();

      io.sockets.emit("submit-success"); //emit event on successfull note creation
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT;

db.sequelize.authenticate().then(() => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Connected to postgres");
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
});

module.exports = app;
