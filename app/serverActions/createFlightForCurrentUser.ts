"use server";

import { prisma } from "@/helpers/db";
import { Flight } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function createFlightForCurrentUser(
  flight: Omit<Flight, "userID" | "id">
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "User not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const newFlight = await prisma.flight.create({
      data: {
        ...flight,
        userID: user.id,
      },
    });

    return { success: true, flight: newFlight };
  } catch (error) {
    console.error("Error creating flight:", error);
    return { success: false, error: "Failed to create flight" };
  }
}
