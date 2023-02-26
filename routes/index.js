//  Общий роутер  //
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateUserCreate } = require('../middlewares/validate-user');
const NoDataError = require('../utils/errors/no-data-error');
const { errorMessages } = require('../utils/constants');

//  Регистрация и логин не защищаем  //
router.post('/signin', validateLogin, login);
router.post('/signup', validateUserCreate, createUser);
//  Пока не делаем роутер на signout, т.к. нет cookie  //
router.post('/signout', logout);

//  роуты для юзеров и фильмов защищаем авторизацией  //
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', logout);

router.use('*', (req, res, next) => next(new NoDataError(errorMessages.notFoundRouteErrorMessage)));

module.exports = router;
