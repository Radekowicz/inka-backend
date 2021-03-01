const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  type: {
    type: mongoose.ObjectId,
    ref: "AppointmentsTypes",
    required: true,
  },
  patient: {
    type: mongoose.ObjectId,
    ref: "Patients",
    required: true,
  },
  doctor: {
    type: mongoose.ObjectId,
    ref: "Users",
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
