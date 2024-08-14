const ErrorHandler = require("../Controller/ErrorHandler");
const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    console.log(token);
    if (!token) {
      const err = ErrorHandler(400, "Token Not Present");
      return next(err);
    }
    jwt.verify(token, "haiderali", (err, user) => {
      if (err) {
        const err = ErrorHandler(400, "Verification Failed");
        return next(err);
      }
      console.log("verify", user);
      req.user = user;
    });

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = AuthMiddleware;
