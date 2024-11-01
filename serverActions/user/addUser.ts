"use server";
import { prisma } from "@/helpers/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
export const addUser = async (user: Omit<User, "id">) => {
  try {
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password!, salt);

    const checkUser = await prisma.user.findFirst({
      where: {
        countryCode: user.countryCode,
        phone: user.phone!,
      },
    });

    if (checkUser) {
      throw new Error(
        JSON.stringify({ fields: { username: "usernameAlreadyExists" } })
      );
    }

    // Create the user record in the database
    const newUser = await prisma.user.create({
      data: {
        phone: user.phone,
        password: hashedPassword,
        countryCode: user.countryCode,
      },
    });

    // Return the created user
    return newUser;
  } catch (error) {
    // Handle any errors
    console.error(error);
    throw error;
  }
};
