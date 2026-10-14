const getUsers = (req, res) => {
  res.status(200).send({
    message: "users were returnd",
  });
};
module.exports = { getUsers };
