/*
  Warnings:

  - You are about to drop the `CargoShipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CargoShipment" DROP CONSTRAINT "CargoShipment_userID_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_userID_fkey";

-- DropTable
DROP TABLE "CargoShipment";

-- DropTable
DROP TABLE "Flight";

-- CreateTable
CREATE TABLE "flights" (
    "id" TEXT NOT NULL,
    "departureDateTime" TIMESTAMP(3) NOT NULL,
    "arrivalDateTime" TIMESTAMP(3) NOT NULL,
    "departureCountry" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "acceptableCargoDescription" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoShipments" (
    "id" TEXT NOT NULL,
    "approximateDateTime" TIMESTAMP(3),
    "immediateDelivery" BOOLEAN NOT NULL DEFAULT true,
    "departureCountry" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "cargoDescription" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,

    CONSTRAINT "CargoShipments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
