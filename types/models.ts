import { Airport, City, Country, Translations } from "@prisma/client";

export type AirportWithTranslations = Airport & { translations: Translations };

export type CityWithTranslations = City & { translations: Translations };

export type CountryWithTranslations = Country & { translations: Translations };
