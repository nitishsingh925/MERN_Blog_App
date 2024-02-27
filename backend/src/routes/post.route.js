import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatepost,
} from "../controllers/post.controller.js";
const router = Router();
router.post("/create", verifyJWT, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyJWT, deletePost);
router.put("/updatepost/:postId/:userId", verifyJWT, updatepost);
export default router;
