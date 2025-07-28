import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpError } from "../utils/error";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new HttpError(400, errors.join(", "));
    }
    next();
  };
};
