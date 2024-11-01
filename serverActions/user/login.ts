"use server";
import { prisma } from "@/helpers/db";
import bcrypt from "bcryptjs";

export const login = async (data: {
  countryCode: string;
  phone: string;
  password: string;
}) => {
  try {
    // Find the user by country code and phone
    const user = await prisma.user.findFirst({
      where: {
        countryCode: data.countryCode,
        phone: data.phone,
      },
    });

    if (!user?.password) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error(error);
    return null;
  }
};
