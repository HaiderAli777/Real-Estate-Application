const User = require("../Models/User.model");

const getuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findOne({ _id: id }).select("gmail");
    if (!user) {
      throw new Error("User Not Exists");
    }
    console.log("getus", user);
    res.status(200).json({
      status: "success",
      message: "get The user email",
      body: user,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
module.exports = getuser;
