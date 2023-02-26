const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errorMessages.UnauthorizedErrorMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    if (!payload) {
      return next(new UnauthorizedError(errorMessages.ForbiddenErrorMessage));
    }
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.UnauthorizedErrorMessage));
  }
  req.user = payload;

  return next();
};

module.exports = auth;
