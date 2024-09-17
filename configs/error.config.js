const {
  generalErrorHandler,
  validationErrorHandler,
  unauthorizedErrorHandler,
  databaseErrorHandler,
  notFoundHandler,
} = require('../middlewares/error_middleware.js');

const errorMiddlewares = (app) => {
  app.use(notFoundHandler);
  app.use(validationErrorHandler);
  app.use(unauthorizedErrorHandler);
  app.use(databaseErrorHandler);
  app.use(generalErrorHandler);
};

module.exports = errorMiddlewares;

