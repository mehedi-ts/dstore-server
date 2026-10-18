const { mongoose } = require("mongoose");
const User = require("../models/userModel");
const createHttpError = require("http-errors");

const getUserById = async (id) => {
  console.log(`user id ${id}`);
  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError(400, "Invalid User ID");
  }
  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(404, "User Not Found");
  }
  return user;
};
module.exports = getUserById;
