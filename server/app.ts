import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error";
import rootRoutes from "./routes";

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use("/api/v1", rootRoutes)

// testing api
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "server is running" });
});

// unknown routes

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route not found - ${req.originalUrl}`) as any;
  (err.statusCode = 404), next(err);
});

app.use(errorMiddleware);
