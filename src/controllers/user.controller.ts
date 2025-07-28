import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { HttpError } from "../utils/error";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    throw new HttpError(400, (error as Error).message);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.json({ token });
  } catch (error) {
    throw new HttpError(401, (error as Error).message);
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    throw new HttpError(404, (error as Error).message);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const updateData = req.body;
    const user = await userService.updateUser(userId, updateData);
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    throw new HttpError(400, (error as Error).message);
  }
};

export const deleteProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await userService.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    throw new HttpError(404, (error as Error).message);
  }
};
