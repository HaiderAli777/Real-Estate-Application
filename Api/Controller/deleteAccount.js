const User = require("../Models/User.model");

const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.user._id);
    console.log("deleteA", id);
    if ((req.user._id = id)) {
      const data = await User.findByIdAndDelete(id);
      console.log(data);
    }

    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User has been Deleted",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteAccount;
