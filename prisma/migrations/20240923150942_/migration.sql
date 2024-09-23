/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Timezone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Translations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_cityId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_translationsId_fkey";

-- DropForeignKey
ALTER TABLE "Timezone" DROP CONSTRAINT "Timezone_countryId_fkey";

-- DropIndex
DROP INDEX "City_id_key";

-- DropIndex
DROP INDEX "Country_id_key";

-- AlterTable
ALTER TABLE "Airport" ALTER COLUMN "cityId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "iso3" DROP NOT NULL,
ALTER COLUMN "iso2" DROP NOT NULL,
ALTER COLUMN "numeric_code" DROP NOT NULL,
ALTER COLUMN "phone_code" DROP NOT NULL,
ALTER COLUMN "capital" DROP NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "currency_name" DROP NOT NULL,
ALTER COLUMN "currency_symbol" DROP NOT NULL,
ALTER COLUMN "tld" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "translationsId" SET DATA TYPE TEXT,
ALTER COLUMN "emoji" DROP NOT NULL,
ALTER COLUMN "emojiU" DROP NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Timezone" DROP CONSTRAINT "Timezone_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Timezone_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Timezone_id_seq";

-- AlterTable
ALTER TABLE "Translations" DROP CONSTRAINT "Translations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Translations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Translations_id_seq";

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_translationsId_fkey" FOREIGN KEY ("translationsId") REFERENCES "Translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timezone" ADD CONSTRAINT "Timezone_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
