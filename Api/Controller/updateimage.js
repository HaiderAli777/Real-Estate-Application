const User = require("../Models/User.model");
const ErrorHandler = require("../Controller/ErrorHandler");

const updateimage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { downloadURL } = req.body;
    console.log(downloadURL);
    const existuser = await User.findOne({ _id: id });
    if (!existuser) {
      return next(ErrorHandler(400, "User Not Exit!"));
    }
    console.log(id, req.user.id);
    if (req.user.id == id) {
      const data = await User.findByIdAndUpdate(id, { image: downloadURL });
    } else {
      return next(ErrorHandler(400, "Change ur own Image!"));
    }

    res.status(200).json({
      status: "success",
      message: "Updated Image",
    });
    next();
  } catch (err) {
    console.log("update", err.message);
    next(err);
  }
};

module.exports = updateimage;
