import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controller/userController.js";

const userRouter = Router()

userRouter.post("/user/create", createUser)
userRouter.post("/user/login", loginUser)
userRouter.post("/user/logout", logoutUser)


export default userRouter