"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/helpers/db";
import { Flight } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createFlightForCurrentUser = async (
  data: Omit<Flight, "userID" | "id">
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      error: "You are not logged in or user ID is missing",
    };
  }

  // Check if the user exists in the database
  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!userExists) {
    return {
      success: false,
      error: "User does not exist",
    };
  }

  try {
    const newFlight = await prisma.flight.create({
      data: { ...data, userID: session.user.id },
    });

    return { success: true, flight: newFlight };
  } catch (error) {
    console.error("Error creating flight for user ID:", session.user.id, error);
    return { success: false, error: "Failed to create flight" };
  }
};
