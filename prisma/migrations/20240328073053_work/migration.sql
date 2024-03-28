/*
  Warnings:

  - Made the column `userId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Issue_userId_idx" ON "Issue"("userId");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
