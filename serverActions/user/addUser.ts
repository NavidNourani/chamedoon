"use server";
import { prisma } from "@/helpers/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
export const addUser = async (user: Omit<User,"id">) => {
  try {
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create the user record in the database
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        name: user.name,
        family: user.family,
        phone: user.phone,
        password: hashedPassword,
        telegramID: user.telegramID,
        whatsappnumber: user.whatsappnumber,
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
