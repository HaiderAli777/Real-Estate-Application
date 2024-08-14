const User = require("../Models/User.model");
const ErrorHandler = require("../Controller/ErrorHandler");
const bcryptjs = require("bcryptjs");
const updatepassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password } = req.body;
    const hashpasswrd = bcryptjs.hashSync(password, 10).toString();
    console.log(typeof hashpasswrd);
    const existuser = await User.findOne({ _id: id });
    if (!existuser) {
      return next(ErrorHandler(400, "User Not Exit!"));
    }
    console.log(id, req.user.id);
    if (req.user.id == id) {
      const data = await User.findByIdAndUpdate(id, { password: hashpasswrd });
    } else {
      return next(ErrorHandler(400, "Change ur own password!"));
    }

    res.status(200).json({
      status: "success",
      message: "Updated Password",
    });
    next();
  } catch (err) {
    console.log("update", err.message);
    next(err);
  }
};

module.exports = updatepassword;
