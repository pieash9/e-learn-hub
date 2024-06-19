import { Router } from "express";
import { registrationUser } from "../controllers/user.controller";

const userRoutes = Router()

userRoutes.post("/",registrationUser)

export default userRoutes