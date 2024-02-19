import Post from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(401, "Unauthorized");
  }
  if (!req.body.title || !req.body.content) {
    throw new ApiError(400, "Title and content are required");
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const post = await newPost.save();
    res.status(201).json(new ApiResponse(201, "Post created", post));
  } catch (error) {
    throw new ApiError(error);
  }
};
export { createPost };
