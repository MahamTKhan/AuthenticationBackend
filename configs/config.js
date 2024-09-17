const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorMiddlewares = require('./error.config');
const corsMiddleware = require('./cors.config');
const configureRoutes = require('./routes.config.js');
const {
  rateLimitHandler,
} = require('../middlewares/rate_limiting_middleware.js');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan(env === 'development' ? 'dev' : 'combined'));

app.use(corsMiddleware);
app.use(rateLimitHandler);

configureRoutes(app);
errorMiddlewares(app);

module.exports = app;

