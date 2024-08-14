const express = require("express");
const router = express.Router();
const User = require("../Models/User.model.js");
const signUp = require("../Controller/signUp.js");
const signIn = require("../Controller/signIn.js");
const signout = require("../Controller/signout.js");
const deleteAccount = require("../Controller/deleteAccount.js");
const AuthMiddleware = require("../Controller/AuthMiddleware.js");
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/signout", AuthMiddleware, signout);
router.delete("/delete/:id", AuthMiddleware, deleteAccount);

module.exports = router;
