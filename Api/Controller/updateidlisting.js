const Listing = require("../Models/Listing.model");
const ErrorHandler = require("../Controller/ErrorHandler");

const updateidListing = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log("i am in update");
    const listing = await Listing.findOne({ _id: id });
    console.log("hey  aaa", listing);
    if (!listing) {
      return next(ErrorHandler(400, "This Listing Not Exists"));
    }

    const data = await Listing.findByIdAndUpdate(id, { ...body });

    res.status(200).json({
      status: "success",
      message: "Updated Listing",
    });
    next();
  } catch (err) {
    console.log("update", err.message);
    next(err);
  }
};

module.exports = updateidListing;
