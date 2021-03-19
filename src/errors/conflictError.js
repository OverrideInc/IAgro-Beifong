const HttpStatus = require('http-status-codes');
const BaseError = require('./baseError');

class ConflictError extends BaseError {
  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return HttpStatus.CONFLICT;
  }
}

module.exports = ConflictError;
