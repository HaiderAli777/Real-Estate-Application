const express = require("express");
const router = express.Router();
const User = require("../Models/User.model.js");
const signUp = require("../Controller/signUp.js");
const signIn = require("../Controller/signIn.js");
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

module.exports = router;
