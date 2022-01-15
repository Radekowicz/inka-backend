const Patient = require("../models/patient");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function getAllPatients(req, res) {
  try {
    const loggedUserId = req.session.passport.user;
    const patients = await Patient.find({ doctor: loggedUserId }).populate(
      "appointmentType"
    );
    res.json(patients);
  } catch (err) {
    res.json({ message: err });
  }
}

async function getPatientById(req, res) {
  try {
    const loggedUserId = req.session.passport.user;

    const patient =
      (await Patient.findOne({
        _id: req.params.patientId,
        doctor: loggedUserId,
      }).populate("appointmentType")) ||
      (await Patient.findOne({
        _id: loggedUserId,
      }).populate("appointmentType"));

    res.json(patient);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
}

async function addPatient(req, res) {
  try {
    const officeId = req.body.officeId;

    const doctor = await User.findOne({ officeId: officeId });
    console.log("doctor", doctor);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.patient.password, salt);

    const patient = new Patient({
      firstName: req.body.patient.firstName,
      lastName: req.body.patient.lastName,
      email: req.body.patient.email,
      password: hashedPassword,
      // firstAppointment: new Date(),
      // phoneNumber: req.body.patient.phoneNumber || "",
      // appointmentType: req.body.patient.ppointmentType || "",
      doctor: doctor?._id,
    });

    const savedPatient = await patient.save();
    console.log("saved", savedPatient);
    res.json(savedPatient);
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

async function deletePatient(req, res) {
  try {
    const removedPatient = await Patient.remove({ _id: req.params.patientId });
    res.json(removedPatient);
  } catch (err) {
    res.json({ message: err });
  }
}

async function updatePatient(req, res) {
  try {
    const updatedPatient = await Patient.updateOne(
      { _id: req.params.patientId },
      { $set: { appointmentType: req.body.appointmentType } }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.json({ message: err });
  }
}

module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  deletePatient,
  updatePatient,
};
