const express = require("express");
const app = express();
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");

const noteRouter = require("./routes/note");
const userRoute = require("./routes/user");

const helmet = require("helmet");
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
// app.use(helmet());
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

app.use("/api/notes", noteRouter);
app.use("/api/users", userRoute);
app.use((req, res, next) => {
  res.status(404).json({ message: "Invalid request" });
});
app.use(errorHandler); //Middleware to handle errors produced in the server

module.exports = app;
