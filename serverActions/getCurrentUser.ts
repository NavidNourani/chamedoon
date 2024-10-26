"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/helpers/db";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      username: true,
      email: true,
      name: true,
      family: true,
      phone: true,
      telegramID: true,
      whatsappnumber: true,
      photo: true,
      currencyType: true,
      preferredDateSystem: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
