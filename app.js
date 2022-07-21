const express = require("express");
const mongoose = require("mongoose"); // DB
const pasport = require("passport"); // Auth
const bodyParser = require("body-parser");

// Link do file routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const positionRoutes = require("./routes/position");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Marcus:AdminPassword@cluster0.rhjne.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(pasport.initialize());
require("./middleware/passport")(pasport);

app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")()); // Cors

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
