const { CustomAPIError } = require('../utils/customError');

const errorHandlerMiddlerware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err,
  });
};

module.exports = errorHandlerMiddlerware;
