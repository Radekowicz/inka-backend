const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authenticateUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
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
    return done(null, async () => await User.findOne({ _id: id }));
  });
}

module.exports = initialize;
