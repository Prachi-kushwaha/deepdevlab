import { Router } from "express";
import { getProfile } from "../controller/profileController.js";

const profileRouter = Router()

profileRouter.get("/user/profile/view", getProfile)

export default profileRouter