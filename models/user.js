//  В проекте две сущности: пользователи и сохранённые фильмы (users и movies)  //
//  Создайте схему и модель для каждой. саму БД назовите, например /bitfilmsdb  //
/* Поля схемы user:
email — почта пользователя. Обязательное уникальное. Валидировать по схеме email.
password — хеш пароля. Обязательная строка. Задать поведение по умолчанию.
name — имя, напр: Александр или Мария. Обязательная строка 2 - 30 символов.
*/

//  Создаем подключение к mongoose, валидацию и хэширование паролей  //

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//  const isEmail = require('validator/lib/isEmail');  //
const validator = require('validator');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { errorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина строки - 2 символа'],
      maxlength: [30, 'Максимальная длина строки - 30 символов'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: errorMessages.EmailValidationErrorMessage,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

//  выносим сообщения об ошибках в переменные  //
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMessages.WrongEmailErrorMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(errorMessages.WrongPasswordErrorMessage));
          }
          return user;
        });
    });
};

//  Вариант через async await без try пока не работает  //

module.exports = mongoose.model('user', userSchema);
