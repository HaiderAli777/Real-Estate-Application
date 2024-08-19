const ListingModel = require("../Models/Listing.model");

const getallListing = async (req, res, next) => {
  const id = req.params.id;

  try {
    const Listing = await ListingModel.find().select("-userRef -__v");
    res.status(200).json({
      status: "success",
      message: "Get the listing",
      data: Listing,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = getallListing;
