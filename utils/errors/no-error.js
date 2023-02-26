//  Когда нет ошибки и все хорошо. Это талисман и пасхалка  //
class NoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 200;
  }
}

module.exports = NoError;
