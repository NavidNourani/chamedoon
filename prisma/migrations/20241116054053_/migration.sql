/*
  Warnings:

  - A unique constraint covering the columns `[translationsId]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "translationsId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "City_translationsId_key" ON "City"("translationsId");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_translationsId_fkey" FOREIGN KEY ("translationsId") REFERENCES "Translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
