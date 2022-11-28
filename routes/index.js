//  Общий роутер  //
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateUserCreate } = require('../middlewares/validate-user');
const NoDataError = require('../utils/errors/no-data-error');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUserCreate, createUser);
//  router.post('/signout', logout);  //

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
//  router.use('/signout', logout);  //

router.use('*', (req, res, next) => next(new NoDataError('По этому адресу ничего не найдено')));

module.exports = router;
