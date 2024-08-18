const Listing = require("../Models/Listing.model");
const listing = require("../Models/Listing.model");

const deletelisting = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.user._id);
    console.log("deleteA", id);
    const existuser = await Listing.findOne({ _id: id });
    if (!existuser) {
      return next(ErrorHandler(400, "This Listing Not Exists"));
    }
    if ((req.user._id = id)) {
      const data = await listing.findByIdAndDelete(id);
      console.log(data);
    }

    res.status(200).json({
      status: "success",
      message: "Listing has been Deleted",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deletelisting;
