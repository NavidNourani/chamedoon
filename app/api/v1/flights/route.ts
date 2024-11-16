import { prisma } from "@/helpers/db";
import { GetFlightsResponseData } from "@/types/apis/flights";
import { PaginatedResponse } from "@/types/apis/general";
import { NextResponse } from "next/server";
import { z } from "zod";

const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
  departureCountryId: z.string().optional(),
  destinationCountryId: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = paginationSchema.safeParse(query);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid pagination parameters",
        issues: result.error.errors,
      },
      { status: 400 }
    );
  }

  const { page, limit, departureCountryId, destinationCountryId } = result.data;
  const skip = (page - 1) * limit;

  try {
    const flights = await prisma.flight.findMany({
      skip: skip,
      take: limit,
      where: {
        ...(departureCountryId && {
          departureAirport: {
            city: {
              countryId: departureCountryId,
            },
          },
        }),
        ...(destinationCountryId && {
          destinationAirport: {
            city: {
              countryId: destinationCountryId,
            },
          },
        }),
      },
      select: {
        id: true,
        userID: true,
        estimatedCost: true,
        acceptableParcelDescription: true,
        arrivalDateTime: true,
        departureDateTime: true,
        destinationCity: true,
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
        user: {
          select: {
            photo: true,
            countryCode: true,
            phone: true,
          },
        },
      },
    });

    const totalFlights = await prisma.flight.count();

    return NextResponse.json<PaginatedResponse<GetFlightsResponseData>>(
      {
        data: flights,
        total: totalFlights,
        page: Number(page),
        totalPages: Math.ceil(totalFlights / Number(limit)),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching parcel shipments" },
      { status: 500 }
    );
  }
}
