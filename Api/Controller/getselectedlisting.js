const Listing = require("../Models/Listing.model");

const getselectedlisting = async (req, res, next) => {
  const { type, sort, furnished, parkingssport, name, limit, page, offer } =
    req.query;
  console.log(type, sort, furnished, parkingssport, name, limit, page, offer);
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
    if (parkingssport) {
      query.parkingssport = "true";
    }
    if (name) {
      // Assuming name is a partial match
      query.name = { $regex: name, $options: "i" };
    }
    if (offer) {
      query.offer = offer;
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
    const pag = page || 1;
    const lim = limit || 6;
    if (lim) {
      console.log("limit");
      listingsQuery.limit(limit).skip((pag - 1) * lim);
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
