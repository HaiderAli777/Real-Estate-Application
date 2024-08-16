const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const UserRouter = require("./Route/Route.User.js");
const listingRouter = require("./Route/Router.Listing.js");
mongoose
  .connect(
    "mongodb+srv://ha7325897:KaGVX7BsVhre0uzT@cluster0.3lmtoms.mongodb.net/"
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Hey from haider in port 3000  ");
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api", listingRouter);

app.use((err, req, res, next) => {
  console.log("in err mid");
  console.log(err);
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal System Errors";
  return res.status(statuscode).json({
    message,
    status: "fail",
  });
});
