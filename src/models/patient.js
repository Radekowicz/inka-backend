const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    default: Date.now(),
  },
  firstAppointment: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: mongoose.ObjectId,
    ref: "AppointmentsTypes",
  },
  doctor: {
    type: mongoose.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Patients", PatientSchema);
