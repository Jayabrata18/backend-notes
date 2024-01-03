import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userRoutes";
import noteRouter from "./routes/noteRoutes";

require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Speed limiting middleware
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: () => 500, // begin adding 500ms of delay per request above 100
  maxDelayMs: 2000,
});

app.use(limiter);
app.use(speedLimiter);

//routes
app.use("/api/auth", userRouter);
app.use("/api/", noteRouter);

//api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!! It is api port!!!");
});

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "API is Working!" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
