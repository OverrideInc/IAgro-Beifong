const { StatusCodes } = require('http-status-codes');

const BaseError = require('./baseError');

class BadRequestError extends BaseError {
  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
