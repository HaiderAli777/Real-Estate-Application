const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../Controller/AuthMiddleware.js");
const createlisting = require("../Controller/createlisting.js");
router.post("/create-listing", createlisting);

module.exports = router;
