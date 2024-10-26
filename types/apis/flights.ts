import { City, Country, Flight } from "@prisma/client";

export interface GetFlightsResponseData {
  id: string;
  departureDateTime: Date;
  userID: string;
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
        iso2: string | null;
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

export type GetFlightResponseData = Omit<
  Flight,
  "departureAirportId" | "destinationAirportId"
> & {
  departureAirport: {
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
};
