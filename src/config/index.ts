import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  mongoURI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/user-management",
};
