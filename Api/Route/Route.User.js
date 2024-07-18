const express = require("express");
const router = express.Router();
const User = require("../Models/User.model.js");
const signUp = require("../Controller/signUp.js");
router.post("/sign-up", signUp);

module.exports = router;
