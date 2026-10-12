const express = require("express");
const { getUsers } = require("../controllers/usersController");
const userRouter = express.Router();

const users = [
  { name: "mehedi", age: 32, isOk: true },
  { name: "asif", age: 332, isOk: true },
  { name: "sujan", age: 332, isOk: false },
];
userRouter.get("/", getUsers);

userRouter.get("/:id", (req, res) => {
  res.status(200).send({
    message: "user profile was returnd",
  });
});

module.exports = userRouter;
