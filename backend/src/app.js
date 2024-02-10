import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);

export { app };
