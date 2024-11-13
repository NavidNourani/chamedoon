import { Airport, City, Country, Parcel, User } from "@prisma/client";

export type GetParcelsResponseData = Parcel & {
  departureAirport: AirportType;
  destinationAirport: AirportType;
  User: Pick<User, "phone" | "countryCode">;
};

type AirportType = Airport & {
  city: City & {
    country: Pick<Country, "id" | "name" | "iso2">;
  };
};
