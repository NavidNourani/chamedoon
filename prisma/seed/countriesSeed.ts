const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

async function main() {
  const countriesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./countries.json"), "utf-8")
  );

  for (const countryData of countriesData) {
    const country = await prisma.country.upsert({
      where: { id: countryData.id },
      update: {
        id: countryData.id,
        name: countryData.name,
        iso3: countryData.iso3,
        iso2: countryData.iso2,
        numeric_code: countryData.numeric_code,
        phone_code: countryData.phone_code,
        capital: countryData.capital,
        currency: countryData.currency,
        currency_name: countryData.currency_name,
        currency_symbol: countryData.currency_symbol,
        tld: countryData.tld,
        native: countryData.native,
        region: countryData.region,
        subregion: countryData.subregion,
        nationality: countryData.nationality,
        latitude: countryData.latitude,
        longitude: countryData.longitude,
        emoji: countryData.emoji,
        emojiU: countryData.emojiU,
        translations: {
          create: countryData.translations,
        },
        timezones: {
          create: countryData.timezones.map((timezone: any) => ({
            id: timezone.id,
            zoneName: timezone.zoneName,
            gmtOffset: timezone.gmtOffset,
            gmtOffsetName: timezone.gmtOffsetName,
            abbreviation: timezone.abbreviation,
            tzName: timezone.tzName,
          })),
        },
        cities: {
          upsert: countryData.cities.map((cityData: any) => ({
            where: { id: cityData.id },
            create: {
              id: cityData.id,
              name: cityData.name,
              airports: {
                create: cityData.airports?.map((airportData: any) => ({
                  id: airportData.id,
                  name: airportData.name,
                })) || [],
              },
            },
            update: {
              name: cityData.name,
              airports: {
                upsert: (cityData.airports || []).map((airportData: any) => ({
                  where: { id: airportData.id },
                  create: {
                    id: airportData.id,
                    name: airportData.name,
                  },
                  update: {
                    name: airportData.name,
                  },
                })),
              },
            },
          })),
        },
      },
      create: {
        id: countryData.id,
        name: countryData.name,
        iso3: countryData.iso3,
        iso2: countryData.iso2,
        numeric_code: countryData.numeric_code,
        phone_code: countryData.phone_code,
        capital: countryData.capital,
        currency: countryData.currency,
        currency_name: countryData.currency_name,
        currency_symbol: countryData.currency_symbol,
        tld: countryData.tld,
        native: countryData.native,
        region: countryData.region,
        subregion: countryData.subregion,
        nationality: countryData.nationality,
        latitude: countryData.latitude,
        longitude: countryData.longitude,
        emoji: countryData.emoji,
        emojiU: countryData.emojiU,
        translations: {
          create: countryData.translations,
        },
        timezones: {
          create: countryData.timezones.map((timezone: any) => ({
            id: timezone.id,
            zoneName: timezone.zoneName,
            gmtOffset: timezone.gmtOffset,
            gmtOffsetName: timezone.gmtOffsetName,
            abbreviation: timezone.abbreviation,
            tzName: timezone.tzName,
          })),
        },
        cities: {
          create: countryData.cities.map((cityData: any) => ({
            id: cityData.id,
            name: cityData.name,
            airports: {
              create:
                cityData.airports?.map((airportData: any) => ({
                  id: airportData.id,
                  name: airportData.name,
                })) || [],
            },
          })),
        },
      },
    });

    console.log(`Upserted country: ${country.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
