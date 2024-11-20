const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const countriesData = require("./countries.json");

const prisma = new PrismaClient();

async function main() {
  for (const country of countriesData) {
    // Upsert translations for country
    const countryTranslations = await prisma.translations.upsert({
      where: { id: country.translations.id },
      update: {
        fa: country.translations.fa,
        ar: country.translations.ar,
        // Add other languages as needed
      },
      create: {
        id: country.translations.id,
        fa: country.translations.fa,
        ar: country.translations.ar,
        // Add other languages as needed
      },
    });

    // Upsert country
    await prisma.country.upsert({
      where: { id: country.id },
      update: {
        name: country.name,
        iso3: country.iso3,
        iso2: country.iso2,
        numeric_code: country.numeric_code,
        phone_code: country.phone_code,
        capital: country.capital,
        currency: country.currency,
        currency_name: country.currency_name,
        currency_symbol: country.currency_symbol,
        tld: country.tld,
        native: country.native,
        region: country.region,
        subregion: country.subregion,
        nationality: country.nationality,
        latitude: country.latitude,
        longitude: country.longitude,
        emoji: country.emoji,
        emojiU: country.emojiU,
        translationsId: countryTranslations.id, // Link translations
      },
      create: {
        id: country.id,
        name: country.name,
        iso3: country.iso3,
        iso2: country.iso2,
        numeric_code: country.numeric_code,
        phone_code: country.phone_code,
        capital: country.capital,
        currency: country.currency,
        currency_name: country.currency_name,
        currency_symbol: country.currency_symbol,
        tld: country.tld,
        native: country.native,
        region: country.region,
        subregion: country.subregion,
        nationality: country.nationality,
        latitude: country.latitude,
        longitude: country.longitude,
        emoji: country.emoji,
        emojiU: country.emojiU,
        translationsId: countryTranslations.id, // Link translations
      },
    });

    for (const city of country.cities) {
      // Upsert city
      await prisma.city.upsert({
        where: { id: city.id },
        update: {
          name: city.name,
          countryId: country.id,
        },
        create: {
          id: city.id,
          name: city.name,
          countryId: country.id,
        },
      });

      for (const airport of city?.airports || []) {
        // Upsert airport
        await prisma.airport.upsert({
          where: { id: airport.id },
          update: {
            name: airport.name,
            cityId: city.id,
          },
          create: {
            id: airport.id,
            name: airport.name,
            cityId: city.id,
          },
        });
      }
    }
  }
}

async function add_city_translations() {
  const citiesTranslationsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./cities-translations.json"), "utf-8")
  );
  for (const cityData of citiesTranslationsData) {
    if (!cityData.id) {
      console.error(`City data is missing an ID:`, cityData);
      continue;
    }

    const existingCity = await prisma.city.findUnique({
      where: { id: cityData.id },
    });

    if (!existingCity) {
      console.error(`City with ID ${cityData.id} not found.`);
      continue;
    }

    await prisma.city.update({
      where: { id: cityData.id },
      data: {
        name: cityData.name,
        translations: {
          create: {
            id: cityData.translationsId,
            ...cityData.translations,
            cityId: cityData.id,
          },
        },
      },
    });
  }
}

async function add_airport_translations() {
  try {
    const airportsTranslationsData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "./airport-translations.json"),
        "utf-8"
      )
    );
    console.log("airportsTranslationsData:", airportsTranslationsData.length);
    for (const airportData of airportsTranslationsData) {
      if (!airportData.id) {
        console.error(`Airport data is missing an ID:`, airportData);
        continue;
      }

      const existingAirport = await prisma.airport.findUnique({
        where: { id: airportData.id },
      });

      if (!existingAirport) {
        console.error(`Airport with ID ${airportData.id} not found.`);
        continue;
      }
      const { id: airportId, ...translations } = airportData;
      await prisma.airport.update({
        where: { id: airportData.id },
        data: {
          translations: {
            create: {
              ...translations,
              airportId,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(
      "An error occurred while processing airport translations:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await add_city_translations();
    await add_airport_translations();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
