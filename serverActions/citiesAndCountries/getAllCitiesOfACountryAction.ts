"use server";
import { prisma } from "@/helpers/db";
import { CityCountry } from "@prisma/client";

const countriesResponseCache: {
  country: string;
  cities: CityCountry[];
  time: Date;
}[] = [];

export const getAllCitiesOfACountryAction = async (country: string) => {
  const cachedResponse = countriesResponseCache.find(
    (response) => response.country === country
  );
  if (
    cachedResponse &&
    new Date().getTime() - cachedResponse.time!.getTime() < 24 * 60 * 60 * 1000
  ) {
    return cachedResponse.cities;
  }
  const cities = await prisma.cityCountry.findMany({
    where: { country },
  });
  countriesResponseCache.push({
    country,
    cities,
    time: new Date(),
  });

  return cities;
};
