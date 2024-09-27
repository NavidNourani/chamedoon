"use server";
import { prisma } from "@/helpers/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
export const login = async (data: Pick<User, "username" | "password">) => {
  try {
    // Find the user by username in the database
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    // If the user is not found, set the login error message
    if (!user?.username || !user?.password) {
      return null;
    }

    // Compare the password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(data.password!, user.password);

    // If the password does not match, set the login error message
    if (!passwordMatch) {
      return null;
    }

    // If the password matches, clear the login error message and log in the user
    // Here you can set the user session or token or do whatever you want to log in the user
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    // Handle any errors
    console.error(error);
    return null;
  }
};
