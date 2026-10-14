const express = require("express");
const getSeedUsers = require("../controllers/seedcontroller");
const seedRouter = express.Router();
seedRouter.post("/users", getSeedUsers);
module.exports = seedRouter;
