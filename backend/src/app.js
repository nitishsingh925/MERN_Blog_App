import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import contactRouter from "./routes/contact.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./utils/constants.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/contact", contactRouter);

export { app };
