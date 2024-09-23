/*
  Warnings:

  - A unique constraint covering the columns `[iso3]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iso2]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryIso2` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_id_fkey";

-- AlterTable
ALTER TABLE "CargoShipments" ADD COLUMN     "cargoType" TEXT,
ADD COLUMN     "cargoWeight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "countryIso2" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso3_key" ON "Country"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso2_key" ON "Country"("iso2");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryIso2_fkey" FOREIGN KEY ("countryIso2") REFERENCES "Country"("iso2") ON DELETE RESTRICT ON UPDATE CASCADE;
