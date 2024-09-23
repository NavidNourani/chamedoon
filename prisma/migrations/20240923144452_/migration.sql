/*
  Warnings:

  - You are about to drop the column `departureCityId` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCityId` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `countryIso2` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `departureCityId` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCityId` on the `flights` table. All the data in the column will be lost.
  - Added the required column `departureAirportId` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationAirportId` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureAirportId` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationAirportId` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_departureCityId_fkey";

-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_destinationCityId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryIso2_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_departureCityId_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_destinationCityId_fkey";

-- AlterTable
ALTER TABLE "CargoShipments" DROP COLUMN "departureCityId",
DROP COLUMN "destinationCityId",
ADD COLUMN     "departureAirportId" INTEGER NOT NULL,
ADD COLUMN     "destinationAirportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "countryIso2",
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "flights" DROP COLUMN "departureCityId",
DROP COLUMN "destinationCityId",
ADD COLUMN     "departureAirportId" INTEGER NOT NULL,
ADD COLUMN     "destinationAirportId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
