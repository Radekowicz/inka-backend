const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

//GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient");
    res.json(appointments);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD APPOINTMENT
router.post("/", async (req, res) => {
  const appointment = new Appointment({
    title: req.body.title,
    patient: req.body.patient,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    console.log(appointment);
    const savedAppointment = await appointment.save();
    console.log("zapisałem")
    console.log(savedAppointment)
    res.json(savedAppointment);
  } catch (err) {
    console.log("errorrrrrrr");
    console.log(err);
    res.json({ message: err });
  }
});


module.exports = router;
