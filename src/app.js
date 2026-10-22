const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const userRouter = require("./routers/userRouters");
const seedRouter = require("./routers/seedrouters");
const { errorResponseHandler } = require("./utils/responsehandler");
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5,
  message: "try again later..",
});

// app middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

// custom middelware
app.get("/", (req, res) => {
  res.status(200).send({
    massage: "sarver is runnin fine..",
  });
});

app.use((req, res, next) => {
  next(createError(404, "route not payenga"));
});

// server arror handaling

app.use((err, req, res, next) => {
  return errorResponseHandler(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
