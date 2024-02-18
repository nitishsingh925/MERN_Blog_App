import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import {
  deleteUser,
  signout,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:userId", verifyJWT, updateUser);
router.delete("/delete/:userId", verifyJWT, deleteUser);
router.post("/signout", signout);

export default router;
