const { users } = require("../models/userModel");

const getUsers = (req, res) => {
  res.status(200).send({
    message: "users were returnd",
    users,
  });
};
module.exports = { getUsers };
