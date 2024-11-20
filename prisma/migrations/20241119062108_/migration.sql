/*
  Warnings:

  - A unique constraint covering the columns `[countryId,cityId,airportId]` on the table `Translations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Translations" ADD COLUMN     "airportId" TEXT,
ADD COLUMN     "cityId" TEXT,
ADD COLUMN     "countryId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Translations_countryId_cityId_airportId_key" ON "Translations"("countryId", "cityId", "airportId");
