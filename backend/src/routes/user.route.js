import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { updateUser } from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:userId", verifyJWT, updateUser);

export default router;
