const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 3);

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };
    const users = await User.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    const usersCoutn = await User.countDocuments(filter);
    return res.status(200).send({
      success: true,
      message: "all users are returnd successfully",
      totalUsers: usersCoutn,
      pagination: {
        totalPages: Math.ceil(usersCoutn / limit),
        curentPage: page,
        nextPage: page >= Math.ceil(usersCoutn / limit) ? null : page + 1,
        previousPage: page === 1 ? null : page - 1,
      },
      users,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers };
