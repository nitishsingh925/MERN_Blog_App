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
const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.json(new ApiResponse(200, comments, "Comments Retrieved"));
  } catch (error) {
    throw new ApiError(error);
  }
};
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, "comment not found");
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(new ApiResponse(200, comment, "Comment liked"));
  } catch (error) {
    throw new ApiError(error);
  }
};
const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) throw new ApiError(404, "Comment not found");
    if (comment.userId !== req.user.id && !req.user.isAdmin)
      throw new ApiError(403, "Unauthorized");
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    res.status(201).json(new ApiResponse(201, editedComment, "Comment edit"));
  } catch (error) {
    throw new ApiError(404, error);
  }
};
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) throw new ApiError(404, "Comment not found");

    if (comment.userId !== req.user.id && !req.user.isAdmin)
      throw new ApiError(403, "You are not allowed to delete this comment");
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json(new ApiResponse(200, "Comment has deleted"));
  } catch (error) {
    throw new ApiError(404, error);
  }
};
export {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
};
