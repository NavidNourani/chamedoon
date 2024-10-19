import { City, Country } from "@prisma/client";

export interface GetFlightsResponseData {
  id: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  departureAirport: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
      country: {
        id: string;
        name: string;
        iso2: string;
      };
    };
  };
  destinationAirport: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
      country: {
        id: string;
        name: string;
        iso2: string | null;
      };
    };
  };
  estimatedCost: number | null;
  acceptableParcelDescription: string;
  // Add any other fields from your Flight model that you want to display
}

type CityType = City & {
  country: Pick<Country, "id" | "name" | "iso2">;
};
