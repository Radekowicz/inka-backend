const express = require("express");
const router = express.Router();
const {
  getAppointmentsByDateAndUser,
  getAppointmentsByPatient,
  addAppointment,
  deleteAppointment,
  postponeAllFutureAppointments,
} = require("../controllers/appointmentsController");

//GET APPOINTMENTS BY DATE and by user(then return only after date)
router.get("/", getAppointmentsByDateAndUser);

//GET APPOINTMENTS BY PATIENT
router.get("/:patientId", getAppointmentsByPatient);

//ADD APPOINTMENT
router.post("/", addAppointment);

//DELETE APPOINTMENT
router.delete("/:appointmentId", deleteAppointment);

//POSTOPONE all future APPOINTMENTS by interval (days)
router.patch("/", postponeAllFutureAppointments);

module.exports = router;
