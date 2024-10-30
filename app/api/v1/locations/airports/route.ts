import { prisma } from "@/helpers/db";
import { NextRequest } from "next/server";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const nextURL = req.nextUrl;

  try {
    const query = nextURL.searchParams.get("search") || undefined;
    const countryId = nextURL.searchParams.get("countryId") || undefined;

    if (!countryId) {
      return new Response("Country id is required!", { status: 400 });
    }

    const airports = await prisma.airport.findMany({
      where: {
        name: { startsWith: query, mode: "insensitive" },
        city: {
          countryId: countryId,
        },
      },
      include: {
        city: true,
      },
    });

    if (airports.length === 0) {
      return new Response("No airport found!", { status: 404 });
    }

    return new Response(JSON.stringify(airports), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Server error in /locations/airport", e);
    return new Response("Server error!", { status: 500 });
  }
};
