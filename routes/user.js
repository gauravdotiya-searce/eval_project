const router = require("express").Router();
const userController = require("../controllers/user");

router.get("/all", userController.getAllUsers); // GET a list of all users

router.post("/login", userController.login); // POST signup/login a user

module.exports = router;
