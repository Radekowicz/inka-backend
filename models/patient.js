const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  _id: {
    type: String
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
});

module.exports = mongoose.model("Patients", PatientSchema);
