import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cookies from "cookie-parser"
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import blogRouter from "./routes/blogRouter.js";
import cors from "cors"

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookies())
app.use(express.json());

app.use("/", userRouter)
app.use("/", profileRouter)
app.use("/", blogRouter)



// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
