import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import { allBlog, deleteBlog, editBlog, uploadBlog } from "../controller/blogController.js";

const blogRouter = Router()
blogRouter.post("/user/blogPost", userAuth, uploadBlog)
blogRouter.patch("/user/blogPost/:id", userAuth, editBlog)
blogRouter.delete("/user/blog/delete/:id", userAuth, deleteBlog)
blogRouter.get("/user/allblog/:id", userAuth, allBlog)

export default blogRouter;