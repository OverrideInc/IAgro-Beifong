const { StatusCodes } = require('http-status-codes');

const BaseError = require('./baseError');

class UnprocessableEntityError extends BaseError {
  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = UnprocessableEntityError;
