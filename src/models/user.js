const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  officeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
