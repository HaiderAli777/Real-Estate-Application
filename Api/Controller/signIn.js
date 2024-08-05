const User = require("../Models/User.model.js");
const ErrorHandler = require("../Controller/ErrorHandler.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const signUp = async (req, res, next) => {
  const { gmail, password } = req.body;
  try {
    const gmailexist = await User.findOne({ gmail });
    if (!gmailexist) {
      return next(
        ErrorHandler(400, "User Not Exist!!! Plz Create your account")
      );
    }
    console.log(gmailexist);
    const validpassword = bcryptjs.compareSync(password, gmailexist.password);
    console.log(validpassword);
    if (!validpassword) {
      return next(ErrorHandler(400, "Incorrect Password!!"));
    }
    const token = jwt.sign({ id: gmailexist._id }, "haiderali");
    const obj = gmailexist.toObject();
    const { password: pwd, ...rbody } = obj;

    res
      .cookie(
        "token",
        token,
        { maxAge: 1000 * 60 * 60 * 24 },
        { httpOnly: true }
      )
      .status(200)
      .json({ succes: "pass", body: rbody });
  } catch (err) {
    console.log("hey");
    next(err);
  }
};
module.exports = signUp;
