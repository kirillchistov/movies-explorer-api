//  Центральный обработчик ошибок  //
//  Ответ с ошибкой по умолчанию - вызывается из next  //
function handleErrors(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка ${message} - ${err.name}`
        : message,
    });
  next();
}

module.exports = { handleErrors };
