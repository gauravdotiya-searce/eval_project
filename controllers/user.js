const db = require("../models/db");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      attributes: ["user_id", "username"],
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
  return;
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = (await db.User.findOne({ where: { username } })) || null;
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await db.User.create({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(200).json({
        message: "new user created successfully",
        user_id: newUser.user_id,
        username: newUser.username,
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({
        message: "logged in as existing user",
        user_id: user.user_id,
        username: user.username,
      });
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    next(error);
  }
};
