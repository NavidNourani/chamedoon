-- AlterTable
ALTER TABLE "CargoShipments" ADD COLUMN     "destinationCityId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "destinationCityId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationCityId_fkey" FOREIGN KEY ("destinationCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationCityId_fkey" FOREIGN KEY ("destinationCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
