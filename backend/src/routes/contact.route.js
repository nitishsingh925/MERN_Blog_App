import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { contactForm, getContacts } from "../controllers/contact.controller.js";

const router = Router();

router.post("/form", verifyJWT, contactForm);
router.get("/getcontacts", verifyJWT, getContacts);
export default router;
