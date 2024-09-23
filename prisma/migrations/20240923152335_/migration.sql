/*
  Warnings:

  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_departureAirportId_fkey";

-- DropForeignKey
ALTER TABLE "CargoShipments" DROP CONSTRAINT "CargoShipments_destinationAirportId_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_departureAirportId_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_destinationAirportId_fkey";

-- AlterTable
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Airport_id_seq";

-- AlterTable
ALTER TABLE "CargoShipments" ALTER COLUMN "departureAirportId" SET DATA TYPE TEXT,
ALTER COLUMN "destinationAirportId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "flights" ALTER COLUMN "departureAirportId" SET DATA TYPE TEXT,
ALTER COLUMN "destinationAirportId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
