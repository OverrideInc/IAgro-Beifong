const { StatusCodes } = require('http-status-codes');

const BaseError = require('./baseError');

class AuthenticationError extends BaseError {
  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return StatusCodes.UNAUTHORIZED;
  }
}

module.exports = AuthenticationError;
