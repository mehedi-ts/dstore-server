const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  registerUser,
} = require("../controllers/usersController");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/register", registerUser);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
