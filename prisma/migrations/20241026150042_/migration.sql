-- CreateEnum
CREATE TYPE "CurrencyTypeType" AS ENUM ('IRT', 'GBP', 'AED');

-- CreateEnum
CREATE TYPE "DateSystemType" AS ENUM ('JALALI', 'GREGORIAN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo" TEXT,
    "email" TEXT,
    "name" TEXT,
    "family" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "telegramID" TEXT,
    "whatsappnumber" TEXT,
    "currencyType" "CurrencyTypeType" NOT NULL DEFAULT 'IRT',
    "preferredDateSystem" "DateSystemType" NOT NULL DEFAULT 'GREGORIAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "id" TEXT NOT NULL,
    "departureDateTime" TIMESTAMP(3) NOT NULL,
    "arrivalDateTime" TIMESTAMP(3) NOT NULL,
    "acceptableParcelDescription" TEXT NOT NULL DEFAULT '',
    "estimatedCost" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,
    "departureAirportId" TEXT NOT NULL,
    "destinationAirportId" TEXT NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoShipments" (
    "id" TEXT NOT NULL,
    "approximateDateTime" TIMESTAMP(3),
    "immediateDelivery" BOOLEAN NOT NULL DEFAULT true,
    "parcelDescription" TEXT NOT NULL,
    "parcelWeight" DOUBLE PRECISION,
    "parcelType" TEXT,
    "estimatedCost" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,
    "departureAirportId" TEXT NOT NULL,
    "destinationAirportId" TEXT NOT NULL,

    CONSTRAINT "CargoShipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iso3" TEXT,
    "iso2" TEXT,
    "numeric_code" TEXT,
    "phone_code" TEXT,
    "capital" TEXT,
    "currency" TEXT,
    "currency_name" TEXT,
    "currency_symbol" TEXT,
    "tld" TEXT,
    "native" TEXT,
    "region" TEXT,
    "region_id" TEXT,
    "subregion" TEXT,
    "subregion_id" TEXT,
    "nationality" TEXT,
    "translationsId" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "emoji" TEXT,
    "emojiU" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translations" (
    "id" TEXT NOT NULL,
    "kr" TEXT,
    "pt_BR" TEXT,
    "pt" TEXT,
    "nl" TEXT,
    "hr" TEXT,
    "fa" TEXT,
    "ar" TEXT,
    "de" TEXT,
    "es" TEXT,
    "fr" TEXT,
    "ja" TEXT,
    "it" TEXT,
    "cn" TEXT,
    "tr" TEXT,

    CONSTRAINT "Translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timezone" (
    "id" TEXT NOT NULL,
    "zoneName" TEXT NOT NULL,
    "gmtOffset" INTEGER NOT NULL,
    "gmtOffsetName" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "tzName" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Timezone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramID_key" ON "users"("telegramID");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsappnumber_key" ON "users"("whatsappnumber");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso3_key" ON "Country"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso2_key" ON "Country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "Country_translationsId_key" ON "Country"("translationsId");

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_destinationAirportId_fkey" FOREIGN KEY ("destinationAirportId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoShipments" ADD CONSTRAINT "CargoShipments_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_translationsId_fkey" FOREIGN KEY ("translationsId") REFERENCES "Translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timezone" ADD CONSTRAINT "Timezone_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
