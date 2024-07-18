const User = require("../Models/User.model.js");
const bcryptjs = require("bcryptjs");
const signUp = async (req, res, next) => {
  const { username, gmail, password } = req.body;
  try {
    const hashpass = bcryptjs.hashSync(password, 12);
    const data = new User({ username, gmail, password: hashpass });
    await data.save();
    return res.status(200).json({
      data,
      message: "The data Has been Saved",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = signUp;
