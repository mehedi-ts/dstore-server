const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5,
  message: "try again later..",
});

// app middelware
app.use(express.json());
app.use(limiter);
app.use(morgan("dev"));

// custom middelware
app.get("/", (req, res) => {
  res.status(200).send({
    massage: "sarver is runnin fine..",
  });
});

app.get("/api/login", (req, res) => {
  res.status(200).send({ massage: `login done` });
});

app.use((req, res, next) => {
  next(createError(404, "route not payenga"));
});

// server arror handaling

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
