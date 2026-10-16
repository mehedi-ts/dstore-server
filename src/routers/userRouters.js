const express = require("express");
const { getUsers } = require("../controllers/usersController");
const userRouter = express.Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
