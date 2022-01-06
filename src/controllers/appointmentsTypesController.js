const AppointmentType = require("../models/appointmentType");

async function getAllTypes(req, res) {
  try {
    const loggedUserId = req.session.passport.user;
    const appointmentsTypes = await AppointmentType.find({
      doctor: loggedUserId,
    });
    res.json(appointmentsTypes);
  } catch (err) {
    res.json({ message: err });
  }
}

async function updateType(req, res) {
  try {
    const updatedType = await AppointmentType.updateOne(
      { _id: req.params.typeId },
      {
        $set: {
          label: req.body.label,
          doctor: req.body.doctor,
          color: req.body.color,
          price: req.body.price,
        },
      }
    );
    res.json(updatedType);
  } catch (err) {
    res.json({ message: err });
  }
}

async function addType(req, res) {
  const appointmentType = new AppointmentType({
    label: req.body.label,
    doctor: req.body.doctor,
    color: req.body.color,
    price: req.body.price,
  });

  try {
    const savedAppointmentType = await appointmentType.save();
    res.json(savedAppointmentType);
  } catch (err) {
    res.json({ message: err });
  }
}

async function deleteType(req, res) {
  try {
    const removedAppointmentType = await AppointmentType.remove({
      _id: req.params.typeId,
    });
    res.json(removedAppointmentType);
  } catch (err) {
    res.json({ message: err });
  }
}

module.exports = {
  getAllTypes,
  updateType,
  addType,
  deleteType,
};
