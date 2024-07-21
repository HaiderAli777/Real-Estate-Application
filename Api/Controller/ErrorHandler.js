const ErrorHandler = (statusCode, message) => {
  console.log("Hello");
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  console.log(error.message, "hey");
  return error;
};
module.exports = ErrorHandler;
