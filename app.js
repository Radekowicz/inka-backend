const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
const postsRoutes = require("./routes/posts");
const homeRoutes = require("./routes/home");
const patientsRoutes = require("./routes/patients");

app.use(cors());
app.use(bodyParser.json());

app.use("/", homeRoutes);
app.use("/posts", postsRoutes);
app.use("/patients", patientsRoutes);

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
