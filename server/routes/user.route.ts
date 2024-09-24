import { Router } from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/registration", registrationUser);
userRoutes.post("/activate-user", activateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", isAuthenticated, logoutUser);
userRoutes.get("/refresh", updateAccessToken);

export default userRoutes;
