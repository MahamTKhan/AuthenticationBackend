const { ValidationError } = require('sequelize');

// General Error Handling Middleware
const generalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred.',
  });
};

// Validation Error Middleware
const validationErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      errors: err.errors.map((error) => error.message),
    });
  }
  next(err);
};

// Unauthorized Error Middleware
const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'You are not authorized to access this resource.',
    });
  }
  next(err);
};

// Database Error Middleware
const databaseErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(500).json({
      message: 'Database error occurred. Please try again later.',
    });
  }
  next(err);
};

// 404 Not Found Middleware
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Resource not found.',
  });
};

module.exports = {
  generalErrorHandler,
  validationErrorHandler,
  unauthorizedErrorHandler,
  databaseErrorHandler,
  notFoundHandler,
};

