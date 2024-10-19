/*
  Warnings:

  - You are about to drop the column `acceptableCargoDescription` on the `flights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "acceptableCargoDescription",
ADD COLUMN     "acceptableParcelDescription" TEXT NOT NULL DEFAULT '';
