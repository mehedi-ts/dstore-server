const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).send({
      success: true,
      message: "all users are fetch successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers };
