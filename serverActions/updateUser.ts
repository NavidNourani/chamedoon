"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/helpers/db";
import { handlePrismaError } from "@/helpers/prismaErrorHandler";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const updateUser = async (
  data: Partial<Omit<User, "id" | "createdAt" | "currencyType">>
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      error: "You are not logged in or user ID is missing",
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: data,
    });

    revalidatePath("/");
    return { success: true, user: updatedUser };
  } catch (error: unknown) {
    console.error("Error updating user with ID:", session.user.id, error);
    return handlePrismaError(error);
  }
};
