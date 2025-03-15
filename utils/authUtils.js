
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config(); // Load .env file

const devValue = process.env.DEV_VAR;


export const generateJWT = async (userId) => {
    return jwt.sign({ id: userId }, devValue, { expiresIn: "7d" });
};

export const validatePassword = async (passwordInputByUser, passwordHash) => {
    return await bcrypt.compare(passwordInputByUser, passwordHash);
};