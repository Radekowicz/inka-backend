const express = require("express");
const router = express.Router();
const AppointmentType = require("../models/appointmentType");


//GET ALL TYPES
router.get("/", async (req, res) => {
    try {
      const appointmentsTypes = await AppointmentType.find().populate("doctor");
      res.json(appointmentsTypes);
    } catch (err) {
      res.json({ message: err });
    }
  });
  

//GET TYPES BY DOCTOR
router.get("/:doctorId", async (req, res) => {
    try {
      const appointmentsTypes = await AppointmentType.find({ doctor: {_id: req.params.doctorId} }).populate("user");
      res.json(appointmentsTypes);
    } catch (err) {
      res.json({ message: err });
    }
  });


//ADD TYPE
router.post("/", async (req, res) => {
    const appointmentType = new AppointmentType({
      label: req.body.label,
      doctor: req.body.doctor,
    });
  
    try {
      console.log(appointmentType);
      const savedAppointmentType = await appointmentType.save();
      res.json(savedAppointmentType);
    } catch (err) {
      res.json({ message: err });
    }
  });

  module.exports = router;
