"use server";

import { authOptions } from "@/helpers/authOptions";
import { prisma } from "@/helpers/db";
import { Parcel } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createOrUpdateParcelForCurrentUser = async (
  data: Omit<Parcel, "userID" | "id"> & Partial<Pick<Parcel, "id">>
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "You are not logged in " };
  }
  try {
    let parcel;
    if (data.id) {
      // Update existing parcel
      parcel = await prisma.parcel.update({
        where: { id: data.id },
        data: { ...data, userID: session.user.id },
      });
    } else {
      // Create new parcel
      parcel = await prisma.parcel.create({
        data: { ...data, userID: session.user.id },
      });
    }
    revalidatePath("/");

    return { success: true, parcel };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create or update parcel" };
  }
};
