const ListingModel = require("../Models/Listing.model");

const getidListing = async (req, res, next) => {
  const id = req.params.id;

  try {
    const Listing = await ListingModel.findOne({ _id: id }).select(
      "-createdAt -updatedAt -__v"
    );
    if (!Listing) {
      return next(ErrorHandler(400, "This Listing Not Exists"));
    }
    res.status(200).json({
      status: "success",
      message: "Get the Taget Id Listing",
      data: Listing,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = getidListing;
