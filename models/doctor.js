const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
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

module.exports = mongoose.model("Doctors", DoctorSchema);
