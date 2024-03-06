import { Router } from "express";
import {
  createComment,
  editComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router = Router();

router.post("/create", verifyJWT, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyJWT, likeComment);
router.put("/editComment/:commentId", verifyJWT, editComment);
export default router;
