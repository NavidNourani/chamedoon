-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('IRT', 'GBP', 'AED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currencyType" "CurrencyType" NOT NULL DEFAULT 'IRT';
