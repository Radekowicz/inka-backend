const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");

//GET ALL DOCTORS
router.get("/", async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (err) {
      res.json({ message: err });
    }
  });


//ADD DOCTOR
router.post("/", async (req, res) => {
    const doctor = new Doctor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate,
    });
    try {
      const savedDoctor = await doctor.save();
      console.log("saved doctor");
      console.log(savedDoctor);
      res.json(savedDoctor);
    } catch (err) {
      res.json({ message: err });
    }
  });



module.exports = router;