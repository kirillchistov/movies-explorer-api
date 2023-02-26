//  Dev DB: bitfilmsdb, Prod DB: moviesdb  //
//  NODE_ENV === 'production' ? 'bitfilmsdb' : 'moviesdb'  //
//  Создать .env конфигурацию окружения  //

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//  const bodyParser = require('body-parser');  //
//  const rateLimit = require('express-rate-limit');  //
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
//  const cookieParser = require('cookie-parser');  //
const handleCors = require('./middlewares/handleCors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { handleError } = require('./middlewares/handleError');
const NoDataError = require('./utils/errors/no-data-error');
const { errorMessages } = require('./utils/constants');

const {
  PORT = 3003,
  MONGO_DB_URL = 'mongodb://127.0.0.1:27017/moviesdb',
} = process.env;

mongoose.connect(MONGO_DB_URL);

const app = express();
app.use(requestLogger);
app.use(handleCors);
app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  next(new NoDataError(errorMessages.notFoundRouteErrorMessage));
});

app.use(errorLogger);
app.use(errors());

//  Добавляем middleware с централизованным обработчиком ошибок  //
app.use(handleError);

app.listen(PORT);
