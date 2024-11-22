const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  :  [];
  console.log("allowed origins",allowedOrigins)

const corsOptions = {
  origin: function (origin, callback) {
    console.log("request origin",origin)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 600,
};

module.exports = cors(corsOptions);
