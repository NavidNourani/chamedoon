/*
  Warnings:

  - You are about to drop the column `departureCity` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `departureCountry` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCity` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCountry` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `departureCity` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departureCountry` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCity` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCountry` on the `flights` table. All the data in the column will be lost.
  - Added the required column `departureCityCountryID` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationCityCountryID` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureCityCountryID` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationCityCountryID` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CargoShipments" DROP COLUMN "departureCity",
DROP COLUMN "departureCountry",
DROP COLUMN "destinationCity",
DROP COLUMN "destinationCountry",
ADD COLUMN     "departureCityCountryID" INTEGER NOT NULL,
ADD COLUMN     "destinationCityCountryID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "flights" DROP COLUMN "departureCity",
DROP COLUMN "departureCountry",
DROP COLUMN "destinationCity",
DROP COLUMN "destinationCountry",
ADD COLUMN     "departureCityCountryID" INTEGER NOT NULL,
ADD COLUMN     "destinationCityCountryID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cityCountries" (
    "id" SERIAL NOT NULL,
    "city" VARCHAR(49) NOT NULL,
    "cityAscii" VARCHAR(49) NOT NULL,
    "lat" DECIMAL(8,4) NOT NULL,
    "lng" DECIMAL(9,4) NOT NULL,
    "country" VARCHAR(45) NOT NULL,
    "iso2" VARCHAR(2) NOT NULL,
    "iso3" VARCHAR(3) NOT NULL,
    "adminName" VARCHAR(53) NOT NULL,
    "capital" VARCHAR(7) NOT NULL,
    "population" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "cityCountries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departureCityCountryID_fkey" FOREIGN KEY ("departureCityCountryID") REFERENCES "cityCountries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationCityCountryID_fkey" FOREIGN KEY ("destinationCityCountryID") REFERENCES "cityCountries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_departureCityCountryID_fkey" FOREIGN KEY ("departureCityCountryID") REFERENCES "cityCountries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationCityCountryID_fkey" FOREIGN KEY ("destinationCityCountryID") REFERENCES "cityCountries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
