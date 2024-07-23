import { prisma } from "@/helpers/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const nextURL = req.nextUrl;

  try {
    const query = nextURL.searchParams.get("search") || undefined;
    console.log("Search query:", query);

    const countries = await prisma.country.findMany({
      where: {
        name: { startsWith: query, mode: "insensitive" },
      },
    });

    console.log("Countries found:", countries);

    if (countries.length === 0) {
      return new Response("No countries found!", { status: 404 });
    }

    return new Response(JSON.stringify(countries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Server error in /locations/countries", e);
    return new Response("Server error!", { status: 500 });
  }
};