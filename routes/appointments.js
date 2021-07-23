const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
var dayjs = require('dayjs');

// //GET ALL appointments
// router.get("/", async (req, res) => {
//   try {
//     const appointments = await Appointment.find().populate("patient").populate("type").populate("doctor");
//     res.json(appointments);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

//GET APPOINTMENTS BY DATE and by user(then return only after date)
router.get('/', async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const dateTomorrow = new Date(req.query.date);
    dateTomorrow.setDate(dateTomorrow.getDate() + 1);

    if (req.query.patient && req.query.date && req.query.time) {
      if (req.query.time == 'after') {
        const appointments = await Appointment.find({
          startDate: { $gt: date.toISOString() },
          patient: { _id: req.query.patient },
        })
          .populate('patient')
          .populate('type')
          .populate('doctor');
        res.json(appointments);
      } else if (req.query.time == 'before') {
        const appointments = await Appointment.find({
          startDate: { $lt: date.toISOString() },
          patient: { _id: req.query.patient },
        })
          .populate('patient')
          .populate('type')
          .populate('doctor');
        res.json(appointments);
      }
    } else if (req.query.date) {
      const appointments = await Appointment.find({
        startDate: { $gt: date.toISOString(), $lt: dateTomorrow.toISOString() },
      });
      res.json(appointments);
    } else {
      const appointments = await Appointment.find()
        .populate('patient')
        .populate('type')
        .populate('doctor');
      res.json(appointments);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//GET APPOINTMENTS BY PATIENT
router.get('/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: { _id: req.params.patientId },
    })
      .populate('patient')
      .populate('type')
      .populate('doctor');
    res.json(appointments);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD APPOINTMENT
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    type: req.body.type,
    patient: req.body.patient,
    doctor: req.body.doctor,
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
router.delete('/:appointmentId', async (req, res) => {
  try {
    const removedAppointment = await Appointment.remove({
      _id: req.params.appointmentId,
    });
    console.log('usunąłem');

    console.log(removedAppointment);
    res.json(removedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
