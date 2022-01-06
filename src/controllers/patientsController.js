const Patient = require("../models/patient");

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
    const patient = await Patient.find({ doctor: loggedUserId })
      .findById(req.params.patientId)
      .populate("appointmentType");
    res.json(patient);
  } catch (err) {
    res.json({ message: err });
  }
}

async function addPatient(req, res) {
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    firstAppointment: req.body.firstAppointment,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password,
    appointmentType: req.body.appointmentType,
  });
  try {
    const savedPatient = await patient.save();
    res.json(savedPatient);
  } catch (err) {
    res.json({ message: err });
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
