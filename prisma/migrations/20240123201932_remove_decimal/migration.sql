/*
  Warnings:

  - You are about to alter the column `lat` on the `cityCountries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,4)` to `DoublePrecision`.
  - You are about to alter the column `lng` on the `cityCountries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,4)` to `DoublePrecision`.
  - You are about to alter the column `population` on the `cityCountries` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "cityCountries" ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lng" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "population" SET DATA TYPE DOUBLE PRECISION;
