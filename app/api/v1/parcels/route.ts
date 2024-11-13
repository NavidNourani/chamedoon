import { prisma } from "@/helpers/db";
import { PaginatedResponse } from "@/types/apis/general";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for validation
const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
});

// Extend the schema to include new filters
const filterSchema = z.object({
  destinationCountryId: z.string().optional(),
  departureCountryId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  parcelType: z.string().optional(),
});

// Combine pagination and filter schemas
const querySchema = paginationSchema.merge(filterSchema);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = querySchema.safeParse(query);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        issues: result.error.errors,
      },
      { status: 400 }
    );
  }

  const {
    page,
    limit,
    departureCountryId,
    destinationCountryId,
    startDate,
    endDate,
    parcelType,
  } = result.data;
  const skip = (page - 1) * limit;

  try {
    const parcels = await prisma.parcel.findMany({
      skip: skip,
      take: limit,
      where: {
        ...(departureCountryId && {
          departureAirport: { city: { country: { id: departureCountryId } } },
        }),
        ...(destinationCountryId && {
          destinationAirport: {
            city: { country: { id: destinationCountryId } },
          },
        }),
        ...(startDate && {
          createdAt: {
            gte: new Date(startDate),
          },
        }),
        ...(endDate && {
          createdAt: {
            lte: new Date(endDate),
          },
        }),
        ...(parcelType && { parcelType: parcelType }), // Updated field name
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            family: true,
            phone: true,
            countryCode: true,
          },
        },
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

    const totalShipments = await prisma.parcel.count({
      where: {
        ...(departureCountryId && {
          departureAirport: { city: { country: { id: departureCountryId } } },
        }),
        ...(destinationCountryId && {
          destinationAirport: {
            city: { country: { id: destinationCountryId } },
          },
        }),
        ...(startDate && {
          createdAt: {
            gte: new Date(startDate),
          },
        }),
        ...(endDate && {
          createdAt: {
            lte: new Date(endDate),
          },
        }),
        ...(parcelType && { parcelType: parcelType }), // Updated field name
      },
    });

    return NextResponse.json<PaginatedResponse<GetParcelsResponseData>>(
      {
        data: parcels,
        total: totalShipments,
        page: Number(page),
        totalPages: Math.ceil(totalShipments / Number(limit)),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching parcel shipments", error);
    return NextResponse.json(
      { error: "Error fetching parcel shipments" },
      { status: 500 }
    );
  }
}
