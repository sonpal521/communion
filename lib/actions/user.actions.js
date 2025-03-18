"use server"
import bcrypt from "bcryptjs";
import User from "../../lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/index";


export const registerUser = async ({ name, email, password }) => {
  await connectToDatabase();

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({ name, email, password: hashedPassword });
  return newUser;
};

export const getUserByEmail = async (email) => {
  await connectToDatabase();
  return await User.findOne({ email });
};
