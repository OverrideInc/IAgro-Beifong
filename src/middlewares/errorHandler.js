const BaseError = require('../errors/baseError');

const {
  buildApiErrorResponse,
  buildGenericErrorResponse,
  buildValidationErrorResponse,
} = require('../responses');

const errorThrowing = (error) => {
  let statusCode;
  let body;

  if (error.isJoi) {
    ({ statusCode, body } = buildValidationErrorResponse(error));
  } else if (error instanceof BaseError) {
    ({ statusCode, body } = buildApiErrorResponse(error));
  } else {
    ({ statusCode, body } = buildGenericErrorResponse(error));
  }

  return { statusCode, body };
};

const errorHandler = (err, _req, res, next) => {
  const { statusCode, body } = errorThrowing(err);

  res.status(statusCode).send(body);

  next();
};

const withErrorHandling = (asyncRouteHandler) => (req, res, next) => {
  asyncRouteHandler(req, res, next).catch((error) => {
    const { statusCode, body } = errorThrowing(error);

    res.status(statusCode).send(body);
  });
};

module.exports = {
  errorHandler,
  withErrorHandling,
};
