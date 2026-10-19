const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { successResponseHandler } = require("../utils/responsehandler");
const getItemById = require("../services/getItemById");

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

    const usersCount = await User.countDocuments(filter);
    // return res.status(200).send({
    //   success: true,
    //   message: "all users are returnd successfully",
    //   totalUsers: usersCoutn,
    //   pagination: {
    //     totalPages: Math.ceil(usersCoutn / limit),
    //     curentPage: page,
    //     nextPage: page >= Math.ceil(usersCoutn / limit) ? null : page + 1,
    //     previousPage: page === 1 ? null : page - 1,
    //   },
    //   users,
    // });

    return successResponseHandler(res, {
      statusCode: 200,
      message: "users are returnd successfully",
      payload: {
        totalUsers: usersCount,
        pagination: {
          totalPages: Math.ceil(usersCount / limit),
          currntPage: page,
          nextPage: page >= Math.ceil(usersCount / limit) ? null : page + 1,
          previousPage: page === 1 ? null : page - 1,
        },
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getItemById(id, User);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "user returnd successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await getItemById(id, User);
    const deletedUser = await User.findOneAndDelete({
      _id: id,
      isAdmin: false,
    });

    if (!deletedUser) {
      throw createHttpError(403, "User not found or cannot be deleted");
    }

    return successResponseHandler(res, {
      statusCode: 200,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers, getUser, deleteUser };
