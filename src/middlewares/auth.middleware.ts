import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { HttpError } from "../utils/error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new HttpError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new HttpError(401, "Invalid token");
  }
};
