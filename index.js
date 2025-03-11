import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new blog post
app.post("/blog", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await prisma.blog.create({
      data: { title, content },
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blog posts
app.get("/blog", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
