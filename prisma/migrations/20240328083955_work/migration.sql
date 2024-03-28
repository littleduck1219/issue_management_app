-- AlterTable
ALTER TABLE "IssueComment" ADD COLUMN     "userImage" TEXT,
ADD COLUMN     "userName" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
