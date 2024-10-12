import { PaginatedResponse } from "@/types/apis/general";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

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

  const { page, limit } = result.data;
  const skip = (page - 1) * limit;

  try {
    const parcels = await prisma.parcel.findMany({
      skip: skip,
      take: limit,
      include: {
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

    const totalShipments = await prisma.parcel.count();

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
    return NextResponse.json(
      { error: "Error fetching parcel shipments" },
      { status: 500 }
    );
  }
}
