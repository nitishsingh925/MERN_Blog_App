import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router = Router();

router.post("/create", verifyJWT, createComment);
export default router;
