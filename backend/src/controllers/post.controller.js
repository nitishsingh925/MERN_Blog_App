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
  const date = Date.parse(new Date());
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "")
    .concat(`-${date}`);

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
const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json(
      new ApiResponse(
        200,
        {
          posts,
          totalPosts,
          lastMonthPosts,
        },
        "Posts fetched"
      )
    );
  } catch (error) {
    throw new ApiError(500, error);
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId !== req.params.userId && !req.user.isAdmin) {
      throw new ApiError(401, "Unauthorized");
    }
    await Post.deleteOne({ _id: req.params.postId });
    res.status(200).json(new ApiResponse(200, "Post deleted"));
  } catch (error) {
    throw new ApiError(500, error);
  }
};
const updatepost = async (req, res) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    throw new ApiError(
      401,
      "Unauthorized You are not allowed to update this post"
    );
  }
  try {
    const updatedpost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(201).json(new ApiResponse(201, updatedpost, "Post Updated "));
  } catch (error) {
    throw new ApiError(error);
  }
};
export { createPost, getPosts, deletePost, updatepost };
