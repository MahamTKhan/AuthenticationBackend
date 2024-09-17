const rateLimit = require('express-rate-limit');

const rateLimitHandler = rateLimit({
  // windowMs: 60 * 1000, // 1 minute
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});

module.exports = { rateLimitHandler };