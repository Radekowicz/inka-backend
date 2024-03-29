const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
const homeRoutes = require("./src/routes/home");
const patientsRoutes = require("./src/routes/patients");
const appointmentsRoutes = require("./src/routes/appointments");
const appointmentsTypesRoutes = require("./src/routes/appointmentsTypes");
const usersRoutes = require("./src/routes/users");

const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");
const initializePassport = require("./src/config/passport-config");

const allowUrl = [
  "/api/users/auth",
  "/api/users/register",
  "/api/patients/auth",
  "/api/patients/register",
];

const authenticationMiddleware =
  (whiteList = []) =>
  (req, res, next) => {
    if (whiteList.find((x) => x === req.originalUrl)) {
      return next();
    }
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(401);
  };

initializePassport(passport);

app.use(cors());
app.use(bodyParser.json());

app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticationMiddleware(allowUrl));

app.use("/api", homeRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/appointmentsTypes", appointmentsTypesRoutes);
app.use("/api/users", usersRoutes);

//Connect to DB
mongoose.connect(
  "mongodb://localhost:27017/inka",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

//LISTEN
app.listen(4000);
