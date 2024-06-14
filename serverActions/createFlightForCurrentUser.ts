"use server";

import { prisma } from "@/helpers/db";
import { Flight } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createFlightForCurrentUser = async (
  data: Omit<Flight, "userID">
) => {
  const session = await getServerSession();
  if (!session) {
    return { success: false, error: "You are not logged in " };
  }
  try {
    const newFlight = await prisma.flight.create({
      data: { ...data, userID: session.user.id },
    });

    return { success: true, flight: newFlight };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create flight" };
  }
};
