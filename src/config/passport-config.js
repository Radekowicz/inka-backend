const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Patient = require("../models/patient");
const bcrypt = require("bcrypt");

const authenticateUser = async (email, password, done) => {
  try {
    const user =
      (await User.findOne({ email: email })) ||
      (await Patient.findOne({ email: email }));

    console.log("user", user);

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
    console.error("error");
    return done(null, false, { message: "Password incorrect" });
  } catch (error) {
    return done(error);
  }
};

async function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    return done(
      null,
      async () =>
        (await User.findOne({ _id: id })) || (await User.findOne({ _id: id }))
    );
  });
}

module.exports = initialize;
