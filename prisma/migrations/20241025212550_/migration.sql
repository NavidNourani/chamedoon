-- CreateEnum
CREATE TYPE "DateSystem" AS ENUM ('JALALI', 'GREGORIAN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "preferredDateSystem" "DateSystem" NOT NULL DEFAULT 'GREGORIAN';
