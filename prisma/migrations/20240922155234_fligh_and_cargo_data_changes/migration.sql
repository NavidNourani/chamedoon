/*
  Warnings:

  - You are about to drop the column `departureCityCountryID` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCityCountryID` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `departureCityCountryID` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCityCountryID` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cityCountries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departureCityId` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationCityId` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureCityId` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationCityId` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_departureCityCountryID_fkey";

-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_destinationCityCountryID_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_countryId_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_departureCityCountryID_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_destinationCityCountryID_fkey";

-- AlterTable
ALTER TABLE "CargoShipments" DROP COLUMN "departureCityCountryID",
DROP COLUMN "destinationCityCountryID",
ADD COLUMN     "departureCityId" INTEGER NOT NULL,
ADD COLUMN     "destinationCityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "stateId";

-- AlterTable
ALTER TABLE "flights" DROP COLUMN "departureCityCountryID",
DROP COLUMN "destinationCityCountryID",
ADD COLUMN     "departureCityId" INTEGER NOT NULL,
ADD COLUMN     "destinationCityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "State";

-- DropTable
DROP TABLE "cityCountries";

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departureCityId_fkey" FOREIGN KEY ("departureCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationCityId_fkey" FOREIGN KEY ("destinationCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_departureCityId_fkey" FOREIGN KEY ("departureCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationCityId_fkey" FOREIGN KEY ("destinationCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_id_fkey" FOREIGN KEY ("id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
