const express = require("express");
const router = express.Router();
const AppointmentType = require("../models/appointmentType");


//GET ALL TYPES
router.get("/", async (req, res) => {
    try {
      const appointmentsTypes = await AppointmentType.find();
      res.json(appointmentsTypes);
    } catch (err) {
      res.json({ message: err });
    }
  });
  

//GET TYPES BY DOCTOR
router.get("/:doctorId", async (req, res) => {
    try {
      const appointmentsTypes = await AppointmentType.find({ doctor: {_id: req.params.doctorId} });
      res.json(appointmentsTypes);
    } catch (err) {
      res.json({ message: err });
    }
  });


//UPDATE TYPE 
router.patch("/:typeId", async (req, res) => {
  try {
    const updatedType = await AppointmentType.updateOne(
      { _id: req.params.typeId },
      { $set: { 
        label: req.body.label,
        doctor: req.body.doctor,
        color: req.body.color,
        price: req.body.price
       } }
    );
    res.json(updatedType);
  } catch (err) {
    res.json({ message: err });
  }
});


//ADD TYPE
router.post("/", async (req, res) => {
    const appointmentType = new AppointmentType({
      label: req.body.label,
      doctor: req.body.doctor,
      color: req.body.color,
      price: req.body.price
    });
  
    try {
      console.log(appointmentType);
      const savedAppointmentType = await appointmentType.save();
      res.json(savedAppointmentType);
    } catch (err) {
      res.json({ message: err });
    }
  });

  //DELETE TYPE
router.delete("/:typeId", async (req, res) => {
  try {
    const removedAppointmentType = await AppointmentType.remove({ _id: req.params.typeId });
    res.json(removedAppointmentType);
  } catch (err) {
    res.json({ message: err });
  }
});


  module.exports = router;
