const mongoose = require("mongoose");

const AppointmentTypeSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("AppointmentsTypes", AppointmentTypeSchema);
