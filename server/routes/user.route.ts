import { Router } from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/registration", registrationUser);
userRoutes.post("/activate-user", activateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", isAuthenticated, logoutUser);
userRoutes.get("/refresh", updateAccessToken);
userRoutes.get("/me", isAuthenticated, getUserInfo);
userRoutes.post("/social-auth", socialAuth);
userRoutes.put("/update-user-info", isAuthenticated, updateUserInfo);
userRoutes.put("/update-user-password", isAuthenticated, updatePassword);

export default userRoutes;
