import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
const router = Router();
router.post("/create", verifyJWT, createPost);
router.get("/getposts", getPosts);
export default router;
