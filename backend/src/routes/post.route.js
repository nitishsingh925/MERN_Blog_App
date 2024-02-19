import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { createPost } from "../controllers/post.controller.js";
const router = Router();
router.post("/create", verifyJWT, createPost);
export default router;
