module.exports = (error, request, response, next) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  response.status(status).json({ success: false, message: message, error });
  console.log(error);
};
