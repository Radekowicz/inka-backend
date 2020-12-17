const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
var dayjs = require('dayjs')



//GET APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    //console.log(req.query.date);
    const date = new Date(req.query.date);
    const dateTomorrow = new Date(req.query.date);
    dateTomorrow.setDate(dateTomorrow.getDate() + 1);
    if (req.query.date) {
      const appointments = await Appointment.find({ startDate: {$gt: date.toISOString(), $lt: dateTomorrow.toISOString()} }).populate("patient");
      res.json(appointments);
    }
    else {
      const appointments = await Appointment.find().populate("patient");
      res.json(appointments);
    }
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
    res.json(savedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE APPOINTMENT
router.delete("/:appointmentId", async (req, res) => {
  try {
    const removedAppointment = await Appointment.remove({
      _id: req.params.appointmentId,
    });
    console.log("usunąłem");

    console.log(removedAppointment);
    res.json(removedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
