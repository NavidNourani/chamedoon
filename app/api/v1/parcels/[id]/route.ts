import { prisma } from "@/helpers/db";
import { GetParcelsResponseData } from "@/types/apis/parcels";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const parcel = await prisma.parcel.findUnique({
      where: { id },
      include:{
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
      }
    });

    if (!parcel) {
      return NextResponse.json({ error: "parcel not found" }, { status: 404 });
    }

    return NextResponse.json<GetParcelsResponseData>(parcel, { status: 200 });
  } catch (error) {
    console.error("Error fetching parcel details:", error);
    return NextResponse.json(
      { error: "Error fetching parcel details" },
      { status: 500 }
    );
  }
}
