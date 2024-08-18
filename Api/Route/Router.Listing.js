const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../Controller/AuthMiddleware.js");
const createlisting = require("../Controller/createlisting.js");
const getListing = require("../Controller/getListing.js");
const deleteListing = require("../Controller/deletelisting.js");
const getidListing = require("../Controller/getidListing.js");
const updateidListing = require("../Controller/updateidlisting.js");
router.post("/create-listing", AuthMiddleware, createlisting);
router.get("/get-listing/:id", AuthMiddleware, getListing);
router.get("/get-onelisting/:id", AuthMiddleware, getidListing);
router.put("/update-listing/:id", AuthMiddleware, updateidListing);
router.delete("/delete-listing/:id", AuthMiddleware, deleteListing);

module.exports = router;
