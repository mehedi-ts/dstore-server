const data = require("../../data");
const User = require("../models/userModel");

const getSeedUsers = async (req, res, next) => {
  try {
    // for delete all data
    await User.deleteMany({});
    //for insert new data
    const users = await User.insertMany(data.users);
    return res.status(201).send(users);
  } catch (error) {
    next(error);
  }
};
module.exports = getSeedUsers;
