import { Router } from "express";
import { activateUser, registrationUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/registration", registrationUser);
userRoutes.post("/activate-user", activateUser);

export default userRoutes;
