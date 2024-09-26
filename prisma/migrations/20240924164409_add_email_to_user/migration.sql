/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegramID]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[whatsappnumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramID_key" ON "users"("telegramID");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsappnumber_key" ON "users"("whatsappnumber");
