"use server";

import { authOptions } from "@/helpers/authOptions";
import { prisma } from "@/helpers/db";
import { Flight } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const createOrUpdateFlightForCurrentUser = async (
  data: Omit<Flight, "userID" | "id"> & Partial<Pick<Flight, "id">>
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
    if (data.id) {
      // Update existing flight
      const updatedFlight = await prisma.flight.update({
        where: { id: data.id },
        data: { ...data, userID: session.user.id },
      });
      return { success: true, flight: updatedFlight };
    } else {
      // Create new flight
      const newFlight = await prisma.flight.create({
        data: { ...data, userID: session.user.id },
      });

      revalidatePath("/");
      return { success: true, flight: newFlight };
    }
  } catch (error) {
    console.error(
      "Error processing flight for user ID:",
      session.user.id,
      error
    );
    return { success: false, error: "Failed to process flight" };
  }
};
