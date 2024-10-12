import { Airport, City, Country, Parcel } from "@prisma/client";

export type GetParcelsResponseData = Parcel & {
  departureAirport: AirportType;
  destinationAirport: AirportType;
};

type AirportType = Airport & {
  city: City & {
    country: Pick<Country, "id" | "name" | "iso2">;
  };
};
