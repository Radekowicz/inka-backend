const Appointment = require("../models/appointment");
const dayjs = require("dayjs");

async function getAppointmentsByDateAndUser(req, res) {
  try {
    const loggedUserId = req.session.passport.user;

    const date = new Date(req.query.date);
    const dateTomorrow = new Date(req.query.date);
    dateTomorrow.setDate(dateTomorrow.getDate() + 1);

    if (req.query.patient && req.query.date && req.query.time) {
      if (req.query.time === "after") {
        const appointments = await Appointment.find({
          startDate: { $gt: date.toISOString() },
          patient: { _id: req.query.patient },
          doctor: loggedUserId,
        })
          .populate("patient")
          .populate("type")
          .populate("doctor");
        res.json(appointments);
      } else if (req.query.time === "before") {
        const appointments = await Appointment.find({
          startDate: { $lt: date.toISOString() },
          patient: { _id: req.query.patient },
          doctor: loggedUserId,
        })
          .populate("patient")
          .populate("type")
          .populate("doctor");
        res.json(appointments);
      }
    } else if (req.query.date && req.query.time) {
      if (req.query.time === "after") {
        const appointments = await Appointment.find({
          startDate: { $gt: date.toISOString() },
          doctor: loggedUserId,
        }).populate("type");
        res.json(appointments);
      } else if (req.query.time === "before") {
        const appointments = await Appointment.find({
          startDate: { $lt: date.toISOString() },
          doctor: loggedUserId,
        }).populate("type");
        res.json(appointments);
      }
    } else if (req.query.date) {
      const appointments = await Appointment.find({
        startDate: {
          $gt: date.toISOString(),
          $lt: dateTomorrow.toISOString(),
          doctor: loggedUserId,
        },
      })
        .populate("patient")
        .populate("type")
        .populate("doctor");
      res.json(appointments);
    } else {
      const appointments = await Appointment.find({ doctor: loggedUserId })
        .populate("patient")
        .populate("type")
        .populate("doctor");
      res.json(appointments);
    }
  } catch (err) {
    res.json({ message: err });
  }
}

async function getAppointmentsByPatient(req, res) {
  try {
    const loggedUserId = req.session.passport.user;

    const appointments = await Appointment.find({
      patient: { _id: req.params.patientId },
      doctor: loggedUserId,
    })
      .populate("patient")
      .populate("type")
      .populate("doctor");
    res.json(appointments);
  } catch (err) {
    res.json({ message: err });
  }
}

async function addAppointment(req, res) {
  const appointment = new Appointment({
    type: req.body.type,
    patient: req.body.patient,
    doctor: req.body.doctor,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const savedAppointment = await appointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
}

async function deleteAppointment(req, res) {
  try {
    const removedAppointment = await Appointment.remove({
      _id: req.params.appointmentId,
    });

    console.log(removedAppointment);
    res.json(removedAppointment);
  } catch (err) {
    res.json({ message: err });
  }
}

async function postponeAllFutureAppointments(req, res) {
  try {
    const interval = parseInt(req.query.interval);
    const fromDate = req.query.fromDate;

    const loggedUserId = req.session.passport.user;

    const appointments = await Appointment.find({
      startDate: { $gt: fromDate },
      doctor: loggedUserId,
    }).populate("type");

    const updatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const newStartDate = addDaysToDate(appointment.startDate, interval);
        const newEndDate = addDaysToDate(appointment.endDate, interval);

        return Appointment.updateOne(
          { _id: appointment._id },
          { $set: { startDate: newStartDate, endDate: newEndDate } }
        );
      })
    );
    res.json(updatedAppointments);
  } catch (err) {
    res.json({ message: err });
  }
}

function addDaysToDate(date, interval) {
  return dayjs(date).add(interval, "day").toISOString();
}

module.exports = {
  getAppointmentsByDateAndUser,
  getAppointmentsByPatient,
  addAppointment,
  deleteAppointment,
  postponeAllFutureAppointments,
};
