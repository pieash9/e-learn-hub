import { Router } from "express";
import userRoutes from "./user.route";

const rootRoutes = Router()

rootRoutes.use("/registration",userRoutes)

export default rootRoutes