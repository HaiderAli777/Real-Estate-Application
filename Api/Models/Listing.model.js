const mongoose = require("mongoose");

const ListingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    parkingssport: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    bed: {
      type: Number,
      required: true,
    },
    bath: {
      type: Number,
      required: true,
    },
    regularprize: {
      type: Number,
      required: true,
    },
    discountprize: {
      type: Number,
    },
    images: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
