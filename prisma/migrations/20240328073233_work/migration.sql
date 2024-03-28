/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Issue_userId_key" ON "Issue"("userId");
