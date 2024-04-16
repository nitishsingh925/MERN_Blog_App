import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";

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

const signin = async (req, res) => {
  const { email, username, password } = req.body;

  // Checking if either username or email is provided
  if (!(username || email)) {
    throw new ApiError(400, "Email or Username is required");
  }

  try {
    // Finding user by email or username in the database
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // If user doesn't exist
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    // Checking if the provided password is correct
    // isPasswordCorrect is a method defined in the user model
    const isPasswordValid = await user.isPasswordCorrect(password);

    // If the password is not valid
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    //  remove the password from the user object
    const { password: userPassword, ...userWithoutPassword } = user._doc;

    // Generating a JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET);
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Return a response with the user details and access token
    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(new ApiResponse(200, { userWithoutPassword }));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
          false
        )
      );
  }
};

const google = async (req, res) => {
  const { email, name, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        JWT_SECRET
      );
      // Remove the password from the user object
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        profilePicture: googlePhotoURL,
      });
      // Save the new user to the database
      await newUser.save();
      // Generate a JWT token
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        JWT_SECRET
      );
      // Remove the password from the user object
      const { password, ...rest } = newUser._doc;
      // Return a response with the user details and access token
      return res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error",
          false
        )
      );
  }
};

export { signup, signin, google };
