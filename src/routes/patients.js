const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatientById,
  addPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientsController");

const passport = require("passport");

//GET ALL PATIENTS
router.get("/", getAllPatients);

//GET SPECIFIC PATIENT
router.get("/:patientId", getPatientById);

//DELETE PATIENT
router.delete("/:patientId", deletePatient);

//UPDATE PATIENT
router.patch("/:patientId", updatePatient);

//ADD PATIENT
router.post("/register", addPatient);

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
