const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const UserRouter = require("./Route/Route.User.js");

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Hey from haider in port 3000  ");
});

app.use(express.json());
app.use("/Api/User", UserRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal System Errors";
  return res.status(statuscode).json({
    message,
    status: "failure",
  });
});
