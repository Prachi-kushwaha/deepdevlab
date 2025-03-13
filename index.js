import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use("/", userRouter)
app.use("/", profileRouter)



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
