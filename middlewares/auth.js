// https://app.meldrx.com/api/fhir/b24c25c2-6cfa-48ad-8c1e-c934169fb7ba

import prisma from "../config/Database.js";
import express from "express";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()

const devvalue = process.env.DEV_VAR

const app = express();
app.use(cookies());

export const userAuth = async (req, res, next) => {
  try {
    
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(401)
        .json({ message: "User is not authorized (No Token Found)" });
    }

    const { token } = req.cookies;
    const decodedMessages = jwt.verify(token, devvalue);
    const user = await prisma.user.findUnique({
      where: { id: decodedMessages.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in userAuth:", error);
    res.status(400).json({
      status: 400,
      message: "Authentication failed",
      error: error.message || "Unknown error",
    });
  }
};
