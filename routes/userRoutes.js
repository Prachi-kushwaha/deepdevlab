import { Router } from "express";
import { createUser } from "../controller/userController.js";

const userRouter = Router()

userRouter.post("/user/create", createUser)

export default userRouter