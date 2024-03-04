import { Router } from "express";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router = Router();

router.post("/create", verifyJWT, createComment);
router.get("/getPostComments/:postId", getPostComments);
export default router;
