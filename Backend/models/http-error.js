class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = errorCode;
  }
}

module.exports = HttpError;
