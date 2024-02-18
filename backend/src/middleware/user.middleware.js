import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new ApiError(401, "Unauthorized");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
