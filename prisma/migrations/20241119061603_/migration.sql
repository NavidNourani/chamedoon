/*
  Warnings:

  - A unique constraint covering the columns `[translationsId]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Airport" ADD COLUMN     "translationsId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Airport_translationsId_key" ON "Airport"("translationsId");

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_translationsId_fkey" FOREIGN KEY ("translationsId") REFERENCES "Translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
