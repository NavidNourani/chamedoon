"use server";
import { prisma } from "@/helpers/db";

const countriesResponseCache: {
  countries?: string[];
  time?: Date;
} = {
  countries: undefined,
  time: undefined,
};
export const getAllCountriesAction = async () => {
  if (
    countriesResponseCache.countries &&
    countriesResponseCache.time &&
    new Date().getTime() - countriesResponseCache.time.getTime() <
      24 * 60 * 60 * 1000
  ) {
    return countriesResponseCache.countries;
  }
  const countries = await prisma.cityCountry.findMany({
    select: {
      country: true,
    },
    distinct: ["country"],
  });
  countriesResponseCache.countries = countries.map((x) => x.country);
  countriesResponseCache.time = new Date();
  return countriesResponseCache.countries;
};
