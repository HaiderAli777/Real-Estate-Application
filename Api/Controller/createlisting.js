const ListingModel = require("../Models/Listing.model");

const createlisting = async (req, res, next) => {
  const data = req.body;
  console.log(data);

  try {
    const Listing = await ListingModel.create(data);
    res.status(200).json({
      status: "success",
      message: "List Has Been Created",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = createlisting;
