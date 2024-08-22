const Listing = require("../Models/Listing.model");

const getselectedlisting = async (req, res, next) => {
  const { type, sort, furnished, parking, name, limit, page } = req.query;
  console.log(type, sort, furnished, parking, name, limit, page);
  try {
    // Build the query object
    let query = {};

    if (type) {
      console.log("hey");
      query.type = type;
    }
    if (furnished) {
      query.furnished = "true";
    }
    if (parking) {
      query.parking = "true";
    }
    if (name) {
      // Assuming name is a partial match
      query.name = { $regex: name, $options: "i" };
    }
    console.log(query);
    // Fetch the listings from the database
    let listingsQuery = Listing.find(query);
    const totalListingsCount = await Listing.countDocuments(query);
    if (sort) {
      if (sort === "latest") {
        listingsQuery = listingsQuery.sort({ createdAt: -1 });
      } else if (sort === "oldest") {
        listingsQuery = listingsQuery.sort({ createdAt: 1 });
      }
    }

    if (limit) {
      console.log("limit");
      listingsQuery.limit(limit).skip((page - 1) * 6);
    }

    const listings = await listingsQuery.exec();

    // Send the response
    res.status(200).json({
      status: "success",
      data: listings,
      length: totalListingsCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getselectedlisting;
