import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:userId", verifyJWT, updateUser);
router.delete("/delete/:userId", verifyJWT, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyJWT, getUsers);

export default router;
