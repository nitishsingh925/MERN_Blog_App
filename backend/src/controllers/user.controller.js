import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    throw new ApiError(403, "Yor are not allowed to update this user");
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters long");
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      throw new ApiError(
        400,
        "Username must be between 3 and 20 characters long"
      );
    }
  }

  // Hash the new password before updating
  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateduser._doc;
    return res
      .status(200)
      .json(new ApiResponse(200, rest, "User updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

export { updateUser };
