/*
  Warnings:

  - You are about to drop the column `adminName` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `capital` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `cityAscii` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `iso2` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `iso3` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `cityCountries` table. All the data in the column will be lost.
  - You are about to drop the column `population` on the `cityCountries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cityCountries" DROP COLUMN "adminName",
DROP COLUMN "capital",
DROP COLUMN "cityAscii",
DROP COLUMN "country",
DROP COLUMN "iso2",
DROP COLUMN "iso3",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "population";

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "numeric_code" TEXT NOT NULL,
    "phone_code" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_name" TEXT NOT NULL,
    "currency_symbol" TEXT NOT NULL,
    "tld" TEXT NOT NULL,
    "native" TEXT,
    "region" TEXT,
    "region_id" TEXT,
    "subregion" TEXT,
    "subregion_id" TEXT,
    "nationality" TEXT NOT NULL,
    "translationsId" INTEGER,
    "latitude" TEXT,
    "longitude" TEXT,
    "emoji" TEXT NOT NULL,
    "emojiU" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "state_code" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "type" TEXT,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translations" (
    "id" SERIAL NOT NULL,
    "kr" TEXT,
    "pt_BR" TEXT,
    "pt" TEXT,
    "nl" TEXT,
    "hr" TEXT,
    "fa" TEXT,
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
    "id" SERIAL NOT NULL,
    "zoneName" TEXT NOT NULL,
    "gmtOffset" INTEGER NOT NULL,
    "gmtOffsetName" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "tzName" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Timezone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_translationsId_key" ON "Country"("translationsId");

-- CreateIndex
CREATE UNIQUE INDEX "State_id_key" ON "State"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_translationsId_fkey" FOREIGN KEY ("translationsId") REFERENCES "Translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timezone" ADD CONSTRAINT "Timezone_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
