-- DropIndex
DROP INDEX "users_telegramID_key";

-- DropIndex
DROP INDEX "users_whatsappnumber_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "Flight" (
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

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoShipment" (
    "id" TEXT NOT NULL,
    "aproximateDateTime" TIMESTAMP(3),
    "immediateDelivery" BOOLEAN NOT NULL DEFAULT true,
    "departureCountry" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "cargoDescription" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,

    CONSTRAINT "CargoShipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipment" ADD CONSTRAINT "CargoShipment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
