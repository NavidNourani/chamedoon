-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "family" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "telegramID" TEXT,
    "whatsappnumber" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramID_key" ON "users"("telegramID");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsappnumber_key" ON "users"("whatsappnumber");
