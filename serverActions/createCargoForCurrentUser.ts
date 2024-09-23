"use server";

import { prisma } from "@/helpers/db";
import { CargoShipment } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createCargoForCurrentUser = async (
  data: Omit<CargoShipment, "userID" | "id">
) => {
  const session = await getServerSession();
  if (!session) {
    return { success: false, error: "You are not logged in " };
  }
  try {
    const newCargo = await prisma.cargoShipment.create({
      data: { ...data, userID: session.user.id },
    });

    return { success: true, cargo: newCargo };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create cargo" };
  }
};
