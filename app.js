//  Dev DB: bitfilmsdb, Prod DB: moviesdb  //
//  Создать .env конфигурацию окружения  //

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const handleCors = require('./middlewares/handleCors');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3001,
  MONGO_DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

mongoose.connect(MONGO_DB_URL);

const app = express();
app.use(requestLogger);
app.use(errorLogger);
app.use(handleCors);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
