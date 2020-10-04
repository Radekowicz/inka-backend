const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  _id: {
    type: String,
  },
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
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Patients", PatientSchema);
