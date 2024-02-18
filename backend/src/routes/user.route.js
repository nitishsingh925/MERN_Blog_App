import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:userId", verifyJWT, updateUser);
router.delete("/delete/:userId", verifyJWT, deleteUser);

export default router;
