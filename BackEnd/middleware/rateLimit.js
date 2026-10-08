import rateLimit from "express-rate-limit";

const handler = (req, res) =>
  res.status(429).json({ message: "Too many requests, please try again later" });

// General cap per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// Stricter cap on login/register to slow down password guessing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
