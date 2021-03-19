const HttpStatus = require('http-status-codes');

class BaseError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get data() {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

module.exports = BaseError;
