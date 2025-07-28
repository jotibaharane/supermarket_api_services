import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser, UserInput } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const register = async (userInput: UserInput): Promise<IUser> => {
  const { name, email, password } = userInput;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};

export const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUser = async (
  id: string,
  updateData: Partial<UserInput>
): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.email) {
    const existingUser = await User.findOne({ email: updateData.email });
    if (existingUser && existingUser._id.toString() !== id) {
      throw new Error("Email already in use");
    }
    user.email = updateData.email;
  }
  if (updateData.password) {
    user.password = await bcrypt.hash(updateData.password, 10);
  }

  await user.save();
  return user;
};

export const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }
};
