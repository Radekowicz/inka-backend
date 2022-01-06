const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getUserById,
} = require("../controllers/usersController");

const passport = require("passport");

//GET ALL Users
router.get("/", getAllUsers);

//GET User BY ID
router.get("/:userId", getUserById);

//ADD User
router.post("/register", addUser);

router.post(
  "/auth",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  async function (req, res) {
    // console.log(req.user);
    res.json(req.user);
  }
);

router.post("/logout", async function (req, res) {
  // req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
  });
});

router.get("/isAuthorized", async function (req, res) {
  res.json(req.isAuthenticated());
});

module.exports = router;
