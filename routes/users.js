const express = require("express");
const router = express.Router();
const User = require("../models/user");

//GET ALL Users
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.json({ message: err });
    }
  });

  //GET ALL User BY USERNAME
router.get("/:username", async (req, res) => {
    try {
      const users = await User.find({ username: req.params.username});
      res.json(users);
    } catch (err) {
      res.json({ message: err });
    }
  });


//ADD User
router.post("/", async (req, res) => {
    const user = new User({
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      birthdate: req.body.birthdate,
    });
    try {
      const savedUser = await user.save();
      console.log(savedUser);
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  });



module.exports = router;