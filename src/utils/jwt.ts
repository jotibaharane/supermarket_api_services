import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateToken = (
  payload: object,
  expiresIn: string = "1h"
): string => {
  return jwt.sign(
    payload,
    config.jwtSecret as jwt.Secret,
    { expiresIn } as jwt.SignOptions
  );
};

export const verifyToken = (token: string): object => {
  return jwt.verify(token, config.jwtSecret as jwt.Secret) as object;
};
