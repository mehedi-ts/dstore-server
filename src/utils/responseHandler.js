const errorResponseHandler = (
  res,
  { statusCode = 500, message = "Internal Server Error" },
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const successResponseHandler = (
  res,
  { statusCode = 200, message = "Success", payload = {} },
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

module.exports = { errorResponseHandler, successResponseHandler };
