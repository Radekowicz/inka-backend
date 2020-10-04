const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
const homeRoutes = require("./routes/home");
const patientsRoutes = require("./routes/patients");
const appointmentsRoutes = require("./routes/appointments");

app.use(cors());
app.use(bodyParser.json());

app.use("/", homeRoutes);
app.use("/patients", patientsRoutes);
app.use("/appointments", appointmentsRoutes);

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
