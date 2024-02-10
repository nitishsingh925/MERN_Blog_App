import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  // Check if user with the given email or username blank (empty) exists
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user with the given email or username already exists
  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser) {
    // If user already exists, return a response without the new user details
    return res
      .status(409)
      .json(new ApiResponse(409, null, "User already exists"));
  }

  try {
    // If user doesn't exist, create a new user
    const newUser = new User({ email, username, password });
    await newUser.save();

    // Return a response with the new user details
    return res
      .status(201)
      .json(new ApiResponse(201, newUser, "User Registered Successfully"));
  } catch (error) {
    // Return a response with a generic error message
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export { signup };
