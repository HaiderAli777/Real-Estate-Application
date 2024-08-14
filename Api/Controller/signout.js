const signout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User has been Logged out",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = signout;
