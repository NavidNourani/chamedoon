/*
  Warnings:

  - You are about to drop the column `cargoDescription` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `cargoType` on the `CargoShipments` table. All the data in the column will be lost.
  - You are about to drop the column `cargoWeight` on the `CargoShipments` table. All the data in the column will be lost.
  - Added the required column `parcelDescription` to the `CargoShipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CargoShipments" DROP COLUMN "cargoDescription",
DROP COLUMN "cargoType",
DROP COLUMN "cargoWeight",
ADD COLUMN     "parcelDescription" TEXT NOT NULL,
ADD COLUMN     "parcelType" TEXT,
ADD COLUMN     "parcelWeight" DOUBLE PRECISION;
