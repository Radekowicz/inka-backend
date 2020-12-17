const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.ObjectId,
    ref: "Patients",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Appointments", AppointmentSchema);
