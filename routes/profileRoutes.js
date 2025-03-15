import { Router } from "express";
import {  getProfileToken, profileUpdate } from "../controller/profileController.js";
import { userAuth } from "../middlewares/auth.js";

const profileRouter = Router()

profileRouter.get("/user/profile/view",userAuth, getProfileToken)

profileRouter.post("/user/profile/:id", userAuth, profileUpdate)


export default profileRouter