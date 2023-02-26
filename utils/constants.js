//  Константы для сообщений об ошибках - статичные и с динамическим параметром для схемы  //
const errorMessages = {
  IncorrectDataErrorMessage: 'Переданные данные некорректны',
  UrlValidationErrorMessage: 'Строка должна содержать ссылку!',
  EmailValidationErrorMessage: 'Некорректный формат email!',
  UnauthorizedErrorMessage: 'Необходима авторизация',
  WrongEmailErrorMessage: 'Введен некорретный email',
  WrongPasswordErrorMessage: 'Введен некорректный пароль',
  UserExistsErrorMessage: 'Пользователь с таким email уже существует',
  ConflictErrorMessage: 'Объект с таким id уже существует',
  NoDataErrorMessage: 'Запрашиваемая запись не найдена',
  NoUserErrorMessage: 'Пользователь с таким id не найден',
  NoMovieErrorMessage: 'Запрашиваемый фильм не найден',
  NoRouteErrorMessage: 'Запрашиваемый адрес не найден',
  ForbiddenErrorMessage: 'Недостаточно прав для совершения действия',
  ForbiddenMovieDeleteError: 'Фильм другого пользователя удалить нельзя',
  EndOfSession: 'Ваша сессия завершена',
};

const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

const serverMessages = {
  movieDeletedMessage: 'Запись о фильме удалена',
};

module.exports = { errorMessages, requiredValidationMessage, serverMessages };
