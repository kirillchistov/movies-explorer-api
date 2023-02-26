//  Роуты для пользователей (2) Get users/me и Patch users/me //
const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const { validateProfileUpdate } = require('../middlewares/validate-user');

router.get('/me', getCurrentUser);
router.patch('/me', validateProfileUpdate, updateProfile);

module.exports = router;
