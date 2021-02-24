const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
const homeRoutes = require("./routes/home");
const patientsRoutes = require("./routes/patients");
const appointmentsRoutes = require("./routes/appointments");
const appointmentsTypesRoutes = require("./routes/appointmentsTypes");
const doctorsRoutes = require("./routes/doctors");


app.use(cors());
app.use(bodyParser.json());

app.use("/api", homeRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/appointmentsTypes", appointmentsTypesRoutes);
app.use("/api/doctors", doctorsRoutes);


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
