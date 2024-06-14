// import { City, PrismaClient, State, Timezone } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const data = JSON.parse(
      fs.readFileSync("./prisma/seed/countries+states+cities.json", "utf-8")
    );

    // Loop through each data object and create Prisma objects
    for (const item of data) {
      const timezones = item.timezones; //as Timezone[];
      delete item.timezones;
      const translations = item.translations;
      delete item.translations;
      const states = item.states; //as State[];
      delete item.states;
      // Replace 'YourModel' with the actual name of your Prisma model
      // Modify the object properties to match your model schema
      await prisma.country.create({
        data: {
          ...item,
          translations: { create: translations },
          states: {
            // @ts-ignore
            create: states.map((state) => {
              const cities = state.cities; //as City[];
              delete state.cities;
              return {
                ...state,
                cities: { create: cities },
              };
            }),
          },
          //   states: {create:{cities:{createMany:[{data:{}
          //   }]}}},
          timezones: { create: timezones },
        },
      });
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
