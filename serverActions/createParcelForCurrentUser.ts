"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/helpers/db";
import { Parcel } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createParcelForCurrentUser = async (
  data: Omit<Parcel, "userID" | "id">
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "You are not logged in " };
  }
  try {
    const newParcel = await prisma.parcel.create({
      data: { ...data, userID: session.user.id },
    });

    return { success: true, parcel: newParcel };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create parcel" };
  }
};
