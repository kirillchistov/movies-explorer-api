module.exports = {
  mongo_db_url: process.env.DB_CONNECT || 'mongodb://127.0.0.1:27017/moviesdb',
  port: process.env.PORT || 3003,
  jwt_secret: process.env.JWT_SECRET || 'dev-secret',
};
