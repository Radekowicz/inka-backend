const User = require("../models/user");
const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.find({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
}

async function addUser(req, res) {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).send({
        message: "This email address is already being used",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

module.exports = { getAllUsers, getUserById, addUser };
