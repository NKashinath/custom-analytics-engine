const rateLimit = require('express-rate-limit').rateLimit;

const logRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
  keyGenerator: (req) => req.body.userId || req.ip,
});

module.exports = logRateLimiter;