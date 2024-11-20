import { prisma } from "@/helpers/db";
import { GetFlightResponseData } from "@/types/apis/flights";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const flight = await prisma.flight.findUnique({
      where: { id },
      select: {
        id: true,
        userID: true,
        estimatedCost: true,
        acceptableParcelDescription: true,
        arrivalDateTime: true,
        departureDateTime: true,
        destinationCityId: true,
        departureAirport: {
          include: {
            city: {
              include: {
                country: { select: { id: true, name: true, iso2: true } },
              },
            },
          },
        },
        destinationAirport: {
          include: {
            city: {
              include: {
                country: { select: { id: true, name: true, iso2: true } },
              },
            },
          },
        },
      },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json<GetFlightResponseData>(flight, { status: 200 });
  } catch (error) {
    console.error("Error fetching flight details:", error);
    return NextResponse.json(
      { error: "Error fetching flight details" },
      { status: 500 }
    );
  }
}
