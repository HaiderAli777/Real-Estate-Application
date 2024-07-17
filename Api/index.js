const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.listen(3000, () => {
  console.log("Hey from haider in port 3000  ");
});
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
