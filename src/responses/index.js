const HttpStatus = require('http-status-codes');

const buildApiErrorResponse = (error) => {
  const jsonError = {
    key: error.name,
    message: error.message,
    data: error.data,
  };

  return {
    statusCode: error.statusCode,
    body: { errors: [jsonError] },
  };
};

const buildGenericErrorResponse = (error) => {
  const jsonError = {
    key: 'UnhandledError',
    message: error.message,
    name: error.name,
    stack: error.stack
      .split('\n')
      .slice()
      .map((stackLine) => stackLine.replace(/^\s+/, '')),
  };

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    body: { errors: [jsonError] },
  };
};

const buildValidationErrorResponse = (joiError) => {
  const errors = joiError.details.map((detail) => ({
    key: 'ValidationError',
    message: detail.message,
    path: detail.path,
  }));

  return {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    body: { errors },
  };
};

module.exports = {
  buildApiErrorResponse,
  buildGenericErrorResponse,
  buildValidationErrorResponse,
};
