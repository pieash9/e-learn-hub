import { IUser } from "../models/user.model";
import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
