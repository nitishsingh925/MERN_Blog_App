import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    throw new ApiError(403, "You are not allowed to update this user");
  }

  try {
    if (req.body.password) {
      if (req.body.password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.username) {
      if (req.body.username.length < 3 || req.body.username.length > 20) {
        throw new ApiError(
          400,
          "Username must be between 3 and 20 characters long"
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          // Only set password if it is provided
          ...(req.body.password && { password: req.body.password }),
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    return res
      .status(200)
      .json(new ApiResponse(200, rest, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const deleteUser = async (req, res) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    throw new ApiError(403, "You are not allowed to delete this user");
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User signed out successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const getUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(401, "You are not allowed to see all users");
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { users: usersWithoutPassword, totalUsers, lastMonthUsers },
          "Users fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { password, ...rest } = user._doc;
    return res
      .status(200)
      .json(new ApiResponse(200, rest, "User fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error, "Internal Server Error");
  }
};

export { updateUser, deleteUser, signout, getUsers, getUser };
