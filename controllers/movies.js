const Movie = require('../models/movie');
const ForbiddenError = require('../utils/errors/forbidden-error');
const NoDataError = require('../utils/errors/no-data-error');
const IncorrectDataError = require('../utils/errors/incorrect-data-error');
const { errorMessages } = require('../utils/constants');

//  Получаем все карточки   //
module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

//  Создаем карточку фильма   //
module.exports.createMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    //  const { name, link } = req.body;  //
    const movie = await Movie.create({ ...req.body, owner: ownerId });
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};

//  Удаляем карточку фильма с проверкой свой/чужой   //
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NoDataError(errorMessages.NoMovieErrorMessage);
      } else if (movie.owner.toHexString() !== req.user._id) {
        throw new ForbiddenError(errorMessages.ForbiddenMovieDeleteError);
      }
      return movie.delete()
        .then(() => {
          res.status(200).send(movie);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError(errorMessages.IncorrectDataErrorMessaged));
      } else {
        next(err);
      }
    });
};

//  Додебажим вариант с aysnc await чуть позже  //
