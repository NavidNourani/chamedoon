/*
  Warnings:

  - A unique constraint covering the columns `[countryCode,phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "users_countryCode_phone_key" ON "users"("countryCode", "phone");
