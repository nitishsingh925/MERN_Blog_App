import Comment from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      throw new ApiError(403, "Unauthorized", [
        "User is not authorized to perform this action",
      ]);
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(201).json(new ApiResponse(201, newComment, "Comment Save"));
  } catch (error) {
    throw new ApiError(error);
  }
};
export { createComment };
