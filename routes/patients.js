const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

//GET ALL PATIENTS
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD PATIENT
router.post("/", async (req, res) => {
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    firstAppointment: req.body.firstAppointment,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  });
  try {
    const savedPatient = await patient.save();
    console.log("saved patient");
    console.log(savedPatient);
    res.json(savedPatient);
  } catch (err) {
    res.json({ message: err });
    console.log("blaaaa");
  }
});

//GET SPECIFIC PATIENT
router.get("/:patientId", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE PATIENT
router.delete("/:patientId", async (req, res) => {
  try {
    const removedPatient = await Patient.remove({ _id: req.params.patientId });
    res.json(removedPatient);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:patientId", async (req, res) => {
  try {
    const updatedPatient = await Patient.updateOne(
      { _id: req.params.patientId },
      { $set: { firstName: req.body.title } }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
