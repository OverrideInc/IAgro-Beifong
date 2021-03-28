const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class ConflictError extends BaseError {
  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
