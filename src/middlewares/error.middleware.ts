import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/error";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error instanceof HttpError ? error.statusCode : 500;
  const message = error.message || "Internal Server Error";

  logger.error(
    `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
  });
};
