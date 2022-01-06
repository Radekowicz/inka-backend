const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatientById,
  addPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientsController");

//GET ALL PATIENTS
router.get("/", getAllPatients);

//ADD PATIENT
router.post("/", addPatient);

//GET SPECIFIC PATIENT
router.get("/:patientId", getPatientById);

//DELETE PATIENT
router.delete("/:patientId", deletePatient);

//UPDATE POST
router.patch("/:patientId", updatePatient);

module.exports = router;
